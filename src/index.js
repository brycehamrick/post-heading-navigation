import { wp } from '@wordpress/blocks';

// Confirm that the script has loaded
console.log("Script loaded for Post Heading Navigation testing");

// Use wp.domReady to register filter after the editor initializes
wp.domReady(() => {
    console.log("Editor is ready, registering filter...");

    // Check if wp.hooks exists and is ready
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
