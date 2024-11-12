console.log("Script loaded for Post Heading Navigation testing");

const initPlugin = () => {
    if (typeof window.wp !== 'undefined' && wp.blocks && wp.hooks && wp.data) {
        console.log("wp, wp.blocks, wp.hooks, and wp.data are available");

        // Check if the core/paragraph block type is registered
        const paragraphBlock = wp.blocks.getBlockType('core/paragraph');

        if (paragraphBlock) {
            console.log("Original core/paragraph settings:", paragraphBlock);

            // Define the custom attributes and settings we want to add
            const customSettings = {
                title: 'Modified Paragraph Block',
                attributes: {
                    ...paragraphBlock.attributes,
                    customAttribute: {
                        type: 'string',
                        default: 'This is a custom attribute'
                    }
                }
            };

            // Use a custom function to "re-register" the block type with new settings
            wp.hooks.addFilter(
                'blocks.registerBlockType',
                'custom/modify-paragraph-block',
                (settings, name) => {
                    if (name === 'core/paragraph') {
                        console.log("Applying custom settings to core/paragraph");
                        return { ...settings, ...customSettings };
                    }
                    return settings;
                }
            );

            // Force re-registration by removing and re-adding the block type
            wp.blocks.unregisterBlockType('core/paragraph');
            wp.blocks.registerBlockType('core/paragraph', { ...paragraphBlock, ...customSettings });

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
