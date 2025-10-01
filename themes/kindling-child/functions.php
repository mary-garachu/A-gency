<?php
/**
 * Enqueue parent + child styles, Font Awesome, custom icons, and counter script
 */
function kindling_child_enqueue_assets() {
    // Parent theme style
    wp_enqueue_style(
        'kindling-parent-style',
        get_template_directory_uri() . '/style.css'
    );

    // Child theme style (depends on parent)
    wp_enqueue_style(
        'kindling-child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array('kindling-parent-style'),
        wp_get_theme()->get('Version')
    );

    // Font Awesome (CDN)
    wp_enqueue_style(
        'font-awesome',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
        array(),
        '6.5.2'
    );

    // Custom icons.css (make it load AFTER child style)
    wp_enqueue_style(
    'child-icons',
    get_stylesheet_directory_uri() . '/icons.css',
    array('kindling-child-style', 'font-awesome'),
    '1.0'
    );


    // Counter JS (in footer)
    wp_enqueue_script(
        'kindling-child-counter',
        get_stylesheet_directory_uri() . '/js/counter.js',
        array(), // dependencies if any
        '1.0',
        true
    );

    wp_enqueue_script(
        'scroll-top',
        get_stylesheet_directory_uri() . '/js/scroll-top.js',
        array(),
        '1.0',
        true
    );

}
add_action( 'wp_enqueue_scripts', 'kindling_child_enqueue_assets' );

function kindling_child_theme_setup() {
    add_theme_support( 'align-wide' );
}
add_action( 'after_setup_theme', 'kindling_child_theme_setup' );
