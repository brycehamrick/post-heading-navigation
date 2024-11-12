console.log("Script loaded for Core Heading Modifications");

const initCoreHeadingModifications = () => {
    if (typeof window.wp !== 'undefined' && wp.blocks && wp.hooks && wp.data) {
        console.log("wp, wp.blocks, wp.hooks, and wp.data are available");

        const headingBlock = wp.blocks.getBlockType('core/heading');

        if (headingBlock) {
            console.log("Original core/heading settings:", headingBlock);

            const customHeadingSettings = {
                attributes: {
                    ...headingBlock.attributes,
                    navigationLabel: {
                        type: 'string',
                        default: '',
                    },
                    excludeFromNavigation: {
                        type: 'boolean',
                        default: false,
                    }
                }
            };

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

            wp.hooks.addFilter(
                'editor.BlockEdit',
                'custom/heading-inspector-controls',
                addHeadingInspectorControls
            );

            wp.blocks.unregisterBlockType('core/heading');
            wp.blocks.registerBlockType('core/heading', { ...headingBlock, ...customHeadingSettings });

            console.log("core/heading block modified successfully");
        } else {
            console.log("core/heading block not found");
        }

        clearInterval(checkReadyInterval);
    } else {
        console.log("Waiting for wp.blocks, wp.hooks, and wp.data...");
    }
};

let checkReadyInterval;
window.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired, starting wp dependency check for core/heading modifications...");
    checkReadyInterval = setInterval(initCoreHeadingModifications, 100);
});
