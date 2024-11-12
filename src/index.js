console.log("Script loaded for Post Heading Navigation");

const initPlugin = () => {
    if (typeof window.wp !== 'undefined' && wp.blocks && wp.hooks && wp.data) {
        console.log("wp, wp.blocks, wp.hooks, and wp.data are available");

        // Access the original core/heading block type
        const headingBlock = wp.blocks.getBlockType('core/heading');

        if (headingBlock) {
            console.log("Original core/heading settings:", headingBlock);

            // Define the custom attributes and settings for navigation
            const customHeadingSettings = {
                attributes: {
                    ...headingBlock.attributes,
                    navigationLabel: {
                        type: 'string',
                        default: '', // Default to an empty string, use heading text if empty
                    },
                    excludeFromNavigation: {
                        type: 'boolean',
                        default: false, // Default to false, meaning included in navigation
                    }
                }
            };

            // Add custom controls for the new attributes
            const addHeadingInspectorControls = wp.compose.createHigherOrderComponent((BlockEdit) => {
                return (props) => {
                    if (props.name !== 'core/heading') {
                        return <BlockEdit {...props} />;
                    }

                    const { attributes, setAttributes } = props;
                    const { navigationLabel, excludeFromNavigation } = attributes;

                    return (
                        <>
                            <BlockEdit {...props} />
                            <wp.blockEditor.InspectorControls>
                                <wp.components.PanelBody title="Navigation Settings">
                                    <wp.components.TextControl
                                        label="Navigation Label"
                                        value={navigationLabel}
                                        onChange={(value) => setAttributes({ navigationLabel: value })}
                                        help="Custom label for this heading in the navigation menu."
                                    />
                                    <wp.components.ToggleControl
                                        label="Exclude from Navigation"
                                        checked={excludeFromNavigation}
                                        onChange={(value) => setAttributes({ excludeFromNavigation: value })}
                                        help="Exclude this heading from the navigation menu."
                                    />
                                </wp.components.PanelBody>
                            </wp.blockEditor.InspectorControls>
                        </>
                    );
                };
            }, 'addHeadingInspectorControls');

            // Register the filter to add inspector controls
            wp.hooks.addFilter(
                'editor.BlockEdit',
                'custom/heading-inspector-controls',
                addHeadingInspectorControls
            );

            // Unregister and re-register the modified core/heading block type
            wp.blocks.unregisterBlockType('core/heading');
            wp.blocks.registerBlockType('core/heading', { ...headingBlock, ...customHeadingSettings });

            console.log("core/heading block modified successfully");
        } else {
            console.log("core/heading block not found");
        }

        // Stop interval after modification
        clearInterval(checkReadyInterval);
    } else {
        console.log("Waiting for wp.blocks, wp.hooks, and wp.data...");
    }
};

// Set interval to check dependencies after DOMContentLoaded
let checkReadyInterval;
window.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired, starting wp dependency check...");
    checkReadyInterval = setInterval(initPlugin, 100);
});
