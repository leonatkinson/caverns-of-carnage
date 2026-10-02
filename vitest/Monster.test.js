import { describe, it, expect } from 'vitest';
import { Monster } from '../assets/src/js/Monster.js';

describe('Monster', () => {
  it('has roster defined', () => {
    expect(Array.isArray(Monster.roster)).toBe(true);
    expect(Monster.roster.length).toBeGreaterThan(0);
  });
});
