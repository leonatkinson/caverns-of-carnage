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

  it('determines door open/closed, opening direction, and hinges correctly', () => {
    const cavern = new Cavern(1);
    window.cocRoomList = [{ id: 0, outlets: [] }];
    window.cocPassageList = [];
    const p = Passage.generate(0, 1, window.cocRoomList, cavern);
    expect(typeof p.startDoorOpen).toBe('boolean');
    expect(['into the room', 'out of the room']).toContain(p.startDoorOpening);
    if (p.startLocation.includes('north') || p.startLocation.includes('south')) {
      expect(['east', 'west']).toContain(p.startDoorHinges);
    } else if (p.startLocation.includes('east') || p.startLocation.includes('west')) {
      expect(['north', 'south']).toContain(p.startDoorHinges);
    }
  });
});
