import { Room } from './Room.js';
import { Passage } from './Passage.js';
import { Monster } from './Monster.js';
import { Item } from './Item.js';

export class Cavern {
    constructor(level = 1) {
        window.cocRoomList = [];
        window.cocPassageList = [];
        window.cocMonsterList = [];
        window.cocItemList = [];

        Cavern.level = level;
        Cavern.wanderingMonsters = [];
    }

    chooseOne(choices) {
        return choices[Math.floor(Math.random() * choices.length)];
    }

    chooseOneWeighted(choices) {
        let total = 0;
        for (const choice in choices) {
            total += choices[choice];
        }
        let roll = Math.floor(Math.random() * total) + 1;
        let selectedChoice = null;
        for (const choice in choices) {
            roll -= choices[choice];
            selectedChoice = choice;
            if (roll <= 0) break;
        }
        return selectedChoice;
    }

    rollSum(rolls, sides) {
        let t = 0;
        for (let r = 0; r < rolls; r++) {
            t += Math.floor(Math.random() * sides) + 1;
        }
        return t;
    }

    roll(low, high, curve = 1) {
        let t = 0;
        for (let r = 0; r < curve; r++) {
            t += Math.floor(Math.random() * (high - low + 1)) + low;
        }
        return Math.round(t / curve);
    }

    p(chance) {
        return (Math.floor(Math.random() * 100) + 1) <= chance;
    }

    computeRoll(spec) {
        const match = String(spec).match(/(\d+)d?(\d+)?([\+\-]\d+)?/);
        if (!match) return parseInt(spec, 10) || 1;
        const rolls = parseInt(match[1], 10);
        const sides = match[2] ? parseInt(match[2], 10) : 1;
        const bonus = match[3] ? parseInt(match[3], 10) : 0;
        let t = bonus;
        for (let r = 0; r < rolls; r++) {
            t += Math.floor(Math.random() * sides) + 1;
        }
        return t > 0 ? t : 1;
    }

    make(level = 1) {
        Cavern.level = level;
        Cavern.wanderingMonsters = [];

        Room.generate(level, this);
        const targetRooms = 2 + this.roll(1, 30, 3);

        let room = window.cocRoomList[0];
        room.name = 'Entrance';
        const passage = Passage.generate(room.id, level, window.cocRoomList, this);
        room.outlets.push(passage.id);

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

        for (const passageId in window.cocPassageList) {
            const pass = window.cocPassageList[passageId];
            if (pass.end === null) {
                delete window.cocPassageList[passageId];
            }
        }

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

    getEvent() {
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
