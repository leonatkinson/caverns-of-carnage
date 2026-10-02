import { describe, it, expect } from 'vitest';
import { Room } from '../assets/src/js/Room.js';
import { Cavern } from '../assets/src/js/Cavern.js';

describe('Room', () => {
  it('generates a room', () => {
    const cavern = new Cavern(1);
    const room = Room.generate(1, cavern);
    expect(room).toBeDefined();
  });
});
