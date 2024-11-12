console.log("Script loaded for Post Heading Navigation testing");
console.log("Checking for window.wp and dependencies...");

// Function to initialize the plugin only when all dependencies are available
const initPlugin = () => {
    if (typeof window.wp !== 'undefined' && wp.domReady && wp.hooks) {
        console.log("window.wp, wp.hooks, and wp.domReady are available");

        wp.domReady(() => {
            console.log("Editor is ready, registering filter...");

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
        });

        // Clear the interval once everything is loaded
        clearInterval(checkReadyInterval);
    } else {
        console.log("Waiting for window.wp and dependencies...");
    }
};

// Set an interval to check if wp and required dependencies are available
const checkReadyInterval = setInterval(initPlugin, 100);
