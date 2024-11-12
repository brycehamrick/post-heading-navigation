console.log("Script loaded for Post Heading Navigation testing");

const initPlugin = () => {
    // Ensure wp, wp.hooks, and wp.data are available
    if (typeof window.wp !== 'undefined' && wp.hooks && wp.data) {
        console.log("wp.hooks and wp.data are available");

        // Register the filter directly
        wp.hooks.addFilter(
            'blocks.registerBlockType',
            'custom/test-filter-log',
            (settings, name) => {
                console.log(`Filter is being triggered for block: ${name}`);
                return settings;
            }
        );

        // Clear interval after successful initialization
        clearInterval(checkReadyInterval);
    } else {
        console.log("Waiting for wp.hooks and wp.data...");
    }
};

// Set an interval to check for wp, wp.hooks, and wp.data readiness
let checkReadyInterval;

// Start the interval only after DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired, starting wp dependency check...");
    checkReadyInterval = setInterval(initPlugin, 100);
});
