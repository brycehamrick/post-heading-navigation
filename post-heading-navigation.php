<?php
/**
 * Plugin Name: Post Heading Navigation
 * Description: Adds a Gutenberg block for post heading navigation and custom heading block settings.
 * Version: 0.0.1
 * Author: Bryce Hamrick
 */

defined( 'ABSPATH' ) || exit;

class PostHeadingNavigation {
    /**
     * Plugin slug used for asset handles and text domains.
     */
    const SLUG = 'post-heading-navigation';

    /**
     * Constructor to initialize the plugin.
     */
    public function __construct() {
        add_action( 'init', [ $this, 'register_block' ] );
        add_action( 'enqueue_block_assets', [ $this, 'enqueue_assets' ] );
    }

    /**
     * Register the Gutenberg block and render callback.
     */
    public function register_block() {
        // Register the block's JavaScript file
        wp_register_script(
            self::SLUG . '-block',
            plugins_url( 'build/index.js', __FILE__ ),
            [ 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data' ],
            filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
        );

        // Register the block with server-side rendering callback
        register_block_type( 'custom/post-heading-navigation', [
            'editor_script'   => self::SLUG . '-block',
            'render_callback' => [ $this, 'render_navigation_block' ],
            'attributes'      => [
                'maxHeadingLevel' => [
                    'type'    => 'number',
                    'default' => 2
                ],
            ],
        ] );
    }

    /**
     * Render callback for the navigation block.
     *
     * @param array $attributes Block attributes.
     * @return string Rendered HTML for the navigation.
     */
    public function render_navigation_block( $attributes ) {
        global $post;

        // Get the maximum heading level from attributes or default to H2
        $max_heading_level = isset( $attributes['maxHeadingLevel'] ) ? $attributes['maxHeadingLevel'] : 2;

        // Parse post content for headings up to the specified level
        $content = apply_filters( 'the_content', $post->post_content );
        preg_match_all( '/<h([2-' . $max_heading_level . '])[^>]*>(.*?)<\/h[2-' . $max_heading_level . ']>/i', $content, $matches, PREG_SET_ORDER );

        // Return an empty string if no headings found
        if ( empty( $matches ) ) {
            return '';
        }

        // Build the navigation HTML
        $output = '<nav class="post-heading-navigation"><ul>';
        foreach ( $matches as $heading ) {
            $label = $heading[2];
            $output .= '<li><a href="#' . sanitize_title( $label ) . '">' . esc_html( $label ) . '</a></li>';
        }
        $output .= '</ul></nav>';

        return $output;
    }

    /**
     * Enqueue frontend and editor styles for the block.
     */
    public function enqueue_assets() {
        // Enqueue frontend styles
        wp_enqueue_style(
            self::SLUG . '-style',
            plugins_url( 'build/style.css', __FILE__ ),
            [],
            filemtime( plugin_dir_path( __FILE__ ) . 'build/style.css' )
        );

        // Enqueue editor styles
        if ( is_admin() ) {
            wp_enqueue_style(
                self::SLUG . '-editor',
                plugins_url( 'build/editor.css', __FILE__ ),
                [ 'wp-edit-blocks' ],
                filemtime( plugin_dir_path( __FILE__ ) . 'build/editor.css' )
            );
        }
    }
}

// Initialize the plugin
new PostHeadingNavigation();
