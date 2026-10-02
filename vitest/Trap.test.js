import { describe, it, expect } from 'vitest';
import { Trap } from '../assets/src/js/Trap.js';
import { Cavern } from '../assets/src/js/Cavern.js';

describe('Trap', () => {
  it('gets a trap description', () => {
    const cavern = new Cavern(1);
    const trap = Trap.get(cavern);
    expect(typeof trap).toBe('string');
  });
});
