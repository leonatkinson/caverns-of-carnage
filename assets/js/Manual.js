import { Cavern } from './Cavern.js';
import { Room } from './Room.js';
import { Passage } from './Passage.js';
import { Monster } from './Monster.js';
import { Item } from './Item.js';

export class Manual {
    static getMonsterBlock(monster) {
        let html = '<div class="coc-monster-block">';
        let header = '<strong>';
        if (monster.appearing > 1) {
            header += monster.appearing + ' ';
        }
        header += monster.name;
        if (monster.appearing > 1) {
            header += 's';
        }
        header += ':</strong>';
        header += monster.statBlock.replace(monster.name + ':', '');
        html += '<p>' + header + '</p>';

        let maxHp = 0;
        let hpLines = [];
        for (let i = 0; i < monster.appearing; i++) {
            const hpVal = monster.hp[i];
            if (hpVal > maxHp) maxHp = hpVal;
            const hp = hpVal + ' hp';
            let boxes = '';
            for (let h = 1; h <= hpVal; h++) {
                boxes += '▢';
                if (h % 5 === 0) boxes += ' ';
            }
            hpLines.push('<div class="coc-hp-item"><code>' + hp + ' <span class="coc-hp-boxes">' + boxes + '</span></code></div>');
        }

        let colClass = 'coc-hp-cols-2';
        if (maxHp < 6) {
            colClass = 'coc-hp-cols-4';
        } else if (maxHp <= 10) {
            colClass = 'coc-hp-cols-3';
        }

        html += '<div class="coc-hp-columns ' + colClass + '">' + hpLines.join('') + '</div>';
        html += '</div>';
        return html;
    }

    static getDoorDescription(type, location) {
        return type.charAt(0).toUpperCase() + type.slice(1) + ' on the ' + location;
    }

    static getHtml(level) {
        let html = '<h2>Level ' + level + '</h2>';

        // Wandering Monsters
        if (Cavern.wanderingMonsters && Cavern.wanderingMonsters.length > 0) {
            html += '<h3>Wandering Monsters d' + Cavern.wanderingMonsters.length + '</h3>';
            html += '<ol>';
            Cavern.wanderingMonsters.forEach((entry, key) => {
                let desc = '';
                if (entry instanceof Monster || (entry && entry.name && entry.statBlock)) {
                    if (entry.room !== null && entry.room !== undefined) {
                        const room = window.cocRoomList[entry.room];
                        desc = entry.name + ' from Room ' + (room.id + 1) + '. ' + room.name;
                    } else {
                        desc = Manual.getMonsterBlock(entry);
                        window.cocMonsterList.forEach(m => {
                            if (m.parent === entry.id) {
                                desc += Manual.getMonsterBlock(m);
                            }
                        });
                    }
                } else {
                    desc = entry;
                }
                html += '<li>' + desc + '</li>';
            });
            html += '</ol>';
        }

        // Rooms
        window.cocRoomList.forEach(room => {
            html += '<div class="coc-room-entry">';
            html += '<h4>' + (room.id + 1) + '. ' + room.name + '</h4>';
            if (room.trapped) {
                html += '<p><strong>Trapped:</strong> ' + room.trap + '</p>';
            }
            html += '<p>' + room.description + '</p>';

            // Contents
            html += '<p><strong>Contents:</strong> ';
            const list = [];
            if (room.contents && room.contents.length > 0) {
                room.contents.forEach(itemId => {
                    const item = window.cocItemList[itemId];
                    if (item) list.push(item.name);
                });
            }
            html += (list.length > 0 ? list.join(', ') + '.' : 'empty.') + '</p>';

            // Exits
            html += '<p><strong>Exits:</strong></p><ul>';
            room.outlets.forEach(passageId => {
                const passage = window.cocPassageList[passageId];
                if (!passage) return;
                let exit = '';
                if (passage.start === room.id) {
                    exit = Manual.getDoorDescription(passage.startDoor, passage.startLocation) + ' to Room ' + (passage.end + 1);
                } else {
                    exit = Manual.getDoorDescription(passage.endDoor, passage.endLocation) + ' to Room ' + (passage.start + 1);
                }
                exit += ' via ' + passage.length + '′ ';
                let light = 'dark';
                if (passage.light > 0.1 && passage.light <= 0.9) light = 'dim';
                else if (passage.light > 0.9) light = 'lighted';
                exit += light + ' passage';
                if (passage.trapped) {
                    exit += ' -- Trapped: ' + passage.trap;
                }
                html += '<li>' + exit + '</li>';
            });
            html += '</ul>';

            // Monsters
            if (room.monsters && room.monsters.length > 0) {
                room.monsters.forEach(monsterId => {
                    const monster = window.cocMonsterList[monsterId];
                    if (monster) {
                        html += Manual.getMonsterBlock(monster);
                    }
                });
            }

            html += '</div><hr/>';
        });

        return html;
    }
}
