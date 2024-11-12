import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

console.log("Script loaded for Core Heading Modifications");

// Add custom attributes to core/heading block
function addCustomHeadingAttributes(settings, name) {
    if (name === 'core/heading') {
        settings.attributes = {
            ...settings.attributes,
            navigationLabel: {
                type: 'string',
                default: '', // Optional label for the navigation
            },
            excludeFromNavigation: {
                type: 'boolean',
                default: false, // Option to exclude from navigation
            },
        };
    }
    return settings;
}

// Add custom controls to core/heading block
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
                            value={navigationLabel}
                            onChange={(value) => setAttributes({ navigationLabel: value })}
                            help="Custom label for this heading in the navigation menu."
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

// Register filters to add custom attributes and controls
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
