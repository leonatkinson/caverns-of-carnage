import { describe, it, expect } from 'vitest';
import { Manual } from '../assets/src/js/Manual.js';

describe('Manual', () => {
  it('generates manual HTML for a level', () => {
    window.cocRoomList = [];
    window.cocMonsterList = [];
    window.cocItemList = [];
    window.cocPassageList = [];
    const html = Manual.getHtml(1);
    expect(typeof html).toBe('string');
    expect(html).toContain('Level 1');
  });
});
