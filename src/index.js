console.log("Script loaded for Post Heading Navigation testing");

const initPlugin = () => {
    if (typeof window.wp !== 'undefined' && wp.blocks && wp.hooks && wp.data) {
        console.log("wp, wp.blocks, wp.hooks, and wp.data are available");

        // Register a simple custom block
        wp.blocks.registerBlockType('custom/test-block', {
            title: 'Test Block',
            category: 'widgets',
            icon: 'smiley',
            edit: () => wp.element.createElement('p', null, 'This is a test block.'),
            save: () => wp.element.createElement('p', null, 'This is a test block.')
        });

        // Apply `blocks.registerBlockType` to see if it triggers for new blocks
        wp.hooks.addFilter(
            'blocks.registerBlockType',
            'custom/test-register-log',
            (settings, name) => {
                console.log(`blocks.registerBlockType triggered for block: ${name}`);
                return settings;
            }
        );

        // Stop interval after registration
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
