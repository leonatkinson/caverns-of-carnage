import { Dice } from './Dice.js';
import { Cavern } from './Cavern.js';

export class Item {
    static gemsList = [
        'Agate', 'Amber', 'Amethyst', 'Aquamarine', 'Aventurine', 'Beryl',
        'Bloodstone', 'Citrine', 'Diaspore', 'Emerald', 'Iolite', 'Jade',
        'Jasper', 'Lapis Lazuli', 'Meteorite', 'Opal', 'Moonstone', 'Obsidian',
        'Onyx', 'Pearl', 'Peridot', 'Ruby', 'Sapphire', 'Sunstone', 'Topaz',
        'Tourmaline', 'White Diamond', 'Blue Diamond', 'Green Diamond',
        'Yellow Diamond', 'Orange Diamond', 'Red Diamond', 'Pink Diamond',
        'Violet Diamond', 'Black Diamond', 'Gold Nugget', 'Platinum Nugget'
    ];

    /**
     * Initializes a new item instance.
     */
    constructor() {
        this.id = 0;
        this.room = null;
        this.name = '';
        this.value = 0;
        this.coins = false;
    }

    /**
     * Generates and registers a new item instance.
     * @param {number|null} roomId - Room identifier.
     * @param {Array} roomList - Room list.
     * @returns {Item} The created item.
     */
    static generate(roomId, roomList) {
        // Create new item and register in global item list
        const item = new Item();
        item.id = window.cocItemList ? window.cocItemList.length : 0;
        item.room = roomId;
        if (!window.cocItemList) window.cocItemList = [];
        window.cocItemList[item.id] = item;

        // Associate item with room contents if roomId provided
        if (roomId !== null && roomList[roomId]) {
            roomList[roomId].contents.push(item.id);
        }
        return item;
    }

    /**
     * Generates or accumulates coin treasure in a room.
     * @param {string} type - Coin type (cp, sp, ep, gp, pp).
     * @param {number} number - Number of coins.
     * @param {number} roomId - Room identifier.
     * @param {Array} roomList - Room list.
     * @returns {Item} The coin item.
     */
    static coins(type, number, roomId, roomList) {
        const room = roomList[roomId];
        let item = null;
        // Check if coin type already exists in room contents to combine
        for (const itemId of room.contents) {
            const it = window.cocItemList[itemId];
            if (it.coins === type) {
                item = it;
                const currentNum = parseInt(item.name.replace(/[^0-9]/g, ''), 10) || 0;
                item.name = (number + currentNum).toLocaleString() + ' ' + type;
                break;
            }
        }
        // If not existing, create new coin entry
        if (!item) {
            item = Item.generate(roomId, roomList);
            item.coins = type;
            item.name = number.toLocaleString() + ' ' + type;
        }
        // Calculate gold piece value equivalence based on coin type
        switch (type) {
            case 'cp': item.value = Math.round(number / 100 * 100) / 100; break;
            case 'sp': item.value = Math.round(number / 10 * 100) / 100; break;
            case 'ep': item.value = Math.round(number / 2 * 100) / 100; break;
            case 'gp': item.value = number; break;
            case 'pp': item.value = 5 * number; break;
            default: item.value = 0;
        }
        return item;
    }

    /**
     * Generates gemstone treasures.
     * @param {number} number - Number of gems.
     * @param {number} roomId - Room identifier.
     * @param {Array} roomList - Room list.
     * @param {Cavern} cavern - Cavern generator.
     */
    static gems(number, roomId, roomList, cavern) {
        for (let n = 0; n < number; n++) {
            const item = Item.generate(roomId, roomList);
            let base = 10, count = Dice.roll(1, 10);
            // Roll gemstone base value category
            const rollBase = Dice.roll(1, 5, 4);
            if (rollBase === 1) { base = 10; count = Dice.roll(1, 10); }
            else if (rollBase === 2) { base = 50; count = Dice.roll(1, 8); }
            else if (rollBase === 3) { base = 100; count = Dice.roll(1, 6); }
            else if (rollBase === 4) { base = 500; count = Dice.roll(1, 4); }
            else { base = 1000; count = Dice.roll(1, 2); }

            // Apply value adjustments and assign name and total value
            const adjustments = [0.1, 0.5, 0.75, 1, 1.5, 2, 10];
            base = base * adjustments[Dice.roll(0, 6, 4)];
            item.name = Dice.chooseOne(Item.gemsList) + ' (' + count + ' @ ' + base.toLocaleString() + ' gp)';
            item.value = base * count;
        }
    }

    /**
     * Generates magic or mundane weapons.
     * @param {number} roomId - Room identifier.
     * @param {Array} roomList - Room list.
     * @param {Cavern} cavern - Cavern generator.
     */
    static weapon(roomId, roomList, cavern) {
        const item = Item.generate(roomId, roomList);
        const types = [
            'Great Axe', 'Battle Axe', 'Hand Axe', 'Shortbow', 'Longbow',
            'Dagger', 'Shortsword', 'Longsword', 'Scimitar', 'Two-Handed Sword',
            'Warhammer', 'Mace', 'Maul', 'Pole Arm', 'Spear', 'Arrow', 'Sling'
        ];
        const polearms = [
            'Ahlspeiss', 'Bardiche', 'Bec de corbin', 'Bill-Guisarme',
            'Bill Hook', 'Corseque', 'Fauchard', 'Glaive', 'Guisarme', 'Halberd',
            'Partisan', 'Poleaxe', 'Ranseur', 'Scythe', 'Spetum', 'Trident',
            'Voulge', 'Lucerne Hammer'
        ];
        const arrows = ['Shortbow Arrow', 'Longbow Arrow', 'Heavy Quarrel', 'Light Quarrel', 'Sling Bullet', 'Dart'];
        const enemies = ['Dragons', 'Regenerators', 'Enchanted', 'Spell Users', 'Lycanthropes', 'Undead'];

        // Select weapon category and sub-type
        let type = Dice.chooseOne(types);
        if (type === 'Pole Arm') type = Dice.chooseOne(polearms);
        let missile = false, quantity = 1;
        if (type === 'Arrow') {
            type = Dice.chooseOne(arrows);
            quantity = Dice.rollSum(2, 6);
            missile = true;
        }

        // Determine magical bonus or curse properties
        const roll = Math.floor(Math.random() * 100) + 1;
        let bonus = '+1', special = '';
        if (missile) {
            if (roll <= 5) bonus = '+0';
            else if (roll <= 46) bonus = '+1';
            else if (roll <= 58) bonus = '+2';
            else if (roll <= 64) bonus = '+3';
            else if (roll <= 82) bonus = '+1, +2 vs. ' + Dice.chooseOne(enemies);
            else if (roll <= 94) bonus = '+1, +3 vs. ' + Dice.chooseOne(enemies);
            else if (roll <= 98) bonus = 'Cursed -1';
            else bonus = 'Cursed -2';
        } else {
            if (roll <= 10) { bonus = '+0'; item.value = 1000; }
            else if (roll <= 50) { bonus = '+1'; item.value = 2000; }
            else if (roll <= 60) { bonus = '+2'; item.value = 4000; }
            else if (roll <= 65) { bonus = '+3'; item.value = 8000; }
            else if (roll <= 67) { bonus = '+4'; item.value = 12000; }
            else if (roll <= 68) { bonus = '+5'; item.value = 18000; }
            else if (roll <= 85) { bonus = '+1, +2 vs. ' + Dice.chooseOne(enemies); item.value = 3000; }
            else if (roll <= 95) { bonus = '+1, +3 vs. ' + Dice.chooseOne(enemies); item.value = 5000; }
            else if (roll <= 98) { bonus = 'Cursed -1'; item.value = 500; }
            else { bonus = 'Cursed -2'; item.value = 500; }

            // Small chance for special weapon ability
            if (Math.random() * 100 < 10) {
                const sRoll = Math.floor(Math.random() * 20) + 1;
                if (sRoll <= 9) { special = 'Casts Light on Command'; item.value += 500; }
                else if (sRoll <= 11) { special = 'Charm Person'; item.value += 1000; }
                else if (sRoll <= 12) { special = 'Drains Energy'; item.value += 4000; }
                else if (sRoll <= 16) { special = 'Flames on Command'; item.value += 2000; }
                else if (sRoll <= 19) { special = 'Locate Objects'; item.value += 1000; }
                else { special = Math.floor(Math.random() * 4 + 1) + ' Wishes'; item.value += 25000; }
            }
        }
        item.name = type + ' ' + bonus;
        if (special) item.name += ', ' + special;
        if (quantity > 1) item.name += ', ' + quantity + ' count';
    }

    /**
     * Generates armor or shield items.
     * @param {number} roomId - Room identifier.
     * @param {Array} roomList - Room list.
     */
    static armor(roomId, roomList) {
        const item = Item.generate(roomId, roomList);
        const roll = Math.floor(Math.random() * 100) + 1;
        // Determine base armor type
        if (roll <= 9) item.name = 'Leather Armor';
        else if (roll <= 28) item.name = 'Chain Mail';
        else if (roll <= 43) item.name = 'Plate Mail';
        else item.name = 'Shield';

        // Determine enchantment or curse
        const bRoll = Math.floor(Math.random() * 100) + 1;
        if (bRoll <= 50) item.name += '+1';
        else if (bRoll <= 80) item.name += '+2';
        else if (bRoll <= 90) item.name += '+3';
        else if (bRoll <= 95) item.name = 'Cursed -1';
        else item.name = 'Cursed AC 11';
    }

    /**
     * Generates a magic potion.
     * @param {number} roomId - Room identifier.
     * @param {Array} roomList - Room list.
     * @param {Cavern} cavern - Cavern generator.
     */
    static potion(roomId, roomList, cavern) {
        const potions = [
            'Clairaudience', 'Clairvoyance', 'Cold Resistance', 'Control Animal',
            'Control Dragon', 'Control Giant', 'Control Human', 'Control Plant',
            'Control Undead', 'Delusion', 'Diminution', 'ESP', 'Fire Resistance',
            'Flying', 'Gaseous Form', 'Giant Strength', 'Growth', 'Healing',
            'Heroism', 'Invisibility', 'Invulnerability', 'Levitation', 'Longevity',
            'Poison', 'Polymorph Self', 'Speed', 'Treasure Finding'
        ];
        const item = Item.generate(roomId, roomList);
        item.name = 'Potion of ' + Dice.chooseOne(potions);
    }

    /**
     * Generates a magic scroll or map.
     * @param {number} roomId - Room identifier.
     * @param {Array} roomList - Room list.
     */
    static scroll(roomId, roomList) {
        const item = Item.generate(roomId, roomList);
        const roll = Math.floor(Math.random() * 100) + 1;
        // Determine scroll or protection/map type based on table roll
        if (roll <= 3) item.name = 'Cleric Spell Scroll (1 Spell)';
        else if (roll <= 6) item.name = 'Cleric Spell Scroll (2 Spells)';
        else if (roll <= 8) item.name = 'Cleric Spell Scroll (3 Spells)';
        else if (roll <= 9) item.name = 'Cleric Spell Scroll (4 Spells)';
        else if (roll <= 15) item.name = 'Magic-User Spell Scroll (1 Spell)';
        else if (roll <= 20) item.name = 'Magic-User Spell Scroll (2 Spells)';
        else if (roll <= 25) item.name = 'Magic-User Spell Scroll (3 Spells)';
        else if (roll <= 29) item.name = 'Magic-User Spell Scroll (4 Spells)';
        else if (roll <= 32) item.name = 'Magic-User Spell Scroll (5 Spells)';
        else if (roll <= 34) item.name = 'Magic-User Spell Scroll (6 Spells)';
        else if (roll <= 35) item.name = 'Magic-User Spell Scroll (7 Spells)';
        else if (roll <= 40) item.name = 'Cursed Scroll';
        else if (roll <= 46) item.name = 'Protection from Elementals';
        else if (roll <= 56) item.name = 'Protection from Lycanthropes';
        else if (roll <= 61) item.name = 'Protection from Magic';
        else if (roll <= 75) item.name = 'Protection from Undead';
        else if (roll <= 85) item.name = 'Map to Treasure Type A';
        else if (roll <= 89) item.name = 'Map to Treasure Type E';
        else if (roll <= 92) item.name = 'Map to Treasure Type G';
        else item.name = 'Map to 1d4 Magic Items';
    }

    /**
     * Generates a magic ring.
     * @param {number} roomId - Room identifier.
     * @param {Array} roomList - Room list.
     */
    static ring(roomId, roomList) {
        const item = Item.generate(roomId, roomList);
        let name = 'Ring of ';
        const roll = Math.floor(Math.random() * 100) + 1;
        // Determine specific ring type
        if (roll <= 6) name += 'Control Animal';
        else if (roll <= 12) name += 'Control Human';
        else if (roll <= 19) name += 'Control Plant';
        else if (roll <= 30) name += 'Delusion';
        else if (roll <= 33) name += 'Djinni Summoning';
        else if (roll <= 44) name += 'Fire Resistance';
        else if (roll <= 57) name += 'Invisibility';
        else if (roll <= 66) name += 'Protection +1';
        else if (roll <= 70) name += 'Protection +2';
        else if (roll <= 71) name += 'Protection +3';
        else if (roll <= 73) name += 'Regeneration';
        else if (roll <= 75) name += 'Spell Storing';
        else if (roll <= 81) name += 'Spell Turning';
        else if (roll <= 83) name += 'Telekinesis';
        else if (roll <= 90) name += 'Water Walking';
        else if (roll <= 97) name += 'Weakness';
        else if (roll <= 98) name += 'Wishes';
        else name += 'X-Ray Vision';
        item.name = name;
    }

    /**
     * Generates a magic wand, rod, or staff.
     * @param {number} roomId - Room identifier.
     * @param {Array} roomList - Room list.
     */
    static wand(roomId, roomList) {
        const item = Item.generate(roomId, roomList);
        const roll = Math.floor(Math.random() * 100) + 1;
        // Determine wand/staff type
        if (roll <= 8) item.name = 'Rod of Cancellation';
        else if (roll <= 13) item.name = 'Snake Staff';
        else if (roll <= 17) item.name = 'Staff of Commanding';
        else if (roll <= 28) item.name = 'Staff of Healing';
        else if (roll <= 30) item.name = 'Staff of Power';
        else if (roll <= 34) item.name = 'Staff of Striking';
        else if (roll <= 35) item.name = 'Staff of Wizardry';
        else if (roll <= 40) item.name = 'Wand of Cold';
        else if (roll <= 45) item.name = 'Wand of Enemy Detection';
        else if (roll <= 50) item.name = 'Wand of Fear';
        else if (roll <= 55) item.name = 'Wand of Fireballs';
        else if (roll <= 60) item.name = 'Wand of Illusion';
        else if (roll <= 65) item.name = 'Wand of Lightning Bolts';
        else if (roll <= 73) item.name = 'Wand of Magic Detection';
        else if (roll <= 79) item.name = 'Wand of Paralyzation';
        else if (roll <= 84) item.name = 'Wand of Polymorph';
        else if (roll <= 92) item.name = 'Wand of Secret Door Detection';
        else item.name = 'Wand of Trap Detection';
    }

    /**
     * Generates miscellaneous magic items.
     * @param {number} roomId - Room identifier.
     * @param {Array} roomList - Room list.
     */
    static miscMagic(roomId, roomList) {
        const item = Item.generate(roomId, roomList);
        const roll = Math.floor(Math.random() * 100) + 1;
        // Determine miscellaneous magic item type
        if (roll <= 4) item.name = 'Amulet of Proof against Detection and Location';
        else if (roll <= 6) item.name = 'Bag of Devouring';
        else if (roll <= 12) item.name = 'Bag of Holding';
        else if (roll <= 17) item.name = 'Boots of Levitation';
        else if (roll <= 22) item.name = 'Boots of Speed';
        else if (roll <= 27) item.name = 'Boots of Traveling and Leaping';
        else if (roll <= 28) item.name = 'Bowl Commanding Water Elementals';
        else if (roll <= 29) item.name = 'Brazier Commanding Fire Elementals';
        else if (roll <= 35) item.name = 'Broom of Flying';
        else if (roll <= 36) item.name = 'Censer Commanding Air Elementals';
        else if (roll <= 39) item.name = 'Cloak of Displacement';
        else if (roll <= 43) item.name = 'Crystal Ball';
        else if (roll <= 45) item.name = 'Crystal Ball with Clairaudience';
        else if (roll <= 46) item.name = 'Drums of Panic';
        else if (roll <= 47) item.name = 'Efreeti Bottle';
        else if (roll <= 54) item.name = 'Elven Boots';
        else if (roll <= 61) item.name = 'Elven Cloak';
        else if (roll <= 63) item.name = 'Flying Carpet';
        else if (roll <= 70) item.name = 'Gauntlets of Ogre Power';
        else if (roll <= 72) item.name = 'Girdle of Giant Strength';
        else if (roll <= 78) item.name = 'Helm of Reading Languages and Magic';
        else if (roll <= 79) item.name = 'Helm of Telepathy';
        else if (roll <= 80) item.name = 'Helm of Teleportation';
        else if (roll <= 81) item.name = 'Horn of Blasting';
        else if (roll <= 82) item.name = 'Horn of Doom';
        else if (roll <= 91) item.name = 'Medallion of ESP';
        else if (roll <= 92) item.name = 'Mirror of Life Trapping';
        else if (roll <= 97) item.name = 'Rope of Climbing';
        else if (roll <= 99) item.name = 'Scarab of Protection';
        else item.name = 'Stone Commanding Earth Elementals';
    }

    /**
     * Generates magic items of specified type and quantity.
     * @param {number} number - Quantity.
     * @param {string} type - Magic type category.
     * @param {number} roomId - Room identifier.
     * @param {Array} roomList - Room list.
     * @param {Cavern} cavern - Cavern generator.
     */
    static magic(number, type, roomId, roomList, cavern) {
        for (let n = 0; n < number; n++) {
            const roll = Math.floor(Math.random() * 100) + 1;
            // Roll and generate appropriate magic item category
            if (type === 'weapons armor') {
                if (roll <= 70) Item.weapon(roomId, roomList, cavern);
                else Item.armor(roomId, roomList);
            } else if (type === 'not weapons') {
                if (roll <= 12) Item.armor(roomId, roomList);
                else if (roll <= 40) Item.potion(roomId, roomList, cavern);
                else if (roll <= 79) Item.scroll(roomId, roomList);
                else if (roll <= 86) Item.ring(roomId, roomList);
                else if (roll <= 93) Item.wand(roomId, roomList);
                else Item.miscMagic(roomId, roomList);
            } else {
                if (roll <= 25) Item.weapon(roomId, roomList, cavern);
                else if (roll <= 35) Item.armor(roomId, roomList);
                else if (roll <= 55) Item.potion(roomId, roomList, cavern);
                else if (roll <= 85) Item.scroll(roomId, roomList);
                else if (roll <= 90) Item.ring(roomId, roomList);
                else if (roll <= 95) Item.wand(roomId, roomList);
                else Item.miscMagic(roomId, roomList);
            }
        }
    }

    /**
     * Generates jewelry treasures (art objects and trinkets).
     * @param {number} number - Quantity.
     * @param {number} roomId - Room identifier.
     * @param {Array} roomList - Room list.
     * @param {Cavern} cavern - Cavern generator.
     */
    static jewelry(number, roomId, roomList, cavern) {
        const adjective = [
            'Antique', 'Beaded', 'Bronze', 'Copper', 'Dainty', 'Decorative',
            'Delicate', 'Detailed', 'Elegant', 'Engraved', 'Exotic', 'Feminine',
            'Fine', 'Garish', 'Golden', 'Iron', 'Masculine', 'Platinum',
            'Profane', 'Religious', 'Shiny', 'Silver', 'Tasteless', 'Polished'
        ];
        const names = [
            'Anklet', 'Belt', 'Flagon', 'Bowl', 'Goblet', 'Bracelet', 'Knife',
            'Brooch', 'Letter Opener', 'Buckle', 'Locket', 'Chain', 'Medal',
            'Choker', 'Necklace', 'Circlet', 'Plate', 'Clasp', 'Pin', 'Comb',
            'Sceptre', 'Crown', 'Statuette', 'Cup', 'Tiara', 'Headdress',
            'Amulet', 'Bracer', 'Figurine', 'Horn', 'Box'
        ];
        const decorations = Item.gemsList.concat([
            'Religious Symbols', 'Profane Symbols', 'Battle Scenes', 'a Name',
            'a Face', 'Animals', 'Abstract Patterns', 'a Family Crest', 'a Star',
            'Angels', 'Antelopes', 'an Arrow', 'an Archer', 'a Badger', 'a Bear',
            'Bees', 'a Devil', 'Demons', 'a Knight', 'a Camel', 'a Bird', 'Birds',
            'an Owl', 'a Comet', 'an Eagle', 'a Hawk', 'a Falcon', 'a Cross',
            'a Frog', 'a Fish', 'a Goose', 'a Bull', 'a Horn', 'a Lion', 'a Griffin',
            'a Dog', 'Dogs', 'a Cat', 'Scales of Justice', 'a Sword', 'an Axe',
            'Lightning', 'the Sun', 'the Moon', 'a Helmet', 'a Raven', 'a Fox',
            'a Shark', 'a Spider', 'a Stag', 'a Trident', 'a Warrior', 'a Priest',
            'a Mage', 'a Tree', 'Skulls', 'a Skull'
        ]);

        for (let n = 0; n < number; n++) {
            const item = Item.generate(roomId, roomList);
            item.value = Dice.rollSum(2, 8) * 100;
            item.name = '';
            // Randomly prefix with an adjective
            if (Dice.roll(1, 3) === 1) {
                item.name = Dice.chooseOne(adjective) + ' ';
            }
            item.name += Dice.chooseOne(names);
            // Randomly add decoration details
            if (Dice.roll(1, 3) === 1) {
                item.name += ' Decorated with ' + Dice.chooseOne(decorations);
            }
            item.name += ' (' + item.value.toLocaleString() + ' gp)';
        }
    }

    /**
     * Generates scaled treasure hoards based on dungeon level.
     * @param {number} roomId - Room identifier.
     * @param {number} dungeonLevel - Dungeon level.
     * @param {Array} roomList - Room list.
     * @param {Cavern} cavern - Cavern generator.
     */
    static makeTreasureByLevel(roomId, dungeonLevel, roomList, cavern) {
        // Roll treasure types and amounts appropriate for the dungeon level
        switch (dungeonLevel) {
            case 1:
                if (Dice.p(75)) Item.coins('cp', Dice.rollSum(1, 8) * 100, roomId, roomList);
                if (Dice.p(50)) Item.coins('sp', Dice.rollSum(1, 6) * 100, roomId, roomList);
                if (Dice.p(25)) Item.coins('ep', Dice.rollSum(1, 4) * 100, roomId, roomList);
                if (Dice.p(7)) Item.coins('gp', Dice.rollSum(1, 4) * 100, roomId, roomList);
                if (Dice.p(1)) Item.coins('pp', Dice.rollSum(1, 4) * 100, roomId, roomList);
                if (Dice.p(7)) Item.gems(Dice.roll(1, 4), roomId, roomList, cavern);
                if (Dice.p(3)) Item.jewelry(Dice.roll(1, 4), roomId, roomList, cavern);
                if (Dice.p(2)) Item.magic(1, 'any', roomId, roomList, cavern);
                break;
            case 2:
                if (Dice.p(50)) Item.coins('cp', Dice.rollSum(1, 10) * 100, roomId, roomList);
                if (Dice.p(50)) Item.coins('sp', Dice.rollSum(1, 8) * 100, roomId, roomList);
                if (Dice.p(25)) Item.coins('ep', Dice.rollSum(1, 6) * 100, roomId, roomList);
                if (Dice.p(20)) Item.coins('gp', Dice.rollSum(1, 6) * 100, roomId, roomList);
                if (Dice.p(2)) Item.coins('pp', Dice.rollSum(1, 4) * 100, roomId, roomList);
                if (Dice.p(10)) Item.gems(Dice.roll(1, 6), roomId, roomList, cavern);
                if (Dice.p(7)) Item.jewelry(Dice.roll(1, 4), roomId, roomList, cavern);
                if (Dice.p(5)) Item.magic(1, 'any', roomId, roomList, cavern);
                break;
            case 3:
                if (Dice.p(30)) Item.coins('cp', Dice.rollSum(2, 6) * 100, roomId, roomList);
                if (Dice.p(50)) Item.coins('sp', Dice.rollSum(1, 10) * 100, roomId, roomList);
                if (Dice.p(25)) Item.coins('ep', Dice.rollSum(1, 8) * 100, roomId, roomList);
                if (Dice.p(50)) Item.coins('gp', Dice.rollSum(1, 6) * 100, roomId, roomList);
                if (Dice.p(4)) Item.coins('pp', Dice.rollSum(1, 4) * 100, roomId, roomList);
                if (Dice.p(15)) Item.gems(Dice.roll(1, 6), roomId, roomList, cavern);
                if (Dice.p(7)) Item.jewelry(Dice.roll(1, 6), roomId, roomList, cavern);
                if (Dice.p(8)) Item.magic(1, 'any', roomId, roomList, cavern);
                break;
            case 4:
            case 5:
                if (Dice.p(20)) Item.coins('cp', Dice.rollSum(3, 6) * 100, roomId, roomList);
                if (Dice.p(50)) Item.coins('sp', Dice.rollSum(2, 6) * 100, roomId, roomList);
                if (Dice.p(25)) Item.coins('ep', Dice.rollSum(1, 10) * 100, roomId, roomList);
                if (Dice.p(50)) Item.coins('gp', Dice.rollSum(2, 6) * 100, roomId, roomList);
                if (Dice.p(8)) Item.coins('pp', Dice.rollSum(1, 4) * 100, roomId, roomList);
                if (Dice.p(20)) Item.gems(Dice.roll(1, 8), roomId, roomList, cavern);
                if (Dice.p(10)) Item.jewelry(Dice.roll(1, 6), roomId, roomList, cavern);
                if (Dice.p(12)) Item.magic(1, 'any', roomId, roomList, cavern);
                break;
            case 6:
            case 7:
                if (Dice.p(15)) Item.coins('cp', Dice.rollSum(4, 6) * 100, roomId, roomList);
                if (Dice.p(50)) Item.coins('sp', Dice.rollSum(3, 6) * 100, roomId, roomList);
                if (Dice.p(25)) Item.coins('ep', Dice.rollSum(1, 12) * 100, roomId, roomList);
                if (Dice.p(70)) Item.coins('gp', Dice.rollSum(2, 8) * 100, roomId, roomList);
                if (Dice.p(15)) Item.coins('pp', Dice.rollSum(1, 4) * 100, roomId, roomList);
                if (Dice.p(30)) Item.gems(Dice.roll(1, 8), roomId, roomList, cavern);
                if (Dice.p(15)) Item.jewelry(Dice.roll(1, 6), roomId, roomList, cavern);
                if (Dice.p(16)) Item.magic(1, 'any', roomId, roomList, cavern);
                break;
            default:
                if (Dice.p(10)) Item.coins('cp', Dice.rollSum(5, 6) * 100, roomId, roomList);
                if (Dice.p(50)) Item.coins('sp', Dice.rollSum(5, 6) * 100, roomId, roomList);
                if (Dice.p(25)) Item.coins('ep', Dice.rollSum(2, 8) * 100, roomId, roomList);
                if (Dice.p(75)) Item.coins('gp', Dice.rollSum(4, 6) * 100, roomId, roomList);
                if (Dice.p(30)) Item.coins('pp', Dice.rollSum(1, 4) * 100, roomId, roomList);
                if (Dice.p(40)) Item.gems(Dice.roll(1, 8), roomId, roomList, cavern);
                if (Dice.p(30)) Item.jewelry(Dice.roll(1, 8), roomId, roomList, cavern);
                if (Dice.p(20)) Item.magic(1, 'any', roomId, roomList, cavern);
                break;
        }
    }

    /**
     * Generates treasure based on standard OSR treasure type letters (A-V).
     * @param {number} roomId - Room identifier.
     * @param {string} letter - Treasure type letter.
     * @param {Array} roomList - Room list.
     * @param {Cavern} cavern - Cavern generator.
     */
    static makeTreasureByLetter(roomId, letter, roomList, cavern) {
        // Switch on treasure type letter to generate standard OSR treasure distributions
        switch (letter.toUpperCase()) {
            case 'A':
                if (Dice.p(50)) Item.coins('cp', Dice.rollSum(5, 6) * 100, roomId, roomList);
                if (Dice.p(60)) Item.coins('sp', Dice.rollSum(5, 6) * 100, roomId, roomList);
                if (Dice.p(40)) Item.coins('ep', Dice.rollSum(5, 4) * 100, roomId, roomList);
                if (Dice.p(70)) Item.coins('gp', Dice.rollSum(10, 6) * 100, roomId, roomList);
                if (Dice.p(50)) Item.coins('pp', Dice.rollSum(1, 10) * 100, roomId, roomList);
                if (Dice.p(50)) Item.gems(Dice.roll(6, 6), roomId, roomList, cavern);
                if (Dice.p(50)) Item.jewelry(Dice.roll(6, 6), roomId, roomList, cavern);
                if (Dice.p(30)) Item.magic(3, 'any', roomId, roomList, cavern);
                break;
            case 'B':
                if (Dice.p(75)) Item.coins('cp', Dice.rollSum(5, 10) * 100, roomId, roomList);
                if (Dice.p(50)) Item.coins('sp', Dice.rollSum(5, 6) * 100, roomId, roomList);
                if (Dice.p(50)) Item.coins('ep', Dice.rollSum(5, 4) * 100, roomId, roomList);
                if (Dice.p(50)) Item.coins('gp', Dice.rollSum(3, 6) * 100, roomId, roomList);
                if (Dice.p(25)) Item.gems(Dice.roll(1, 6), roomId, roomList, cavern);
                if (Dice.p(25)) Item.jewelry(Dice.roll(1, 6), roomId, roomList, cavern);
                if (Dice.p(10)) Item.magic(3, 'weapons armor', roomId, roomList, cavern);
                break;
            case 'C':
                if (Dice.p(60)) Item.coins('cp', Dice.rollSum(6, 6) * 100, roomId, roomList);
                if (Dice.p(60)) Item.coins('sp', Dice.rollSum(5, 4) * 100, roomId, roomList);
                if (Dice.p(30)) Item.coins('ep', Dice.rollSum(2, 6) * 100, roomId, roomList);
                if (Dice.p(25)) Item.gems(Dice.roll(1, 4), roomId, roomList, cavern);
                if (Dice.p(25)) Item.jewelry(Dice.roll(1, 4), roomId, roomList, cavern);
                if (Dice.p(15)) Item.magic(Math.floor(Math.random() * 2 + 1), 'any', roomId, roomList, cavern);
                break;
            case 'D':
                if (Dice.p(30)) Item.coins('cp', Dice.rollSum(4, 6) * 100, roomId, roomList);
                if (Dice.p(45)) Item.coins('sp', Dice.rollSum(6, 6) * 100, roomId, roomList);
                if (Dice.p(90)) Item.coins('gp', Dice.rollSum(5, 8) * 100, roomId, roomList);
                if (Dice.p(30)) Item.gems(Dice.roll(1, 8), roomId, roomList, cavern);
                if (Dice.p(30)) Item.jewelry(Dice.roll(1, 8), roomId, roomList, cavern);
                if (Dice.p(20)) { Item.magic(Math.floor(Math.random() * 2 + 1), 'any', roomId, roomList, cavern); Item.potion(roomId, roomList, cavern); }
                break;
            case 'E':
                if (Dice.p(30)) Item.coins('cp', Dice.rollSum(2, 8) * 100, roomId, roomList);
                if (Dice.p(60)) Item.coins('sp', Dice.rollSum(6, 10) * 100, roomId, roomList);
                if (Dice.p(50)) Item.coins('ep', Dice.rollSum(3, 8) * 100, roomId, roomList);
                if (Dice.p(50)) Item.coins('gp', Dice.rollSum(4, 10) * 100, roomId, roomList);
                if (Dice.p(10)) Item.gems(Dice.roll(1, 10), roomId, roomList, cavern);
                if (Dice.p(10)) Item.jewelry(Dice.roll(1, 10), roomId, roomList, cavern);
                if (Dice.p(30)) { Item.magic(Math.floor(Math.random() * 4 + 1), 'any', roomId, roomList, cavern); Item.scroll(roomId, roomList); }
                break;
            case 'F':
                if (Dice.p(40)) Item.coins('sp', Dice.rollSum(3, 8) * 100, roomId, roomList);
                if (Dice.p(50)) Item.coins('ep', Dice.rollSum(4, 8) * 100, roomId, roomList);
                if (Dice.p(85)) Item.coins('gp', Dice.rollSum(6, 10) * 100, roomId, roomList);
                if (Dice.p(70)) Item.coins('pp', Dice.rollSum(2, 8) * 100, roomId, roomList);
                if (Dice.p(20)) Item.gems(Dice.roll(2, 12), roomId, roomList, cavern);
                if (Dice.p(10)) Item.jewelry(Dice.roll(1, 12), roomId, roomList, cavern);
                if (Dice.p(35)) { Item.magic(Math.floor(Math.random() * 4 + 1), 'not weapons', roomId, roomList, cavern); Item.potion(roomId, roomList, cavern); Item.scroll(roomId, roomList); }
                break;
            case 'G':
                if (Dice.p(90)) Item.coins('gp', Dice.rollSum(4, 6) * 1000, roomId, roomList);
                if (Dice.p(75)) Item.coins('pp', Dice.rollSum(5, 8) * 100, roomId, roomList);
                if (Dice.p(25)) Item.gems(Dice.roll(3, 6), roomId, roomList, cavern);
                if (Dice.p(25)) Item.jewelry(Dice.roll(1, 10), roomId, roomList, cavern);
                if (Dice.p(50)) { Item.magic(Math.floor(Math.random() * 4 + 1), 'any', roomId, roomList, cavern); Item.scroll(roomId, roomList); }
                break;
            case 'H':
                if (Dice.p(75)) Item.coins('cp', Dice.rollSum(8, 10) * 100, roomId, roomList);
                if (Dice.p(75)) Item.coins('sp', Dice.rollSum(6, 10) * 1000, roomId, roomList);
                if (Dice.p(75)) Item.coins('ep', Dice.rollSum(3, 10) * 1000, roomId, roomList);
                if (Dice.p(75)) Item.coins('gp', Dice.rollSum(5, 8) * 1000, roomId, roomList);
                if (Dice.p(75)) Item.coins('pp', Dice.rollSum(9, 8) * 100, roomId, roomList);
                if (Dice.p(50)) Item.gems(Dice.roll(1, 100), roomId, roomList, cavern);
                if (Dice.p(50)) Item.jewelry(Dice.roll(10, 4), roomId, roomList, cavern);
                if (Dice.p(20)) { Item.magic(Math.floor(Math.random() * 4 + 1), 'any', roomId, roomList, cavern); Item.potion(roomId, roomList, cavern); Item.scroll(roomId, roomList); }
                break;
            case 'I':
                if (Dice.p(80)) Item.coins('pp', Dice.rollSum(3, 10) * 100, roomId, roomList);
                if (Dice.p(50)) Item.gems(Dice.roll(2, 6), roomId, roomList, cavern);
                if (Dice.p(50)) Item.jewelry(Dice.roll(2, 6), roomId, roomList, cavern);
                if (Dice.p(15)) Item.magic(1, 'any', roomId, roomList, cavern);
                break;
            case 'J':
                if (Dice.p(45)) Item.coins('cp', Dice.rollSum(3, 8) * 100, roomId, roomList);
                if (Dice.p(45)) Item.coins('sp', Dice.rollSum(1, 8) * 100, roomId, roomList);
                break;
            case 'K':
                if (Dice.p(90)) Item.coins('sp', Dice.rollSum(2, 10) * 100, roomId, roomList);
                if (Dice.p(35)) Item.coins('ep', Dice.rollSum(1, 8) * 100, roomId, roomList);
                break;
            case 'L':
                if (Dice.p(50)) Item.gems(Dice.roll(1, 4), roomId, roomList, cavern);
                break;
            case 'M':
                if (Dice.p(90)) Item.coins('gp', Dice.rollSum(4, 10) * 100, roomId, roomList);
                if (Dice.p(90)) Item.coins('pp', Dice.rollSum(2, 8) * 1000, roomId, roomList);
                if (Dice.p(55)) Item.gems(Dice.roll(5, 4), roomId, roomList, cavern);
                if (Dice.p(45)) Item.jewelry(Dice.roll(1, 6), roomId, roomList, cavern);
                break;
            case 'N':
                if (Dice.p(40)) {
                    for (let i = Dice.rollSum(2, 4); i > 0; i--) Item.potion(roomId, roomList, cavern);
                }
                break;
            case 'O':
                if (Dice.p(50)) {
                    for (let i = Math.floor(Math.random() * 4 + 1); i > 0; i--) Item.scroll(roomId, roomList);
                }
                break;
            case 'P': Item.coins('cp', Dice.rollSum(3, 8) * 100, roomId, roomList); break;
            case 'Q': Item.coins('sp', Dice.rollSum(3, 6) * 100, roomId, roomList); break;
            case 'R': Item.coins('ep', Dice.rollSum(2, 6) * 100, roomId, roomList); break;
            case 'S': Item.coins('gp', Dice.rollSum(2, 4) * 100, roomId, roomList); break;
            case 'T': Item.coins('pp', Dice.rollSum(1, 6) * 100, roomId, roomList); break;
            case 'U':
                if (Dice.p(50)) Item.coins('cp', Dice.rollSum(1, 20) * 100, roomId, roomList);
                if (Dice.p(50)) Item.coins('sp', Dice.rollSum(1, 20) * 100, roomId, roomList);
                if (Dice.p(25)) Item.coins('gp', Dice.rollSum(1, 20) * 100, roomId, roomList);
                if (Dice.p(5)) Item.gems(Math.floor(Math.random() * 4 + 1), roomId, roomList, cavern);
                if (Dice.p(5)) Item.jewelry(Math.floor(Math.random() * 4 + 1), roomId, roomList, cavern);
                if (Dice.p(2)) Item.magic(1, 'any', roomId, roomList, cavern);
                break;
            case 'V':
                if (Dice.p(25)) Item.coins('sp', Dice.rollSum(1, 20) * 100, roomId, roomList);
                if (Dice.p(25)) Item.coins('ep', Dice.rollSum(1, 20) * 100, roomId, roomList);
                if (Dice.p(50)) Item.coins('gp', Dice.rollSum(1, 20) * 100, roomId, roomList);
                if (Dice.p(25)) Item.coins('pp', Dice.rollSum(1, 20) * 100, roomId, roomList);
                if (Dice.p(10)) Item.gems(Math.floor(Math.random() * 4 + 1), roomId, roomList, cavern);
                if (Dice.p(10)) Item.jewelry(Math.floor(Math.random() * 4 + 1), roomId, roomList, cavern);
                if (Dice.p(5)) Item.magic(1, 'any', roomId, roomList, cavern);
                break;
        }
    }
}
