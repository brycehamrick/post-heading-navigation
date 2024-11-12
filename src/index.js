import { wp } from '@wordpress/blocks';

// Basic script load confirmation
console.log("Script loaded for Post Heading Navigation testing");

// Check for `wp.domReady` and `wp.hooks` availability
console.log("Checking for wp.hooks and wp.domReady...");

// Confirm if wp.hooks and wp.domReady are accessible
if (typeof wp.domReady === 'function') {
    console.log("wp.domReady is available");

    wp.domReady(() => {
        console.log("Editor is ready, registering filter...");

        if (wp.hooks && typeof wp.hooks.addFilter === 'function') {
            console.log("wp.hooks.addFilter is available");

            // Basic filter to modify core/paragraph block title and log output
            function modifyParagraphBlock(settings, name) {
                if (name === 'core/paragraph') {
                    console.log("Modifying core/paragraph block settings");
                    settings.title = "Modified Paragraph Block"; // Change title for testing
                }
                return settings;
            }

            // Register the filter
            wp.hooks.addFilter(
                'blocks.registerBlockType', // Hook for block registration
                'custom/modify-paragraph-block', // Unique namespace
                modifyParagraphBlock // Function to apply in this filter
            );
        } else {
            console.log("wp.hooks.addFilter is not available");
        }
    });
} else {
    console.log("wp.domReady is not available");
}