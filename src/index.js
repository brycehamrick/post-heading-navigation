import { wp } from '@wordpress/blocks';

console.log("Script loaded for Post Heading Navigation testing");

const initPlugin = () => {
    // Check if wp, wp.data, wp.domReady, and wp.hooks are available
    if (typeof window.wp !== 'undefined' && wp.domReady && wp.hooks && wp.data) {
        console.log("window.wp, wp.data, wp.domReady, and wp.hooks are available");

        // Run after the editor is ready
        wp.domReady(() => {
            console.log("Editor is ready, registering filter...");

            // Basic filter to modify core/paragraph block title and log output
            wp.hooks.addFilter(
                'blocks.registerBlockType',
                'custom/test-filter-log',
                (settings, name) => {
                    console.log(`Filter is being triggered for block: ${name}`);
                    return settings;
                }
            );
        });

        // Stop the interval once everything is loaded
        clearInterval(checkReadyInterval);
    } else {
        console.log("Waiting for window.wp and dependencies...");
    }
};

// Check every 100ms if wp, wp.data, and dependencies are ready
const checkReadyInterval = setInterval(initPlugin, 100);
