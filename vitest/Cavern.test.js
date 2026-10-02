import { describe, it, expect } from 'vitest';
import { Cavern } from '../assets/src/js/Cavern.js';

describe('Cavern', () => {
  it('initializes cavern for level', () => {
    const cavern = new Cavern(1);
    expect(cavern).toBeDefined();
    expect(Cavern.level).toBe(1);
  });

  it('generates cavern layout', () => {
    const cavern = new Cavern(1);
    cavern.make(1);
    expect(window.cocRoomList).toBeDefined();
    expect(window.cocPassageList).toBeDefined();
  });
});
