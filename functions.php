<?php
/**
 * functions.php
 *
 */

/**
 * Include all php files in the /lib directory
 *
 * https://gist.github.com/theandystratton/5924570
 */
add_action( 'genesis_setup', 'bsg_load_lib_files', 15 );

function bsg_load_lib_files() {
    foreach ( glob( dirname( __FILE__ ) . '/lib/*.php' ) as $file ) { include $file; }
}

/**
 * Incorporate 'grandchild' customizations via custom/lib directory
 */
add_action( 'genesis_setup', 'bsg_custom_load_lib_files', 30 );

function bsg_custom_load_lib_files() {
    foreach ( glob( dirname( __FILE__ ) . '/custom/lib/*.php' ) as $file ) { include $file; }
}
