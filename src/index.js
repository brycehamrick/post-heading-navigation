console.log("Script loaded for Post Heading Navigation testing");

const initPlugin = () => {
    if (typeof window.wp !== 'undefined' && wp.hooks && wp.data) {
        console.log("wp.hooks and wp.data are available");

        // Register a filter on `blocks.getBlockTypes` to confirm it triggers
        wp.hooks.addFilter(
            'blocks.getBlockTypes',
            'custom/test-filter-log',
            (blockTypes) => {
                console.log("blocks.getBlockTypes filter triggered");
                blockTypes.forEach((blockType) => {
                    console.log(`Registered block: ${blockType.name}`);
                });
                return blockTypes;
            }
        );

        // Clear interval to stop further checks
        clearInterval(checkReadyInterval);
    } else {
        console.log("Waiting for wp.hooks and wp.data...");
    }
};

// Set interval to check if wp, wp.hooks, and wp.data are available after DOMContentLoaded
let checkReadyInterval;
window.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired, starting wp dependency check...");
    checkReadyInterval = setInterval(initPlugin, 100);
});
