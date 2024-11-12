console.log("Script loaded for Post Heading Navigation testing");

const initPlugin = () => {
    if (typeof window.wp !== 'undefined' && wp.blocks && wp.hooks && wp.data) {
        console.log("wp, wp.blocks, wp.hooks, and wp.data are available");

        // Directly get and log block types using `wp.blocks.getBlockTypes`
        const allBlocks = wp.blocks.getBlockTypes();
        console.log("Retrieved block types directly:", allBlocks.map(block => block.name));

        // Stop the interval after logging
        clearInterval(checkReadyInterval);
    } else {
        console.log("Waiting for wp.blocks, wp.hooks, and wp.data...");
    }
};

// Set an interval to check for dependencies after DOMContentLoaded
let checkReadyInterval;
window.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired, starting wp dependency check...");
    checkReadyInterval = setInterval(initPlugin, 100);
});
