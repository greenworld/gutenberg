<?php
/**
 * Interactivity API functions specific for the Gutenberg editor plugin.
 *
 * @package gutenberg
 */

/**
 * Deregisters the Core Interactivity API Modules and replace them
 * with the ones from the Gutenberg plugin.
 */
function gutenberg_reregister_interactivity_script_modules() {
	$default_version = defined( 'GUTENBERG_VERSION' ) && ! SCRIPT_DEBUG ? GUTENBERG_VERSION : time();
	wp_deregister_script_module( '@wordpress/interactivity' );
	wp_deregister_script_module( '@wordpress/interactivity-router' );

	$experiments                  = get_option( 'gutenberg-experiments' );
	$full_page_navigation_enabled = isset( $experiments['gutenberg-full-page-client-side-navigation'] );

	$index_path    = gutenberg_dir_path() . 'build/interactivity/index.min.asset.php';
	$index_asset   = file_exists( $index_path ) ? require $index_path : null;
	$index_version = isset( $index_asset['version'] ) ? $index_asset['version'] : $default_version;

	wp_register_script_module(
		'@wordpress/interactivity',
		gutenberg_url( '/build/interactivity/' . ( SCRIPT_DEBUG ? 'debug.min.js' : 'index.min.js' ) ),
		array(),
		$full_page_navigation_enabled ? null : $index_version
	);

	$router_path    = gutenberg_dir_path() . 'build/interactivity/router.min.asset.php';
	$router_asset   = file_exists( $router_path ) ? require $router_path : null;
	$router_version = isset( $router_asset['version'] ) ? $router_asset['version'] : $default_version;

	wp_register_script_module(
		'@wordpress/interactivity-router',
		gutenberg_url( '/build/interactivity/router.min.js' ),
		array( '@wordpress/interactivity' ),
		$full_page_navigation_enabled ? null : $router_version
	);
}

add_action( 'init', 'gutenberg_reregister_interactivity_script_modules' );
