import { describe, it, expect } from 'vitest';
import { Npc } from '../assets/src/js/Npc.js';
import { Cavern } from '../assets/src/js/Cavern.js';

describe('Npc', () => {
  it('generates NPCs and parties', () => {
    const cavern = new Cavern(1);
    window.cocRoomList = [{ id: 0, monsters: [] }];
    window.cocMonsterList = [];
    Npc.makeNpcPartyByLevel(0, 1, window.cocRoomList, cavern);
    expect(window.cocMonsterList.length).toBeGreaterThan(0);
  });
});
