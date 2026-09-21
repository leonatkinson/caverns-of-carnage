import { Trap } from './Trap.js';

export class Passage {
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

    static generate(roomId, level, roomList, cavern) {
        const p = new Passage();
        if (!window.cocPassageList) window.cocPassageList = [];
        p.id = window.cocPassageList.length;
        window.cocPassageList[p.id] = p;

        p.start = roomId;
        p.end = null;
        p.length = Math.max(5, Math.round(cavern.roll(4, 100, 3) / 5) * 5);

        const light = Math.floor(Math.random() * 100) + 1;
        if (light <= 75) p.light = 0;
        else if (light <= 95) p.light = 0.5;
        else p.light = 1;

        p.startDoor = Passage.getDoor(cavern);
        p.endDoor = Passage.getDoor(cavern);

        p.startLocation = Passage.getLocation(cavern);
        p.endLocation = Passage.getLocation(cavern);

        if (Math.floor(Math.random() * 20) + 1 <= level) {
            p.trapped = true;
            p.trap = Trap.get(cavern);
        }

        return p;
    }

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
