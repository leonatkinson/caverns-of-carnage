import { describe, it, expect } from 'vitest';
import { Cavern } from '../assets/src/js/Cavern.js';
import { Dice } from '../assets/src/js/Dice.js';

describe('Cavern and Dice', () => {
  it('makes a cavern and rolls dice via Dice', () => {
    const cavern = new Cavern(1);
    cavern.make(1);
    expect(Dice.roll(1, 6)).toBeGreaterThanOrEqual(1);
    expect(Dice.rollSum(1, 6)).toBeGreaterThanOrEqual(1);
    expect(typeof Dice.p(50)).toBe('boolean');
    expect(Dice.chooseOne(['a', 'b'])).toBeDefined();
    expect(Dice.chooseOneWeighted({ a: 10, b: 20 })).toBeDefined();
  });
});
