import { describe, it, expect } from 'vitest';
import { Passage } from '../assets/src/js/Passage.js';
import { Cavern } from '../assets/src/js/Cavern.js';

describe('Passage', () => {
  it('generates passages and doors', () => {
    const cavern = new Cavern(1);
    window.cocRoomList = [{ id: 0, outlets: [] }];
    window.cocPassageList = [];
    Passage.generate(0, 1, window.cocRoomList, cavern);
    const door = Passage.getDoor(cavern);
    const loc = Passage.getLocation(cavern);
    expect(door).toBeDefined();
    expect(loc).toBeDefined();
  });
});
