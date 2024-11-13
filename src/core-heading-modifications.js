import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';

console.log("Script loaded for Core Heading Modifications");

// Step 1: Add custom attributes to core/heading
function addCustomHeadingAttributes(settings, name) {
    if (name === 'core/heading') {
        console.log("Adding custom attributes to core/heading");

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

// Step 2: Add inspector controls to edit custom attributes in the sidebar
const addHeadingInspectorControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        if (props.name !== 'core/heading') return <BlockEdit {...props} />;

        const { attributes, setAttributes } = props;
        const { navigationLabel, excludeFromNavigation } = attributes;

        console.log("Rendering Inspector Controls for core/heading");

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
        console.log("Overriding save function for core/heading");
        const originalSave = settings.save;

        settings.save = (props) => {
            const { navigationLabel, excludeFromNavigation } = props.attributes;
            const element = originalSave(props);

            if (element?.props) {
                const newProps = {
                    ...element.props,
                    ...(navigationLabel ? { 'data-nav-label': navigationLabel } : {}),
                    ...(excludeFromNavigation ? { 'data-exclude-nav': 'true' } : {}),
                };

                console.log("Adding data-* attributes to core/heading in save function:", newProps);
                return wp.element.cloneElement(element, newProps);
            }

            return element;
        };
    }

    return settings;
}

// Register filters to apply custom attributes and override save
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

console.log("All filters registered for Core Heading Modifications");
