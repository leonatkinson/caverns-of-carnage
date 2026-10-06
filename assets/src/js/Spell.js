import { Dice } from "./Dice.js";
import { Cavern } from "./Cavern.js";

export class Spell {
  /** Spell slot progression chart mapping character levels to available slots per tier (tiers 0-6). */
  static progressionChart = [
    [0, 0, 0, 0, 0, 0, 0], // Index 0 (Level 0)
    [0, 1, 0, 0, 0, 0, 0], // Index 1 (Level 1)
    [0, 2, 0, 0, 0, 0, 0], // Index 2 (Level 2)
    [0, 2, 1, 0, 0, 0, 0], // Index 3 (Level 3)
    [0, 2, 2, 0, 0, 0, 0], // Index 4 (Level 4)
    [0, 2, 2, 1, 0, 0, 0], // Index 5 (Level 5)
    [0, 3, 2, 2, 0, 0, 0], // Index 6 (Level 6)
    [0, 3, 2, 2, 1, 0, 0], // Index 7 (Level 7)
    [0, 3, 3, 2, 2, 0, 0], // Index 8 (Level 8)
    [0, 3, 3, 2, 2, 1, 0], // Index 9 (Level 9)
    [0, 4, 3, 3, 2, 2, 0], // Index 10 (Level 10)
    [0, 4, 4, 3, 2, 2, 1], // Index 11 (Level 11)
    [0, 4, 4, 3, 3, 2, 2], // Index 12 (Level 12)
    [0, 4, 4, 4, 3, 2, 2], // Index 13 (Level 13)
    [0, 4, 4, 4, 3, 3, 2], // Index 14 (Level 14)
    [0, 5, 4, 4, 3, 3, 2], // Index 15 (Level 15)
    [0, 5, 5, 4, 3, 3, 2], // Index 16 (Level 16)
    [0, 5, 5, 4, 4, 3, 3], // Index 17 (Level 17)
    [0, 6, 5, 4, 4, 3, 3], // Index 18 (Level 18)
    [0, 6, 5, 5, 4, 3, 3], // Index 19 (Level 19)
    [0, 6, 5, 5, 4, 4, 3], // Index 20 (Level 20)
  ];

  /** Cleric spells categorized by tier. */
  static clericSpells = {
    1: [
      "Cure Light Wounds*",
      "Detect Evil*",
      "Detect Magic",
      "Light*",
      "Protection from Evil*",
      "Purify Food and Water",
      "Remove Fear*",
      "Resist Cold",
    ],
    2: [
      "Bless*",
      "Charm Animal",
      "Find Traps",
      "Hold Person",
      "Resist Fire",
      "Silence 15' radius",
      "Speak with Animals",
      "Spiritual Hammer",
    ],
    3: [
      "Continual Light*",
      "Cure Blindness",
      "Cure Disease*",
      "Growth of Animals",
      "Locate Object",
      "Remove Curse*",
      "Speak with Dead",
      "Striking",
    ],
    4: [
      "Animate Dead",
      "Create Water",
      "Cure Serious Wounds*",
      "Dispel Magic",
      "Neutralize Poison*",
      "Protection from Evil 10' radius*",
      "Speak with Plants",
      "Sticks to Snakes",
    ],
    5: [
      "Commune",
      "Create Food",
      "Dispel Evil",
      "Insect Plague",
      "Quest",
      "Remove Quest",
      "Raise Dead*",
      "True Seeing",
      "Wall of Fire",
    ],
    6: [
      "Animate Objects",
      "Blade Barrier",
      "Find the Path",
      "Heal*",
      "Regenerate",
      "Restoration",
      "Speak with Monsters",
      "Word of Recall",
    ],
  };

  /** Magic-User spells categorized by tier. */
  static magicUserSpells = {
    1: [
      "Charm Person",
      "Detect Magic",
      "Floating Disc",
      "Hold Portal",
      "Light",
      "Darkness",
      "Magic Missile",
      "Magic Mouth",
      "Protection from Evil*",
      "Read Languages",
      "Shield",
      "Sleep",
      "Ventriloquism",
    ],
    2: [
      "Continual Light",
      "Continual Darkness",
      "Detect Evil*",
      "Detect Invisible",
      "Mind Reading",
      "Invisibility",
      "Knock",
      "Levitate",
      "Locate Object",
      "Mirror Image",
      "Phantasmal Force",
      "Web",
      "Wizard Lock",
    ],
    3: [
      "Clairvoyance",
      "Darkvision",
      "Dispel Magic",
      "Fireball",
      "Fly",
      "Haste",
      "Slow",
      "Hold Person",
      "Invisibility 10' radius",
      "Lightning Bolt",
      "Protection from Evil 10' radius*",
      "Protection from Normal Missiles",
      "Water Breathing",
    ],
    4: [
      "Charm Monster",
      "Confusion",
      "Dimension Door",
      "Growth of Plants",
      "Reduction of Plants",
      "Hallucinatory Terrain",
      "Ice Storm",
      "Massmorph",
      "Polymorph Other",
      "Polymorph Self",
      "Remove Curse",
      "Bestow Curse",
      "Wall of Fire",
      "Wizard Eye",
    ],
    5: [
      "Animate Dead",
      "Cloudkill",
      "Conjure Elemental",
      "Feeblemind",
      "Hold Monster",
      "Magic Jar",
      "Passwall",
      "Telekinesis",
      "Teleport",
      "Wall of Stone",
    ],
    6: [
      "Anti-Magic Shell",
      "Death Spell",
      "Disintegrate",
      "Flesh to Stone*",
      "Geas",
      "Remove Geas",
      "Invisible Stalker",
      "Lower Water",
      "Projected Image",
      "Reincarnate",
      "Wall of Iron",
    ],
  };

  /** Scroll Tier Probability Table weights. */
  static scrollTierWeights = {
    1: 30,
    2: 25,
    3: 20,
    4: 13,
    5: 9,
    6: 3,
  };

  /**
   * Character spell generator for spellbooks/prepared spells.
   * @param {string} className - 'Cleric' or 'Magic-User'.
   * @param {number} level - Character level.
   * @param {Array|null} customSlots - Optional custom slot allocations per tier.
   * @returns {Array} Ordered list of generated spells.
   */
  static generateCharacterSpells(className, level, customSlots = null) {
    if (!level || level === 0) return [];
    const isCleric = className === "Cleric";
    const db = isCleric ? Spell.clericSpells : Spell.magicUserSpells;

    let slots = [];
    if (customSlots && Array.isArray(customSlots)) {
      slots = [0, ...customSlots];
    } else if (isCleric) {
      if (level === 1) return [];
      const idx = Math.min(
        Math.max(level - 1, 0),
        Spell.progressionChart.length - 1,
      );
      slots = Spell.progressionChart[idx];
    } else {
      const idx = Math.min(
        Math.max(level, 0),
        Spell.progressionChart.length - 1,
      );
      slots = Spell.progressionChart[idx];
    }

    const resultSpells = [];
    for (let tier = 1; tier < slots.length; tier++) {
      let count = slots[tier] || 0;
      if (count <= 0) continue;
      const tierSpells = db[tier] || [];
      if (tierSpells.length === 0) continue;

      const freqMap = {};
      while (count > 0) {
        const sp = Dice.chooseOne(tierSpells);
        freqMap[sp] = (freqMap[sp] || 0) + 1;
        count--;
      }

      const sortedSpells = Object.keys(freqMap).sort();
      sortedSpells.forEach((sp) => {
        const freq = freqMap[sp];
        if (freq > 1) {
          resultSpells.push(freq + "x " + sp);
        } else {
          resultSpells.push(sp);
        }
      });
    }

    return resultSpells;
  }

  /**
   * Scroll generator for magic spell scrolls.
   * @param {string} className - 'Cleric' or 'Magic-User'.
   * @param {number} quantity - Number of spells to place on the scroll.
   * @returns {Array} Sorted list of scroll spells.
   */
  static generateScrollSpells(className, quantity) {
    const isCleric = className === "Cleric";
    const db = isCleric ? Spell.clericSpells : Spell.magicUserSpells;
    const scrollSpells = [];

    for (let q = 0; q < quantity; q++) {
      let totalWeight = 0;
      for (const tier in Spell.scrollTierWeights) {
        totalWeight += Spell.scrollTierWeights[tier];
      }
      let roll = Dice.roll(1, totalWeight);
      let selectedTier = 1;
      for (const tier in Spell.scrollTierWeights) {
        roll -= Spell.scrollTierWeights[tier];
        selectedTier = parseInt(tier, 10);
        if (roll <= 0) break;
      }

      const tierSpells = db[selectedTier] || db[1];
      if (tierSpells && tierSpells.length > 0) {
        const sp = Dice.chooseOne(tierSpells);
        scrollSpells.push(sp);
      }
    }

    scrollSpells.sort();
    return scrollSpells;
  }
}
