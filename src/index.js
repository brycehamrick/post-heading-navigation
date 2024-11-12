import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

console.log("Script loaded for Post Heading Navigation");

// Step 1: Register the Custom Block
registerBlockType('custom/post-heading-navigation', {
    title: 'Post Heading Navigation',
    icon: 'list-view',
    category: 'widgets',
    attributes: {
        maxHeadingLevel: { type: 'number', default: 2 },
    },
    edit({ attributes, setAttributes }) {
        const { maxHeadingLevel } = attributes;

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title="Navigation Settings">
                        <SelectControl
                            label="Maximum Heading Level"
                            value={maxHeadingLevel}
                            options={[
                                { label: 'H2', value: 2 },
                                { label: 'H3', value: 3 },
                                { label: 'H4', value: 4 },
                            ]}
                            onChange={(newValue) =>
                                setAttributes({
                                    maxHeadingLevel: parseInt(newValue, 10),
                                })
                            }
                        />
                    </PanelBody>
                </InspectorControls>
                <div>{`Navigation Menu up to H${maxHeadingLevel}`}</div>
            </Fragment>
        );
    },
    save() {
        return null; // Server-rendered
    },
});

// Step 2: Add Custom Attributes and Controls to the Core Heading Block
const initPlugin = () => {
    if (typeof window.wp !== 'undefined' && wp.blocks && wp.hooks && wp.data) {
        console.log("wp, wp.blocks, wp.hooks, and wp.data are available");

        // Access the original core/heading block type
        const headingBlock = wp.blocks.getBlockType('core/heading');

        if (headingBlock) {
            console.log("Original core/heading settings:", headingBlock);

            // Define custom attributes for navigation label and exclusion toggle
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

            // Add inspector controls for the custom attributes
            const addHeadingInspectorControls = createHigherOrderComponent((BlockEdit) => {
                return (props) => {
                    if (props.name !== 'core/heading') {
                        return <BlockEdit {...props} />;
                    }

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

            // Register filter to add inspector controls for `core/heading`
            addFilter(
                'editor.BlockEdit',
                'custom/heading-inspector-controls',
                addHeadingInspectorControls
            );

            // Unregister and re-register the modified core/heading block
            wp.blocks.unregisterBlockType('core/heading');
            wp.blocks.registerBlockType('core/heading', { ...headingBlock, ...customHeadingSettings });

            console.log("core/heading block modified successfully");
        } else {
            console.log("core/heading block not found");
        }

        // Stop the interval after modifications are applied
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
