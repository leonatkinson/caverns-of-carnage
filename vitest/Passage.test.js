import { describe, it, expect } from 'vitest';
import { Passage } from '../assets/src/js/Passage.js';

describe('Passage', () => {
  it('gets door arrow symbols', () => {
    const arrow = Passage.getArrow('door');
    expect(typeof arrow).toBe('string');
  });
});
