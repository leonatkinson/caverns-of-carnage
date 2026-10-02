import { describe, it, expect } from 'vitest';
import { Monster } from '../assets/src/js/Monster.js';
import { Cavern } from '../assets/src/js/Cavern.js';

describe('Monster', () => {
  it('generates monsters and war parties', () => {
    const cavern = new Cavern(1);
    window.cocRoomList = [{ id: 0, monsters: [], contents: [] }];
    window.cocMonsterList = [];
    window.cocItemList = [];
    Monster.makeMonsterByLevel(0, 1, window.cocRoomList, cavern);
    Monster.makeWarriors(0, 'Goblin Warrior armored', 4, window.cocRoomList, cavern);
    expect(window.cocMonsterList.length).toBeGreaterThan(0);
  });
});
