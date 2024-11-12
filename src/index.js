import { wp } from '@wordpress/blocks';

console.log("Script loaded for Post Heading Navigation testing");

const waitForEditor = () => {
    // Check if the necessary WordPress dependencies are loaded
    if (typeof wp !== 'undefined' && wp.data && wp.data.select) {
        console.log("wp and wp.data.select are available");

        // Use the core/block-editor store to check if the editor is ready
        const { isEditorReady } = wp.data.select('core/block-editor') || {};

        if (isEditorReady) {
            console.log("Editor is fully ready, initializing filter...");

            // Register the filter for block registration
            wp.hooks.addFilter(
                'blocks.registerBlockType',
                'custom/test-filter-log', // A unique namespace for this filter
                (settings, name) => {
                    console.log(`Filter is being triggered for block: ${name}`);
                    return settings;
                }
            );

            // Stop the interval once initialization is complete
            clearInterval(waitForEditorInterval);
        } else {
            console.log("Editor not yet fully ready, waiting...");
        }
    } else {
        console.log("wp.data or wp.data.select is not available yet, waiting...");
    }
};

// Set an interval to periodically check for editor readiness
const waitForEditorInterval = setInterval(waitForEditor, 100);
