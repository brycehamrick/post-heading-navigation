import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

// 1. Add custom attributes to core/heading
function addCustomHeadingAttributes(settings, name) {
    if (name === 'core/heading') {
        settings.attributes = {
            ...settings.attributes,
            navigationLabel: {
                type: 'string',
                default: '',
            },
            excludeFromNavigation: {
                type: 'boolean',
                default: false,
            },
        };
    }
    return settings;
}

// 2. Add controls in the block inspector for custom attributes
const addHeadingInspectorControls = wp.compose.createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        if (props.name !== 'core/heading') return <BlockEdit {...props} />;

        const { attributes, setAttributes } = props;
        const { navigationLabel, excludeFromNavigation } = attributes;

        return (
            <Fragment>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody title="Navigation Settings">
                        <TextControl
                            label="Navigation Label"
                            value={navigationLabel || ''}
                            onChange={(value) => setAttributes({ navigationLabel: value })}
                            help="Set a custom label for this heading in the navigation."
                        />
                        <ToggleControl
                            label="Exclude from Navigation"
                            checked={excludeFromNavigation}
                            onChange={(value) => setAttributes({ excludeFromNavigation: value })}
                            help="Exclude this heading from the navigation menu."
                        />
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
}, 'addHeadingInspectorControls');

// 3. Modify the save function to add data-* attributes to the HTML
function addDataAttributesToSave(element, blockType, attributes) {
    if (blockType.name === 'core/heading') {
        const { navigationLabel, excludeFromNavigation } = attributes;

        // Check if element is an HTML tag (React element)
        if (element?.props) {
            const newProps = {
                ...element.props,
                ...(navigationLabel ? { 'data-nav-label': navigationLabel } : {}),
                ...(excludeFromNavigation ? { 'data-exclude-nav': true } : {}),
            };

            return wp.element.cloneElement(element, newProps);
        }
    }
    return element;
}

// 4. Register filters to inject attributes and controls
addFilter(
    'blocks.registerBlockType',
    'custom/heading-attributes',
    addCustomHeadingAttributes
);

addFilter(
    'editor.BlockEdit',
    'custom/heading-inspector-controls',
    addHeadingInspectorControls
);

addFilter(
    'blocks.getSaveElement',
    'custom/add-data-attributes',
    addDataAttributesToSave
);
