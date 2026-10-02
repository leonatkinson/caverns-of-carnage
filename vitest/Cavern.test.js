import { describe, it, expect } from 'vitest';
import { Cavern } from '../assets/src/js/Cavern.js';

describe('Cavern', () => {
  it('makes a cavern and rolls dice', () => {
    const cavern = new Cavern(1);
    cavern.make(1);
    expect(cavern.roll(1, 6)).toBeGreaterThanOrEqual(1);
    expect(cavern.rollSum(1, 6)).toBeGreaterThanOrEqual(1);
    expect(typeof cavern.p(50)).toBe('boolean');
    expect(cavern.chooseOne(['a', 'b'])).toBeDefined();
    expect(cavern.chooseOneWeighted({ a: 10, b: 20 })).toBeDefined();
  });
});
