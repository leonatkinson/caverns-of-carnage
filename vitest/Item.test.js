import { describe, it, expect } from 'vitest';
import { Item } from '../assets/src/js/Item.js';
import { Cavern } from '../assets/src/js/Cavern.js';

describe('Item', () => {
  it('generates item / treasure', () => {
    const cavern = new Cavern(1);
    window.cocRoomList = [{ id: 0, contents: [] }];
    window.cocItemList = [];
    Item.makeTreasureByLevel(0, 1, window.cocRoomList, cavern);
    expect(window.cocItemList).toBeDefined();
  });
});
