import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';

console.log("Script loaded for Post Heading Navigation");

// Step 1: Register the Custom Block (Post Heading Navigation)
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

// Step 2: Modify Core Heading Attributes and Attach Inspector Controls
const modifyCoreHeading = () => {
    const headingBlock = wp.blocks.getBlockType('core/heading');

    if (headingBlock) {
        console.log("Modifying core/heading block...");

        // Define new attributes
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

        // Re-register the core/heading block with custom attributes
        wp.blocks.unregisterBlockType('core/heading');
        wp.blocks.registerBlockType('core/heading', { ...headingBlock, ...customHeadingSettings });

        console.log("core/heading block modified successfully with custom attributes");

        // Directly render Inspector controls on core/heading block
        const addHeadingInspectorControls = (BlockEdit) => (props) => {
            if (props.name !== 'core/heading') {
                return <BlockEdit {...props} />;
            }

            const { attributes, setAttributes } = props;
            const { navigationLabel, excludeFromNavigation } = attributes;

            console.log("Rendering Inspector Controls for core/heading...");

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

        // Register the modified Inspector controls filter for `core/heading`
        addFilter(
            'editor.BlockEdit',
            'custom/heading-inspector-controls',
            addHeadingInspectorControls
        );

    } else {
        console.log("core/heading block not found");
    }
};

// Initialize after dependencies are available
const initPlugin = () => {
    if (typeof window.wp !== 'undefined' && wp.blocks && wp.hooks && wp.data) {
        console.log("Dependencies available. Modifying core blocks...");
        modifyCoreHeading();

        // Clear the interval
        clearInterval(checkReadyInterval);
    } else {
        console.log("Waiting for wp.blocks, wp.hooks, and wp.data...");
    }
};

// Run initialization on DOMContentLoaded
let checkReadyInterval;
window.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired, starting wp dependency check...");
    checkReadyInterval = setInterval(initPlugin, 100);
});
