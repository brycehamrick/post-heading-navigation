<?php
/**
 * Plugin Name: Post Heading Navigation
 * Description: Adds a Gutenberg block for post heading navigation and custom heading block settings.
 * Version: 0.0.1
 * Author: Bryce Hamrick
 */

defined( 'ABSPATH' ) || exit;
define( 'POST_HEADING_NAVIGATION_VERSION', '0.0.1' );

class PostHeadingNavigation {
    const SLUG = 'post-heading-navigation';

    private static $instance = null;

    public static function get_instance() {
        if ( self::$instance === null ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct() {
        add_action( 'init', [ $this, 'register_block' ] );
        add_action( 'enqueue_block_assets', [ $this, 'enqueue_assets' ] );
    }

    public function register_block() {
        // Register the block's JavaScript file
        wp_register_script(
            self::SLUG . '-block',
            plugins_url( 'build/index.js', __FILE__ ),
            [ 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data' ], // Ensure these dependencies are correct
            filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' ),
            true // Load in footer
        );

        // Register the block type, specifying the editor script and the render callback
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

    public function render_navigation_block( $attributes ) {
        global $post;

        if ( ! $post instanceof WP_Post ) {
            return ''; // Ensure $post is a valid post object
        }

        $max_heading_level = isset( $attributes['maxHeadingLevel'] ) ? $attributes['maxHeadingLevel'] : 2;

        $content = $post->post_content;
        
        // Match all headings up to the specified level
        preg_match_all( '/<h([2-' . $max_heading_level . '])[^>]*>(.*?)<\/h[2-' . $max_heading_level . ']>/i', $content, $matches, PREG_SET_ORDER );

        if ( empty( $matches ) ) {
            return '';
        }

        // Generate the navigation list with correctly prefixed IDs
        $output = '<nav class="post-heading-navigation"><ul>';
        foreach ( $matches as $heading ) {
            $label = $heading[2]; // The inner content of the heading
            $id = 'h-' . sanitize_title( $label ); // Add the "h-" prefix to match WordPress's format
            $output .= '<li><a href="#' . esc_attr( $id ) . '">' . esc_html( $label ) . '</a></li>';
        }
        $output .= '</ul></nav>';

        return $output;
    }


    public function enqueue_assets() {
        // Enqueue frontend styles
        wp_enqueue_style(
            self::SLUG . '-style',
            plugins_url( 'build/style.css', __FILE__ ),
            [],
            POST_HEADING_NAVIGATION_VERSION
        );

        // Enqueue editor styles
        if ( is_admin() ) {
            wp_enqueue_style(
                self::SLUG . '-editor',
                plugins_url( 'build/editor.css', __FILE__ ),
                [ 'wp-edit-blocks' ],
                POST_HEADING_NAVIGATION_VERSION
            );
        }
    }
}

PostHeadingNavigation::get_instance();
