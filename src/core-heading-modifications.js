import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';

// Step 1: Add custom attributes to core/heading
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

// Step 2: Add controls to modify custom attributes in the editor sidebar
const addHeadingInspectorControls = createHigherOrderComponent((BlockEdit) => {
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
                            help="Custom label for this heading in the navigation menu."
                        />
                        <ToggleControl
                            label="Exclude from Navigation"
                            checked={!!excludeFromNavigation}
                            onChange={(value) => setAttributes({ excludeFromNavigation: value })}
                            help="Exclude this heading from the navigation menu."
                        />
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
}, 'addHeadingInspectorControls');

// Step 3: Override the core/heading save function to add data-* attributes
function overrideHeadingSave(settings, name) {
    if (name === 'core/heading') {
        const originalSave = settings.save;

        settings.save = (props) => {
            const { navigationLabel, excludeFromNavigation } = props.attributes;
            const element = originalSave(props);

            // Add data attributes if they are set in the block
            if (element?.props) {
                const newProps = {
                    ...element.props,
                    ...(navigationLabel ? { 'data-nav-label': navigationLabel } : {}),
                    ...(excludeFromNavigation ? { 'data-exclude-nav': 'true' } : {}),
                };

                // Return element with added data-* attributes
                return wp.element.cloneElement(element, newProps);
            }

            return element;
        };
    }

    return settings;
}

// Step 4: Register all filters
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
    'blocks.registerBlockType',
    'custom/override-heading-save',
    overrideHeadingSave
);
