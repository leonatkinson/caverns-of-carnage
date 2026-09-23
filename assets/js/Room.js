import { Passage } from './Passage.js';
import { Monster } from './Monster.js';
import { Item } from './Item.js';
import { Trap } from './Trap.js';

export class Room {
    constructor() {
        this.id = 0;
        this.name = 'Room';
        this.description = '';
        this.outlets = [];
        this.width = 0;
        this.depth = 0;
        this.height = 0;
        this.light = 0;
        this.trapped = false;
        this.trap = '';
        this.monsters = [];
        this.contents = [];
        this.hasStairsDown = false;
        this.stairsDownSentence = '';
        this.hasStairsUp = false;
        this.stairsUpSentence = '';
    }

    static generate(level, cavern) {
        if (!window.cocRoomList) window.cocRoomList = [];
        const r = new Room();
        r.id = window.cocRoomList.length;
        r.width = Math.max(5, Math.round((Math.floor(Math.random() * 46) + 5) / 5) * 5);
        r.depth = Math.max(5, Math.round((Math.floor(Math.random() * 46) + 5) / 5) * 5);
        r.height = Math.max(5, Math.round(cavern.roll(4, 12, 4) / 5) * 5);

        const light = Math.floor(Math.random() * 100) + 1;
        if (light <= 50) r.light = 0;
        else if (light <= 75) r.light = 0.5;
        else r.light = 1;

        window.cocRoomList[r.id] = r;

        r.description = 'The room is ' + r.width + '&prime;&times;' + r.depth + '&prime; with a ' + r.height + '&prime; ceiling.';

        if (cavern.p(10)) {
            r.hasStairsDown = true;
            r.stairsDownSentence = Room.stairs('down', cavern);
            r.description += ' ' + r.stairsDownSentence;
        }
        if (cavern.p(10)) {
            r.hasStairsUp = true;
            r.stairsUpSentence = Room.stairs('up', cavern);
            r.description += ' ' + r.stairsUpSentence;
        }

        const roll = Math.floor(Math.random() * 20) + 1;
        if (roll <= 12) {
            // Empty
        } else if (roll <= 16) {
            Monster.makeMonsterByLevel(r.id, level, window.cocRoomList, cavern);
        } else if (roll <= 18) {
            Monster.makeMonsterByLevel(r.id, level, window.cocRoomList, cavern);
            Item.makeTreasureByLevel(r.id, level, window.cocRoomList, cavern);
        } else if (roll === 19) {
            r.description += ' ' + Trap.get(cavern);
            r.trapped = true;
        } else {
            Item.makeTreasureByLevel(r.id, level, window.cocRoomList, cavern);
        }

        if (Math.floor(Math.random() * 20) + 1 === 1) {
            r.description += ' ' + Room.extra(cavern);
        }

        if (Math.floor(Math.random() * 20) + 1 <= level) {
            r.trapped = true;
            r.trap = Trap.get(cavern);
        }

        return r;
    }

    alter(level, cavern) {
        const circumference = this.width + this.depth * 2;
        const doorspace = Math.max(4, Math.floor(circumference / 20));
        if (this.outlets.length < doorspace) {
            const chanceOfPassage = Math.floor(100 / (this.outlets.length + 1));
            if (Math.floor(Math.random() * 100) + 1 <= chanceOfPassage) {
                const passage = Passage.generate(this.id, level, window.cocRoomList, cavern);
                this.outlets.push(passage.id);
            }
        }

        if (Math.floor(Math.random() * 100) + 1 <= 25) {
            const roomId = Math.floor(Math.random() * window.cocRoomList.length);
            const rejectedRooms = [this.id];
            for (const passageId of this.outlets) {
                const passage = window.cocPassageList[passageId];
                rejectedRooms.push(passage.start);
                if (passage.end !== null) rejectedRooms.push(passage.end);
            }
            if (!rejectedRooms.includes(roomId)) {
                const passage = Passage.generate(this.id, level, window.cocRoomList, cavern);
                passage.end = roomId;
                this.outlets.push(passage.id);
                window.cocRoomList[roomId].outlets.push(passage.id);
            }
        }
    }

    static stairs(dir, cavern) {
        const wide = cavern.roll(3, 10, 4) + ' foot wide';
        const choices = {};
        choices['A ' + wide + ' spiral staircase leads ' + dir + '.'] = 5;
        choices[' ' + wide + ' stone stairs climb ' + dir + ', out of the room.'] = 10;
        choices['A steep ' + wide + ' ramp connects this room to ' + (dir === 'up' ? 'an upper' : 'a lower') + ' level.'] = 5;
        choices['Oversized stairs, 4 foot tall and ' + wide + ', go ' + dir + ' a level.'] = 1;
        choices['Severely steep stairs, ' + wide + ', lead ' + dir + '.'] = 2;
        choices['Uneven ' + wide + ' stairs twist ' + dir + ' into darkness.'] = 2;
        choices['Slippery ' + wide + ' stone stairs go ' + dir + '.'] = 2;
        choices[' ' + wide + ' wooden stairs go ' + dir + '.'] = 2;
        choices[' ' + wide + ' rotten wooden stairs go ' + dir + '.'] = 2;
        choices['Handholds extend below a trapdoor in the ' + (dir === 'up' ? 'ceiling' : 'floor') + '.'] = 1;
        choices['A ladder extends below a trapdoor in the ' + (dir === 'up' ? 'ceiling' : 'floor') + '.'] = 1;
        choices['Handholds extend below an open hole in the ' + (dir === 'up' ? 'ceiling' : 'floor') + '.'] = 1;
        choices['A ladder extends below an open hole in the ' + (dir === 'up' ? 'ceiling' : 'floor') + '.'] = 1;
        choices['A smooth shaft in the ' + (dir === 'up' ? 'ceiling' : 'floor') + ' stretches beyond vision.'] = 1;
        choices['A secure rope dangles through a hole in the ' + (dir === 'up' ? 'ceiling' : 'floor') + '.'] = 1;
        choices['A poorly-secured rope dangles through a hole in the ' + (dir === 'up' ? 'ceiling' : 'floor') + '.'] = 1;
        choices['Thick roots can be seen growing inside a hole in the ' + (dir === 'up' ? 'ceiling' : 'floor') + '.'] = 1;

        return cavern.chooseOneWeighted(choices) + ' ';
    }

    static extra(cavern) {
        const description = [
            'Broken parts of adventure gear sprawls, rusting and rotting.',
            'A discarded snake skin drapes over a jagged stone.',
            'Thick spider webs stretch over hollows, sprinkled with web-wrapped prey.',
            'Dueling scorpions crawl from under a rock.',
            'Centipedes rest under a rotting log.',
            'Rat feces dots the floor and crunches underfoot.',
            'Piles of guano collect in various locations.',
            'Flies spin randomly over a decaying corpse crawling with maggots.',
            'Freshly disturbed dust draws attention to numerous floor-level holes.',
            'A ragged rope tied to a stone cascades into a dark hole.',
            'Clean bones are stacked into a pyramid-shaped pile.',
            'Vomit circles a small pile of regurgitated bits.',
            'Sewage leaks from a crack and spreads partway across the floor.',
            'A spyhole allows monitoring of this room. 1 in 6 chance an eye pressed upon the other side.',
            'Flammable oil drips down a wall and pools on the floor.',
            'Soft eggs twitch slightly.',
            'Words and pictures on the walls praise a god or demon.',
            'Words and pictures mark the territory in favor of some faction.',
            'Words and pictures warn of danger elsewhere in the caverns.',
            'A clean path with a faint sheen crosses the chamber.',
            'Water floods the chamber to ' + Math.floor(Math.random() * 24 + 1) + ' inches deep.',
            'Mud covers the chamber floor ' + Math.floor(Math.random() * 24 + 1) + ' inches deep.',
            'Dried blood pools on the floor.',
            'Dried blood was left spattered on a wall.',
            'Patches of fungus grow around the edges of the room.',
            'An artful mural decorates one wall.',
            'Slugs gather in a moist depression.',
            'Cockroaches scitter after any disturbance.',
            'Severed hands are pinned to the wall with iron nails.',
            'Unusually cold air turns each breath into faint plumes of steam.',
            'Icicles hang from the ceiling.',
            'A pool of ice covers part of the floor.',
            'Fog fills the chamber, reducing visibility to 5 feet or less.',
            'Part of the room is magically dark.',
            'Part of the room glows with magical light.',
            'The room is ' + (Math.floor(Math.random() * 4 + 1) * 10) + 'F hotter than other areas.',
            'Every 10 minutes, there is a ' + Math.floor(Math.random() * 4 + 1) + ' in 6 chance a harmless jet of steam or water emerges from a hole in the floor.',
            'Several burial nooks hold mummys or coffins.',
            'Iron pins hold manacles to the wall.',
            'A pile of rusting weapons sits fused into a single mass.',
            'Rotting garbage distributed into piles cascades down to cover most of the floor.',
            'Goblin faces carved into the walls peer into the darkness.',
            'Sharp spikes are driven uniformly into the walls.',
            'A sprung trap holds a lifeless vermin.',
            'A fountain overflows with purple ichor.',
            'The walls of this room are covered in primitive art.',
            'Many unlit candles hold fast in pools of wax.',
            'Moths flutter lazily.',
            'Thin slime covers most room surfaces.',
            'Incomprehensible mumbling is heard when all else is quiet.',
            'The stench of a crypt permeates the air.',
            'The stench of rotting drifts through the air.',
            'A sweet smell lingers.',
            'Stacks of regular stones are discarded here.',
            'A crystalline vein cuts through one wall.',
            'Sulphurous liquid bubbles in a small pool.',
            'Relief carving in faded paint depicts a dramatic scene.',
            'A strong odor of incense hangs in the air.',
            'Fossilized sea creatures protrude from the walls.',
            'A vein of metal slices down one wall.'
        ];
        return cavern.chooseOne(description);
    }

    static purpose(cavern) {
        const description = [
            'Bed Chamber', 'Kitchen', 'Hall', 'Latrine', 'Garbage Dump',
            'Pantry', 'Storage', 'Armory', 'Guardhouse', 'Chapel',
            'Torture Chamber', 'Prison', 'Animal Pen', 'Treasury', 'Library'
        ];
        return cavern.chooseOne(description);
    }
}
