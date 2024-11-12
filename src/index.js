import { wp } from '@wordpress/blocks';

// Console log to confirm script loading
console.log("Script loaded for Post Heading Navigation testing");

// Basic filter to modify `core/paragraph` block title and log output
function modifyParagraphBlock(settings, name) {
    if (name === 'core/paragraph') {
        console.log("Modifying core/paragraph block settings");
        
        // Change title of paragraph block for testing
        settings.title = "Modified Paragraph Block";
    }
    return settings;
}

// Register the filter using `addFilter`
wp.hooks.addFilter(
    'blocks.registerBlockType', // The filter hook for block registration
    'custom/modify-paragraph-block', // A unique namespace for this filter
    modifyParagraphBlock // The function to apply in this filter
);
