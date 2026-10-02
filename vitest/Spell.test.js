import { describe, it, expect } from 'vitest';
import { Spell } from '../assets/src/js/Spell.js';

describe('Spell', () => {
  it('generates character spells for Magic-User', () => {
    const spells = Spell.generateCharacterSpells('Magic-User', 1);
    expect(Array.isArray(spells)).toBe(true);
  });

  it('generates character spells for Cleric', () => {
    const spells = Spell.generateCharacterSpells('Cleric', 2);
    expect(Array.isArray(spells)).toBe(true);
  });

  it('returns empty array for level 0 or invalid level', () => {
    expect(Spell.generateCharacterSpells('Magic-User', 0)).toEqual([]);
  });

  it('generates scroll spells', () => {
    const spells = Spell.generateScrollSpells('Magic-User', 2);
    expect(Array.isArray(spells)).toBe(true);
    expect(spells.length).toBe(2);
  });
});
