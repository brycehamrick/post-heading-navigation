console.log("Script loaded for Post Heading Navigation testing");

const initPlugin = () => {
    if (typeof window.wp !== 'undefined' && wp.hooks && wp.data) {
        console.log("wp.hooks and wp.data are available");

        // Test wp.hooks by adding and triggering a custom action
        wp.hooks.addAction('custom.testAction', 'custom/test-action-log', () => {
            console.log("custom.testAction was triggered successfully!");
        });

        // Trigger the action
        wp.hooks.doAction('custom.testAction');

        // Clear interval to stop further checks
        clearInterval(checkReadyInterval);
    } else {
        console.log("Waiting for wp.hooks and wp.data...");
    }
};

// Check if wp, wp.hooks, and wp.data are available after DOMContentLoaded
let checkReadyInterval;
window.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired, starting wp dependency check...");
    checkReadyInterval = setInterval(initPlugin, 100);
});
