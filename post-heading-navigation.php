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
        add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_editor_assets' ] );
    }

    public function register_block() {
        // Register the block type
        register_block_type( 'custom/post-heading-navigation', [
            'editor_script' => self::SLUG . '-block',
            'render_callback' => [ $this, 'render_navigation_block' ],
            'attributes' => [
                'maxHeadingLevel' => [
                    'type' => 'number',
                    'default' => 2,
                ],
            ],
        ] );
    }

    public function render_navigation_block( $attributes ) {
        global $post;

        if ( ! $post instanceof WP_Post ) {
            return '';
        }

        $max_heading_level = isset( $attributes['maxHeadingLevel'] ) ? $attributes['maxHeadingLevel'] : 2;
        $content = $post->post_content;

        preg_match_all( '/<h([2-' . $max_heading_level . '])[^>]*>(.*?)<\/h[2-' . $max_heading_level . ']>/i', $content, $matches, PREG_SET_ORDER );

        if ( empty( $matches ) ) {
            return '';
        }

        $output = '<nav class="post-heading-navigation"><ul>';
        foreach ( $matches as $heading ) {
            $label = $heading[2];
            $id = 'h-' . sanitize_title( $label );
            $navigation_label = get_post_meta( $post->ID, '_custom_heading_navigation_label', true );
            $exclude_from_navigation = get_post_meta( $post->ID, '_custom_heading_exclude_from_navigation', true );

            if ( $exclude_from_navigation ) {
                continue;
            }

            $label = $navigation_label ? esc_html( $navigation_label ) : esc_html( $label );
            $output .= '<li><a href="#' . esc_attr( $id ) . '">' . $label . '</a></li>';
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

        // Enqueue editor styles for admin view
        if ( is_admin() ) {
            wp_enqueue_style(
                self::SLUG . '-editor',
                plugins_url( 'build/editor.css', __FILE__ ),
                [ 'wp-edit-blocks' ],
                POST_HEADING_NAVIGATION_VERSION
            );
        }
    }

    public function enqueue_editor_assets() {
        // Enqueue the editor script with dependencies
        wp_enqueue_script(
            self::SLUG . '-block',
            plugins_url( 'build/index.js', __FILE__ ),
            [ 'wp-blocks', 'wp-element', 'wp-components', 'wp-compose', 'wp-hooks', 'wp-dom-ready', 'wp-block-editor', 'wp-data' ],
            filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' ),
            true
        );
    }
}

PostHeadingNavigation::get_instance();
