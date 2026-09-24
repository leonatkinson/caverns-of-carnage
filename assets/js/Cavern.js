import { Room } from './Room.js';
import { Passage } from './Passage.js';
import { Monster } from './Monster.js';
import { Item } from './Item.js';

export class Cavern {
    /**
     * Initializes a new cavern instance for a given dungeon level.
     * @param {number} level - The dungeon level number.
     */
    constructor(level = 1) {
        // Initialize global list containers for rooms, passages, monsters, and items
        window.cocRoomList = [];
        window.cocPassageList = [];
        window.cocMonsterList = [];
        window.cocItemList = [];

        Cavern.level = level;
        Cavern.wanderingMonsters = [];
    }

    /**
     * Selects a random element from an array of choices.
     * @param {Array} choices - Array of selectable options.
     * @returns {*} The randomly chosen element.
     */
    chooseOne(choices) {
        // Return a randomly selected element from the choices array
        return choices[Math.floor(Math.random() * choices.length)];
    }

    /**
     * Selects an option from a weighted choice object.
     * @param {Object} choices - Dictionary mapping choices to weights.
     * @returns {string} The selected choice key.
     */
    chooseOneWeighted(choices) {
        // Calculate total weight of all choices
        let total = 0;
        for (const choice in choices) {
            total += choices[choice];
        }
        // Roll a random value within the total weight range
        let roll = Math.floor(Math.random() * total) + 1;
        let selectedChoice = null;
        // Subtract weights until the roll threshold is reached
        for (const choice in choices) {
            roll -= choices[choice];
            selectedChoice = choice;
            if (roll <= 0) break;
        }
        return selectedChoice;
    }

    /**
     * Rolls a sum of multiple die rolls.
     * @param {number} rolls - Number of dice to roll.
     * @param {number} sides - Number of sides per die.
     * @returns {number} The total sum of the rolls.
     */
    rollSum(rolls, sides) {
        // Accumulate sum across specified number of dice rolls
        let t = 0;
        for (let r = 0; r < rolls; r++) {
            t += Math.floor(Math.random() * sides) + 1;
        }
        return t;
    }

    /**
     * Rolls a value between low and high with optional curve distribution.
     * @param {number} low - Minimum value.
     * @param {number} high - Maximum value.
     * @param {number} curve - Curve factor.
     * @returns {number} The computed roll result.
     */
    roll(low, high, curve = 1) {
        // Sum multiple uniform random rolls to approximate a curve distribution
        let t = 0;
        for (let r = 0; r < curve; r++) {
            t += Math.floor(Math.random() * (high - low + 1)) + low;
        }
        return Math.round(t / curve);
    }

    /**
     * Evaluates a percentage chance roll.
     * @param {number} chance - Percentage threshold (1-100).
     * @returns {boolean} True if roll succeeds.
     */
    p(chance) {
        // Return true if a random percentile roll is within the chance threshold
        return (Math.floor(Math.random() * 100) + 1) <= chance;
    }

    /**
     * Computes a die roll specification string (e.g. "3d6+2").
     * @param {string|number} spec - Die roll specification.
     * @returns {number} The calculated result.
     */
    computeRoll(spec) {
        // Parse dice notation spec string into rolls, sides, and bonus
        const match = String(spec).match(/(\d+)d?(\d+)?([\+\-]\d+)?/);
        if (!match) return parseInt(spec, 10) || 1;
        const rolls = parseInt(match[1], 10);
        const sides = match[2] ? parseInt(match[2], 10) : 1;
        const bonus = match[3] ? parseInt(match[3], 10) : 0;
        let t = bonus;
        // Roll the dice and add bonus
        for (let r = 0; r < rolls; r++) {
            t += Math.floor(Math.random() * sides) + 1;
        }
        return t > 0 ? t : 1;
    }

    /**
     * Generates a complete cavern dungeon level layout.
     * @param {number} level - Dungeon level.
     */
    make(level = 1) {
        Cavern.level = level;
        Cavern.wanderingMonsters = [];

        // Generate the initial entrance room
        Room.generate(level, this);
        const targetRooms = 2 + this.roll(1, 30, 3);

        // Configure the entrance room settings and initial outlet passage
        let room = window.cocRoomList[0];
        room.name = 'Entrance';
        const passage = Passage.generate(room.id, level, window.cocRoomList, this);
        room.outlets.push(passage.id);

        // Iteratively expand the dungeon rooms and passages until target count is met
        let loop = 1000000;
        while (loop && window.cocRoomList.length < targetRooms) {
            room.alter(level, this);
            let moved = false;
            for (const passageId of room.outlets) {
                const pass = window.cocPassageList[passageId];
                if (pass.end === null) {
                    room = Room.generate(level, this);
                    room.outlets.push(passageId);
                    pass.end = room.id;
                    moved = true;
                }
            }
            if (!moved) {
                room = window.cocRoomList[Math.floor(Math.random() * window.cocRoomList.length)];
            }
            loop--;
        }

        // Clean up any dangling passages that failed to connect to a room
        for (const passageId in window.cocPassageList) {
            const pass = window.cocPassageList[passageId];
            if (pass.end === null) {
                delete window.cocPassageList[passageId];
            }
        }

        // Propagate lighting from lighted passages into dark rooms
        window.cocRoomList.forEach(r => {
            if (r.light > 0) return;
            r.outlets.forEach(passageId => {
                const pass = window.cocPassageList[passageId];
                if (pass && pass.light > 0) {
                    r.light += 0.25;
                    if (r.light > 1) r.light = 1;
                }
            });
        });

        // Assign descriptive names to rooms based on traps, monsters, or contents
        window.cocRoomList.forEach(r => {
            if (r.name === 'Entrance') return;
            let name = '';
            if (r.trapped) name += 'Trapped ';
            if (Math.floor(Math.random() * 2) === 0) {
                name += Room.purpose(this);
            } else if (r.monsters.length > 0) {
                const monster = window.cocMonsterList[r.monsters[0]];
                name += monster.name + ' Area';
            } else if (r.contents.length > 0) {
                const item = window.cocItemList[r.contents[0]];
                name += 'Room with ' + item.name;
            } else {
                name += 'Room';
            }
            r.name = name;
        });

        // Populate wandering monsters table for this cavern level
        const tableSizeChoices = [0, 4, 6, 8, 10, 12, 20];
        const tableSize = this.chooseOne(tableSizeChoices);
        const usedMonsters = [];
        for (let m = 0; m < tableSize; m++) {
            const rollVal = Math.floor(Math.random() * 10) + 1;
            if (rollVal <= 5) {
                const monster = Monster.makeMonsterByLevel(null, Cavern.level, window.cocRoomList, this);
                Cavern.wanderingMonsters.push(monster);
                usedMonsters.push(monster.id);
            } else if (rollVal <= 9) {
                const monsterId = Math.floor(Math.random() * window.cocMonsterList.length);
                let monster;
                if (usedMonsters.includes(monsterId) || !window.cocMonsterList[monsterId]) {
                    monster = Monster.makeMonsterByLevel(null, Cavern.level, window.cocRoomList, this);
                } else {
                    monster = window.cocMonsterList[monsterId];
                }
                Cavern.wanderingMonsters.push(monster);
                usedMonsters.push(monster.id);
            } else {
                Cavern.wanderingMonsters.push(this.getEvent());
            }
        }

        // Cache the generated level data for multi-level tracking
        if (!window.cocGeneratedLevels) {
            window.cocGeneratedLevels = [];
        }
        window.cocGeneratedLevels = window.cocGeneratedLevels.filter(l => l.level < level);
        window.cocGeneratedLevels.push({
            level: level,
            roomList: JSON.parse(JSON.stringify(window.cocRoomList)),
            monsterList: JSON.parse(JSON.stringify(window.cocMonsterList))
        });
    }

    /**
     * Generates a random environmental event description.
     * @returns {string} The event text.
     */
    getEvent() {
        // Return a randomly selected environmental event description
        const events = [
            'An earthquake rumbles from below, causing small stones to drop from above.',
            'Water rushes through the chamber, rising to 2d6 inches, then recedes.',
            'Water falls from the ceiling, drenching everything.',
            'Sulfrous gas burns noses then passes.',
            'Air blows strongly for 1d6 minutes then subsides.',
            'The unmistakable sound of one of the monsters in the area echoes through the chamber.',
            'The sound of a distant gong is heard. The next 1d6 rolls made by the PCs automatically fail.',
            'The tinkle of bells skitters through the chamber. The next 1d6 rolls made by the PCs automatically succeed.'
        ];
        return this.chooseOne(events);
    }
}
