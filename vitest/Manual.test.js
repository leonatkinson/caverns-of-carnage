import { describe, it, expect } from 'vitest';
import { Manual } from '../assets/src/js/Manual.js';
import { Monster } from '../assets/src/js/Monster.js';
import { Npc } from '../assets/src/js/Npc.js';

describe('Manual', () => {
  it('generates monster block HTML', () => {
    const monster = new Monster();
    monster.name = 'Goblin';
    monster.appearing = 1;
    monster.hp = [4];
    monster.statBlock = 'Goblin: AC 14, HD 1';
    const html = Manual.getMonsterBlock(monster);
    expect(html).toContain('Goblin');
    expect(html).toContain('4 hp');
  });

  it('generates npc block HTML', () => {
    const npc = new Npc('Fighter', 1);
    npc.name = 'Bob';
    npc.race = 'Human';
    npc.level = 1;
    npc.ac = 15;
    npc.ab = 1;
    npc.at = 1;
    npc.dam = '1d8';
    npc.mv = "30'";
    npc.ml = 8;
    npc.xp = 10;
    npc.stats = { DEX: 12, DEX_mod: 0 };
    npc.hp = 6;
    const html = Manual.getNpcBlock(npc);
    expect(html).toContain('Bob');
    expect(html).toContain('Human');
  });

  it('gets door description', () => {
    const desc = Manual.getDoorDescription('door', 'south wall', true, 'into the room', 'west', 2, 65, 0);
    expect(desc).toBe('Door (South Wall): Open. Leads to Room 2 via 65′ dark passage. Swings in, hinges west.');
  });

  it('gets HTML for manual with wandering monsters and rooms', () => {
    window.cocRoomList = [{ id: 0, name: 'Room 1', light: 0.5, width: 30, depth: 30, height: 10, description: 'Desc', contents: [0], outlets: [0], monsters: [0] }];
    window.cocMonsterList = [{ id: 0, name: 'Goblin', appearing: 1, hp: [4], statBlock: 'Goblin: AC 14' }];
    window.cocItemList = [{ id: 0, name: 'Gold' }];
    window.cocPassageList = [{ id: 0, start: 0, end: 0, startDoor: 'door', startLocation: 'north', length: 10, light: 0.5 }];
    const html = Manual.getHtml(1);
    expect(html).toContain('Level 1');
  });
});
