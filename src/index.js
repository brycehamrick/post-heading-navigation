console.log("Script loaded for Post Heading Navigation testing");

const initPlugin = () => {
    if (typeof window.wp !== 'undefined' && wp.hooks && wp.data) {
        console.log("wp.hooks and wp.data are available");

        // Register a custom filter
        wp.hooks.addFilter(
            'custom.testFilter',
            'custom/test-filter-log',
            (content) => {
                console.log("custom.testFilter triggered");
                return content + " - Filtered Content";
            }
        );

        // Apply the custom filter directly to test if it works
        const result = wp.hooks.applyFilters('custom.testFilter', 'Original Content');
        console.log("Result after applying custom.testFilter:", result);

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
