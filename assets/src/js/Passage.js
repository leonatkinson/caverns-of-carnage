import { Trap } from './Trap.js';

export class Passage {
    /**
     * Initializes a new passage instance.
     */
    constructor() {
        this.id = 0;
        this.start = null;
        this.startDoor = '';
        this.startLocation = '';
        this.end = null;
        this.endDoor = '';
        this.endLocation = '';
        this.length = 0;
        this.light = 0;
        this.trapped = false;
        this.trap = '';
    }

    /**
     * Generates a new passage connecting rooms with randomized length, lighting, doors, and traps.
     * @param {number} roomId - Starting room identifier.
     * @param {number} level - Dungeon level.
     * @param {Array} roomList - Room list.
     * @param {Cavern} cavern - Cavern generator.
     * @returns {Passage} The created passage.
     */
    static generate(roomId, level, roomList, cavern) {
        // Create passage instance and register in global passage list
        const p = new Passage();
        if (!window.cocPassageList) window.cocPassageList = [];
        p.id = window.cocPassageList.length;
        window.cocPassageList[p.id] = p;

        p.start = roomId;
        p.end = null;
        p.length = Math.max(5, Math.round(cavern.roll(4, 100, 3) / 5) * 5);

        // Determine passage lighting level
        const light = Math.floor(Math.random() * 100) + 1;
        if (light <= 75) p.light = 0;
        else if (light <= 95) p.light = 0.5;
        else p.light = 1;

        // Roll start and end door types
        p.startDoor = Passage.getDoor(cavern);
        p.endDoor = Passage.getDoor(cavern);

        // Ensure consistency if secret doors are generated
        if (p.startDoor === 'secret door' || p.endDoor === 'secret door') {
            if (Math.random() < 0.9) {
                p.startDoor = 'secret door';
                p.endDoor = 'secret door';
            }
        }

        // Determine wall/floor locations for doors
        p.startLocation = Passage.getLocation(cavern);
        p.endLocation = Passage.getLocation(cavern);

        // Level-based check for passage traps
        if (Math.floor(Math.random() * 20) + 1 <= level) {
            p.trapped = true;
            p.trap = Trap.get(cavern);
        }

        return p;
    }

    /**
     * Rolls a random door type.
     * @param {Cavern} cavern - Cavern generator.
     * @returns {string} Door type name.
     */
    static getDoor(cavern) {
        const roll = cavern.roll(1, 4, 2);
        switch (roll) {
            case 1: return 'stuck door';
            case 2: return 'open doorway';
            case 3: return 'door';
            case 4: return 'secret door';
            default: return 'door';
        }
    }

    /**
     * Rolls a room wall or architectural location.
     * @param {Cavern} cavern - Cavern generator.
     * @returns {string} Location name.
     */
    static getLocation(cavern) {
        const roll = cavern.roll(1, 6, 2);
        switch (roll) {
            case 1: return 'floor';
            case 2: return 'north wall';
            case 3: return 'south wall';
            case 4: return 'east wall';
            case 5: return 'west wall';
            case 6: return 'ceiling';
            default: return 'north wall';
        }
    }

    /**
     * Maps door type to map arrow shape symbol.
     * @param {string} door - Door type.
     * @returns {string} Arrow shape identifier.
     */
    static getArrow(door) {
        switch (door) {
            case 'stuck door': return 'diamond';
            case 'door': return 'box';
            case 'secret door': return 'tee';
            case 'none':
            case 'open doorway':
            default: return 'odot';
        }
    }
}
