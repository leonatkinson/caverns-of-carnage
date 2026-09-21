/**
 * Gutenberg Block Registration for Caverns of Carnage
 */
( function( blocks, element ) {
    var el = element.createElement;

    blocks.registerBlockType( 'caverns-of-carnage/dungeon-generator', {
        title: 'Caverns of Carnage Dungeon Generator',
        icon: 'shield',
        category: 'widgets',
        edit: function( props ) {
            return el(
                'div',
                { className: props.className + ' coc-editor-preview' },
                el( 'div', { style: { padding: '20px', background: '#eef2f5', border: '2px dashed #b5c6d0', textAlign: 'center', borderRadius: '4px' } },
                    el( 'h3', { style: { margin: '0 0 10px', color: '#1d2327' } }, '🛡️ Caverns of Carnage Dungeon Generator' ),
                    el( 'p', { style: { margin: '0 0 15px', color: '#646970' } }, 'This block renders an interactive dungeon generator form, topological map viewer, and adventure manual for GMs.' ),
                    el( 'div', { style: { background: '#fff', padding: '15px', border: '1px solid #c3c4c7', borderRadius: '4px', display: 'inline-block' } },
                        el( 'strong', {}, 'Features:' ),
                        el( 'ul', { style: { textAlign: 'left', margin: '5px 0 0 20px', fontSize: '13px' } },
                            el( 'li', {}, 'Starting Dungeon Level & Multi-Level Generation' ),
                            el( 'li', {}, 'Organic Cytoscape.js Topological Maps' ),
                            el( 'li', {}, 'Complete Room Descriptions, Traps & Wandering Monsters' ),
                            el( 'li', {}, 'Monster Stat Blocks with HP Tracker Checkboxes' )
                        )
                    )
                )
            );
        },
        save: function() {
            return null;
        },
    } );
} )( window.wp.blocks, window.wp.element );
