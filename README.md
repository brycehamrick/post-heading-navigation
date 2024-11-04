# Post Heading Navigation

**Contributors:** Bryce Hamrick  
**Tags:** Gutenberg, block, navigation, heading navigation, WordPress  
**Requires at least:** 5.0  
**Tested up to:** 6.3  
**Requires PHP:** 7.0  
**Stable tag:** 1.0  
**License:** GPLv2 or later  
**License URI:** https://www.gnu.org/licenses/gpl-2.0.html  

A custom Gutenberg block that generates a navigation menu for headings in a post, with customizable settings.

---

## Description

The **Post Heading Navigation** plugin adds a custom Gutenberg block that generates a navigation menu based on the headings (H2, H3, or H4) in a post. This navigation block is useful for creating a table of contents, allowing readers to quickly jump to different sections of the content. The plugin includes settings to control the maximum heading level to include in the navigation, along with additional options for individual Heading blocks.

### Features

- **Custom Gutenberg Block**: Adds a new block for post heading navigation.
- **Maximum Heading Level Setting**: Choose the maximum heading level (H2, H3, or H4) to include in the navigation.
- **Custom Heading Options**: Each Heading block can have a custom navigation label and an option to exclude it from the navigation.

---

## Installation

1. Download the plugin and unzip it.
2. Upload the `post-heading-navigation` folder to the `/wp-content/plugins/` directory.
3. Activate the plugin through the 'Plugins' menu in WordPress.

---

## Usage

1. After activating the plugin, go to any post or page in the Gutenberg editor.
2. In the block inserter, search for **Post Heading Navigation** and add it to your content.
3. In the block settings, choose the **Maximum Heading Level** (H2, H3, or H4) to control which headings are included in the navigation.
4. To customize individual headings:
   - Select any Heading block (H2, H3, etc.).
   - In the **Block Settings**, you will find options for:
     - **Navigation Label**: Set a custom label to display in the navigation menu.
     - **Exclude from Navigation**: Check this option if you want to exclude the heading from the navigation menu.

The navigation menu will automatically display links to the headings based on your settings.
