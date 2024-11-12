console.log("Script loaded for Post Heading Navigation testing");

const initPlugin = () => {
    if (typeof window.wp !== 'undefined' && wp.blocks && wp.hooks && wp.data) {
        console.log("wp, wp.blocks, wp.hooks, and wp.data are available");

        // Directly modify block settings using `wp.blocks.updateBlockType`
        const originalParagraphSettings = wp.blocks.getBlockType('core/paragraph');

        if (originalParagraphSettings) {
            // Log the original settings for inspection
            console.log("Original core/paragraph settings:", originalParagraphSettings);

            // Update the core/paragraph block title and add a custom attribute
            wp.blocks.updateBlockType('core/paragraph', {
                title: 'Modified Paragraph Block',
                attributes: {
                    ...originalParagraphSettings.attributes,
                    customAttribute: {
                        type: 'string',
                        default: 'This is a custom attribute'
                    }
                }
            });

            console.log("core/paragraph block modified successfully");
        } else {
            console.log("core/paragraph block not found");
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
