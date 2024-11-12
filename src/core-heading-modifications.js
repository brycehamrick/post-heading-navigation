import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

console.log("Script loaded for Core Heading Modifications");

// Add custom attributes to the core/heading block type
function addCustomHeadingAttributes(settings, name) {
    if (name === 'core/heading') {
        settings.attributes = {
            ...settings.attributes,
            navigationLabel: {
                type: 'string',
                source: 'meta', // This tells WP to link it to a meta field
                meta: 'navigation_label', // Meta key in database
            },
            excludeFromNavigation: {
                type: 'boolean',
                source: 'meta', // Link to meta field
                meta: 'exclude_from_navigation', // Meta key in database
            },
        };
    }
    return settings;
}

// Add custom controls to core/heading block in the editor
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

// Register filters to add the custom attributes and controls
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
