<?php
/**
 * PHP and WordPress configuration compatibility functions for the Gutenberg
 * editor plugin changes related to REST API.
 *
 * @package gutenberg
 */

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Silence is golden.' );
}

/**
 * Overrides the REST controller for the `wp_global_styles` post type.
 *
 * @param array  $args      Array of arguments for registering a post type.
 *                          See the register_post_type() function for accepted arguments.
 * @param string $post_type Post type key.
 *
 * @return array Array of arguments for registering a post type.
 */
function gutenberg_override_global_styles_endpoint( array $args, string $post_type ): array {
	if ( 'wp_global_styles' === $post_type ) {
		$args['rest_controller_class'] = 'WP_REST_Global_Styles_Controller_Gutenberg';
	}

	return $args;
}
add_filter( 'register_post_type_args', 'gutenberg_override_global_styles_endpoint', 10, 2 );

if ( ! function_exists( 'gutenberg_register_edit_site_export_controller_endpoints' ) ) {
	/**
	 * Registers the Edit Site Export REST API routes.
	 */
	function gutenberg_register_edit_site_export_controller_endpoints() {
		$edit_site_export_controller = new WP_REST_Edit_Site_Export_Controller_Gutenberg();
		$edit_site_export_controller->register_routes();
	}
}

add_action( 'rest_api_init', 'gutenberg_register_edit_site_export_controller_endpoints' );

if ( ! function_exists( 'gutenberg_register_wp_rest_post_types_controller_fields' ) ) {
	/**
	 * Adds `template` and `template_lock` fields to WP_REST_Post_Types_Controller class.
	 */
	function gutenberg_register_wp_rest_post_types_controller_fields() {
		register_rest_field(
			'type',
			'template',
			array(
				'get_callback' => function ( $item ) {
					$post_type = get_post_type_object( $item['slug'] );
					if ( ! empty( $post_type ) ) {
						return $post_type->template ?? array();
					}
				},
				'schema'       => array(
					'type'        => 'array',
					'description' => __( 'The block template associated with the post type.', 'gutenberg' ),
					'readonly'    => true,
					'context'     => array( 'view', 'edit', 'embed' ),
				),
			)
		);
		register_rest_field(
			'type',
			'template_lock',
			array(
				'get_callback' => function ( $item ) {
					$post_type = get_post_type_object( $item['slug'] );
					if ( ! empty( $post_type ) ) {
						return ! empty( $post_type->template_lock ) ? $post_type->template_lock : false;
					}
				},
				'schema'       => array(
					'type'        => array( 'string', 'boolean' ),
					'enum'        => array( 'all', 'insert', 'contentOnly', false ),
					'description' => __( 'The template_lock associated with the post type, or false if none.', 'gutenberg' ),
					'readonly'    => true,
					'context'     => array( 'view', 'edit', 'embed' ),
				),
			)
		);
	}
}
add_action( 'rest_api_init', 'gutenberg_register_wp_rest_post_types_controller_fields' );
