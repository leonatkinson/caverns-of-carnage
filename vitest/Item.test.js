import { describe, it, expect } from 'vitest';
import { Item } from '../assets/src/js/Item.js';
import { Cavern } from '../assets/src/js/Cavern.js';

describe('Item full coverage', () => {
  it('exercises all item generation methods extensively including magic categories', () => {
    const cavern = new Cavern(1);
    window.cocRoomList = [{ id: 0, contents: [] }];
    window.cocItemList = [];

    for (let i = 0; i < 30; i++) {
      Item.coins('gp', 100, 0, window.cocRoomList);
      Item.coins('sp', 100, 0, window.cocRoomList);
      Item.coins('cp', 100, 0, window.cocRoomList);
      Item.coins('ep', 100, 0, window.cocRoomList);
      Item.coins('pp', 100, 0, window.cocRoomList);
      Item.gems(3, 0, window.cocRoomList, cavern);
      Item.jewelry(2, 0, window.cocRoomList, cavern);
      Item.weapon(0, window.cocRoomList, cavern);
      Item.armor(0, window.cocRoomList);
      Item.potion(0, window.cocRoomList, cavern);
      Item.scroll(0, window.cocRoomList);
      Item.ring(0, window.cocRoomList);
      Item.wand(0, window.cocRoomList);
      Item.miscMagic(0, window.cocRoomList);
      Item.magic(3, 'any', 0, window.cocRoomList, cavern);
      Item.magic(3, 'weapons armor', 0, window.cocRoomList, cavern);
      Item.magic(3, 'not weapons', 0, window.cocRoomList, cavern);
      Item.makeTreasureByLevel(0, 1, window.cocRoomList, cavern);
      Item.makeTreasureByLevel(0, 5, window.cocRoomList, cavern);
      Item.makeTreasureByLevel(0, 9, window.cocRoomList, cavern);
    }

    const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    letters.forEach(l => {
      for (let j = 0; j < 5; j++) {
        Item.makeTreasureByLetter(0, l, window.cocRoomList, cavern);
      }
    });

    expect(window.cocItemList.length).toBeGreaterThan(0);
  });
});
