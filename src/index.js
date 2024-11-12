import { wp } from '@wordpress/blocks';

console.log("Script loaded for Post Heading Navigation testing");

const initPlugin = () => {
    if (typeof window.wp !== 'undefined' && wp.domReady && wp.hooks) {
        console.log("window.wp, wp.hooks, and wp.domReady are available");

        wp.domReady(() => {
            console.log("Editor is ready, attempting to register filter...");

            // Test if the hook itself is triggering
            wp.hooks.addFilter(
                'blocks.registerBlockType',
                'custom/test-filter-log', // A unique namespace for this filter
                (settings, name) => {
                    console.log(`Filter is being triggered for block: ${name}`);
                    return settings;
                }
            );
        });

        clearInterval(checkReadyInterval); // Stop checking once dependencies are loaded
    } else {
        console.log("Waiting for window.wp and dependencies...");
    }
};

const checkReadyInterval = setInterval(initPlugin, 100);
