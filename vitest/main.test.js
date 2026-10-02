import { describe, it, expect } from 'vitest';
import '../assets/src/js/main.js';

describe('main', () => {
  it('registers initCavernsOfCarnage on window', () => {
    expect(typeof window.initCavernsOfCarnage).toBe('function');
  });
});
