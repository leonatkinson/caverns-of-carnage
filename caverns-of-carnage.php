<?php
/**
 * Plugin Name: Caverns of Carnage
 * Plugin URI: https://github.com/leonatkinson/caverns-of-carnage
 * Description: WordPress block plugin for generating multi-level fantasy dungeons complete with topological maps and adventure manuals.
 * Version: 1.0.0
 * Author: Leon Atkinson
 * License: MIT
 * License URI: https://opensource.org/licenses/MIT
 * Text Domain: caverns-of-carnage
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register the Gutenberg block and render callback.
 */
function caverns_of_carnage_init() {
    wp_register_script(
        'caverns-of-carnage-editor',
        plugins_url( 'src/index.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor' ),
        '1.0.0',
        true
    );

    register_block_type( 'caverns-of-carnage/dungeon-generator', array(
        'api_version'     => 2,
        'title'           => __( 'Caverns of Carnage Dungeon Generator', 'caverns-of-carnage' ),
        'category'        => 'widgets',
        'icon'            => 'shield',
        'description'     => __( 'Generate multi-level OSR fantasy dungeons with interactive SVG maps and adventure manuals.', 'caverns-of-carnage' ),
        'editor_script'   => 'caverns-of-carnage-editor',
        'attributes'      => array(
            'startLevel'  => array( 'type' => 'integer', 'default' => 1 ),
            'numLevels'   => array( 'type' => 'integer', 'default' => 1 ),
        ),
        'render_callback' => 'caverns_of_carnage_render_block',
    ) );
}
add_action( 'init', 'caverns_of_carnage_init' );

/**
 * Render callback for the Caverns of Carnage block.
 */
function caverns_of_carnage_render_block( $attributes ) {
    $start_level = isset( $attributes['startLevel'] ) ? intval( $attributes['startLevel'] ) : 1;
    $num_levels  = isset( $attributes['numLevels'] ) ? intval( $attributes['numLevels'] ) : 1;

    // Enqueue frontend generator script and styles
    $script_ver = file_exists( plugin_dir_path( __FILE__ ) . 'assets/js/bundle.js' ) ? filemtime( plugin_dir_path( __FILE__ ) . 'assets/js/bundle.js' ) : '1.0.0';
    $style_ver  = file_exists( plugin_dir_path( __FILE__ ) . 'assets/css/style.css' ) ? filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/style.css' ) : '1.0.0';

    wp_enqueue_script(
        'caverns-of-carnage-bundle',
        plugins_url( 'assets/js/bundle.js', __FILE__ ),
        array(),
        $script_ver,
        true
    );

    wp_enqueue_style(
        'caverns-of-carnage-style',
        plugins_url( 'assets/css/style.css', __FILE__ ),
        array(),
        $style_ver
    );

    $block_id = 'caverns-of-carnage-' . wp_rand( 1000, 9999 );

    ob_start();
    ?>
    <div id="<?php echo esc_attr( $block_id ); ?>" class="coc-container">
        <form class="coc-form" onsubmit="return false;">
            <div class="coc-field">
                <label><?php esc_html_e( 'Starting Dungeon Level (Difficulty):', 'caverns-of-carnage' ); ?></label>
                <input type="number" name="startLevel" min="1" max="20" value="<?php echo esc_attr( $start_level ); ?>" class="coc-start-level" />
            </div>
            <div class="coc-field">
                <label><?php esc_html_e( 'Levels to Generate:', 'caverns-of-carnage' ); ?></label>
                <input type="number" name="numLevels" min="1" max="10" value="<?php echo esc_attr( $num_levels ); ?>" class="coc-num-levels" />
            </div>
            <div class="coc-actions">
                <button type="button" class="button button-primary wp-element-button coc-generate-btn"><?php esc_html_e( 'Generate', 'caverns-of-carnage' ); ?></button>
                <button type="button" class="button button-secondary wp-element-button coc-download-btn" style="display:none; margin-left: 10px;"><?php esc_html_e( 'Download', 'caverns-of-carnage' ); ?></button>
            </div>
        </form>
        <div class="coc-output" style="display:none;">
            <div class="coc-level-tabs"></div>
            <div class="coc-level-content">
                <div class="coc-map-container">
                    <h3><?php esc_html_e( 'Dungeon Map', 'caverns-of-carnage' ); ?></h3>
                    <div class="coc-cytoscape-view" style="width: 100%; aspect-ratio: 8.5 / 11; border: 1px solid #c3c4c7; background: #fafafa; border-radius: 4px;"></div>
                </div>
                <div class="coc-manual-container">
                    <h3><?php esc_html_e( 'Adventure Manual', 'caverns-of-carnage' ); ?></h3>
                    <div class="coc-manual-text"></div>
                </div>
            </div>
        </div>
    </div>
    <script>
    document.addEventListener("DOMContentLoaded", function() {
        if (typeof initCavernsOfCarnage === "function") {
            initCavernsOfCarnage(document.getElementById("<?php echo esc_js( $block_id ); ?>"));
        }
    });
    </script>
    <?php
    return ob_get_clean();
}
