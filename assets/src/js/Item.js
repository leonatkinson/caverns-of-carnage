import { Dice } from "./Dice.js";
import { Cavern } from "./Cavern.js";

export class Item {
  static gemsList = [
    "Agate",
    "Amber",
    "Amethyst",
    "Aquamarine",
    "Aventurine",
    "Beryl",
    "Bloodstone",
    "Citrine",
    "Diaspore",
    "Emerald",
    "Iolite",
    "Jade",
    "Jasper",
    "Lapis Lazuli",
    "Meteorite",
    "Opal",
    "Moonstone",
    "Obsidian",
    "Onyx",
    "Pearl",
    "Peridot",
    "Ruby",
    "Sapphire",
    "Sunstone",
    "Topaz",
    "Tourmaline",
    "White Diamond",
    "Blue Diamond",
    "Green Diamond",
    "Yellow Diamond",
    "Orange Diamond",
    "Red Diamond",
    "Pink Diamond",
    "Violet Diamond",
    "Black Diamond",
    "Gold Nugget",
    "Platinum Nugget",
  ];

  static junkList = [
    "an alembic",
    "an altar",
    "an anklet",
    "an apron",
    "an arm band",
    "an armchair",
    "an armoire",
    "an arras",
    "a broken arrow",
    "a pile of ash",
    "scattered ashes",
    "an awl",
    "a bag",
    "balance & weights",
    "bandages",
    "tree bark",
    "a barrel",
    "a basin",
    "a basket",
    "bastinadoes",
    "a beaker",
    "a beater",
    "a bed",
    "bellows",
    "{1d4+1} bells",
    "a belt",
    "a bench",
    "a bladder",
    "a blanket",
    "a blouse",
    "a bone",
    "animal bones",
    "a book",
    "boots",
    "a bottle",
    "a broken bottle",
    "a bowl",
    "a bracelet",
    "branding irons",
    "a brazier",
    "a brazier & charcoal",
    "a brooch",
    "a brush",
    "a bucket",
    "a belt buckle",
    "a buffet",
    "bunks",
    "buskins",
    "a large barrel",
    "a cabinet",
    "a cage",
    "a caldron",
    "a candelabra",
    "a candelabrum",
    "a candle",
    "{1d4+1} candles",
    "a candle snuffer",
    "a candlestick",
    "{1d4+1} candlesticks",
    "a walking cane",
    "a cap",
    "a cape",
    "a carafe",
    "a carpet",
    "a case",
    "a cask",
    "cassocks",
    "a chain",
    "corroded chains",
    "a broken chair",
    "a chair",
    "a padded chair",
    "a padded arm chair",
    "a chair with straps",
    "a chalice",
    "a chalk",
    "a chandelier",
    "charcoal",
    "a large chest",
    "a medium chest",
    "a chest of drawers",
    "chimes",
    "a choker",
    "a chopper",
    "chunks of rock",
    "a pile of cinders",
    "{1d4+1} clamps",
    "a clasp",
    "a cloak",
    "a wardrobe",
    "an altar cloth",
    "a splintered club",
    "a handful of coal",
    "a coat",
    "cobwebs",
    "a coffer",
    "a coif",
    "a bent copper coin",
    "a collar",
    "a vial of cologne",
    "pillars holding up the ceiling",
    "a comb",
    "a coronet",
    "a couch",
    "ceiling cracks",
    "floor cracks",
    "wall cracks",
    "a crate",
    "a cresset",
    "{1d4+1} cressets",
    "a crown",
    "a crucible",
    "a cruet",
    "a non-magical crystal ball",
    "{1d4+1} crystals",
    "a cup",
    "a cupboard",
    "a curtain",
    "a cushion",
    "a dagger hilt",
    "a dais",
    "ceiling dampness",
    "wall dampness",
    "a decanter",
    "a desk",
    "a diadem",
    "a dipper",
    "a dish",
    "a doublet",
    "a dress",
    "dried blood",
    "dripping water",
    "a drum",
    "a pile of dung",
    "dust",
    "an earring",
    "an earspoon",
    "an ewer",
    "fetters",
    "fibers",
    "a fire pit",
    "a fireplace with mantle",
    "a fireplace & wood",
    "a firkin",
    "a flagon",
    "a flask",
    "a cracked flask",
    "a fob",
    "a font",
    "spoiled food",
    "dried food scraps",
    "a fork",
    "a fountain",
    "a fresco",
    "a frock",
    "common fungus",
    "a funnel",
    "a furnace",
    "a pair of gauntlets",
    "gelatin",
    "an ordinary girdle",
    "a globe",
    "a pair of gloves",
    "a goblet",
    "a gong",
    "a gown",
    "a pile of grain",
    "a grater",
    "a greasy stain",
    "a grill",
    "a grinder",
    "a grindstone",
    "a pile of guano",
    "a habit",
    "bit of hair",
    "a cracked hammer head",
    "a hamper",
    "a hassock",
    "a hat",
    "a headband",
    "a badly dented helmet",
    "a small sack of herbs",
    "a hogshead",
    "holy symbols",
    "unholy symbols",
    "a hood",
    "{1d4+1} hooks",
    "a horn",
    "a hose",
    "an hourglass",
    "a huge bell",
    "{1d4+1} husks",
    "an idol",
    "a large idol",
    "{1d4+1} small idols",
    "an incense burner",
    "a bent and rusted iron bar",
    "a pair of iron boots",
    "an iron maiden",
    "a jack (container)",
    "a jar",
    "a blunt javelin head",
    "a jerkin",
    "a jug",
    "a jupon",
    "a keg",
    "a kerchief",
    "a kettle",
    "a kirtle",
    "a kneeling bench",
    "a knife",
    "{1d4+1} knives",
    "a set of knucklebones",
    "a ladle",
    "a lamp",
    "a lantern",
    "{1d4+1} lamps",
    "a large box",
    "a leather boot",
    "a pile of leaves",
    "a pile of dry leaves & twigs",
    "a lectern",
    "leggings",
    "a lens",
    "linen drawers",
    "linen undershirt",
    "a locket",
    "a loom",
    "a magic circle",
    "manacles",
    "a mantle",
    "a masher",
    "a mat",
    "a mattress",
    "a medal",
    "a medallion",
    "a mirror",
    "common mold",
    "a mortar & pestle",
    "mosaics",
    "a mug",
    "a necklace",
    "{1d4+1} needles",
    "an offertory container",
    "a barrel of oil",
    "a bottle of fuel oil",
    "a vial of scented oil",
    "an orb",
    "an oubliette (pit)",
    "a pail",
    "a painting",
    "{1d4+1} paintings",
    "a pallet",
    "a pan",
    "pantaloons",
    "a roll of parchment",
    "a jar of paste",
    "a pedestal",
    "{1d4+1} pegs",
    "{1d4+1} pellets",
    "a pendant",
    "a pentacle",
    "a pentagram",
    "a petticoat",
    "pews",
    "a phial",
    "a pick handle",
    "a pillory",
    "a pillow",
    "a pin",
    "a pair of pincers",
    "a large cask pipe",
    "a musical pipe",
    "a smokeing pipe",
    "musicial pipes",
    "a pipette",
    "a pitcher",
    "a plate",
    "a platter",
    "a pair of pliers",
    "a broken pole ({1d4+2} feet long)",
    "a pot",
    "a huge pot",
    "pottery shards",
    "a pouch",
    "a purse",
    "a pile of powder",
    "a prayer rug",
    "a prism",
    "a puff",
    "a pulpit",
    "a quill",
    "a quilt",
    "a rack",
    "a pile of rags",
    "a rail",
    "a razor",
    "a retort",
    "a robe",
    "{1d4+1} robes",
    "a mixing rod",
    "{3d6} feet of rope",
    "a rotten rope",
    "{1d4+1} 4 foot ropes",
    "rubble & dirt",
    "a small rug",
    "rushes",
    "a sack",
    "a torn sack",
    "a jar of salve",
    "a sanctuary",
    "a pair of sandals",
    "a saucer",
    "a scarf",
    "a sceptre",
    "a wall sconce",
    "a scraper",
    "a screen",
    "a scroll",
    "a scroll tube",
    "a shaker",
    "a shawl",
    "a sheet",
    "a shelf",
    "a shift",
    "a shrine",
    "a sideboard",
    "a side chair",
    "a sifter",
    "a patch of skin",
    "an animal hide",
    "a skull",
    "a slimy coating on the ceiling",
    "a slimy coating on the floor",
    "a slimy coating on the wall",
    "a pair slippers",
    "a small box",
    "a small casket",
    "a smock",
    "a bar of soap",
    "a sofa",
    "a spatula",
    "a spigot",
    "a rusted spike",
    "a spoon",
    "a measureing spoon",
    "an ordinary staff",
    "stalks",
    "a stand",
    "a statue",
    "{1d4+2} statues",
    "a statuette",
    "a figurine",
    "{1d4+2} sticks",
    "a pair of stockings",
    "stocks",
    "{1d4+2} small stones",
    "a foot stool",
    "a high stool",
    "a bar stool",
    "a stopper",
    "a strainer",
    "a strappado",
    "a pile of straw",
    "a stuffed animal",
    "a surcoat",
    "a broken sword blade",
    "a table",
    "a large table",
    "a long table",
    "a low table",
    "a round table",
    "a small table",
    "a trestle table",
    "a tankard",
    "a tank (container)",
    "a tapestry",
    "scattered teeth",
    "a thong",
    "a spool of thread",
    "a throne",
    "thumb screws",
    "a thurible",
    "a tiara",
    "a tinderbox (with flint & steel)",
    "a toga",
    "a pair of tongs",
    "{1d4+2} torches",
    "a torch stub",
    "a towel",
    "a tray",
    "a tripod",
    "a trivet",
    "a pair of trousers",
    "a trunk",
    "a tub",
    "a tube (container)",
    "a tube (piping)",
    "a tun",
    "a tunic",
    "a tureen",
    "a pair of tweezers",
    "a ball of twine",
    "unguent",
    "a u rack",
    "an urn",
    "a vase",
    "a veil",
    "a vest",
    "vestments",
    "vestry",
    "a vial",
    "a vice",
    "a votive light",
    "a wall basin and font",
    "a wallet",
    "wall scratchings",
    "a washcloth",
    "a waterclock",
    "a large puddle of water",
    "a small puddle of water",
    "a trickle water",
    "a wax blob",
    "wax drippings",
    "a well",
    "a wheel",
    "a whetstone",
    "{1d4+2} whips",
    "a whistle",
    "a wig",
    "a spool of wire",
    "{1d4+2} wood billets",
    "{1d4+2} rotting wood pieces",
    "a ball of wool",
    "a workbench",
    "a wrapper",
    "a ball of yarn",
  ];

  static purposeItemsMap = {
    Antechamber: [
      "Bench",
      "cloak pegs",
      "small side table",
      "rush mat",
      "candle stand",
    ],
    Armory: [
      "Weapon racks armor stand",
      "oiling rags",
      "whetstones",
      "spare straps and buckles",
      "wooden practice shield",
    ],
    "Audience Chamber": [
      "Raised dais",
      "high-backed chair",
      "low stools",
      "hanging tapestry",
      "writing desk with ink and parchment",
    ],
    Aviary: [
      "Perches",
      "seed trays",
      "water dishes",
      "wire cages",
      "nesting boxes",
    ],
    "Banquet Room": [
      "Long trestle table",
      "bench",
      "serving platter",
      "candelabra",
      "sideboard",
      "{1d6+1} pewter cups",
    ],
    Barracks: [
      "Bunks",
      "straw pallets",
      "{1d4+1} footlockers",
      "weapon pegs",
      "washbasin",
      "lantern hooks",
      "{1d3+1} blankets",
    ],
    Bath: ["Wooden tub", "water bucket", "soap dish", "linen towels", "stool"],
    Bedroom: [
      "Bed with mattress and blankets",
      "chest",
      "washstand with basin and pitcher",
      "candleholder",
      "clothes pegs",
    ],
    Boudoir: [
      "Dressing table with mirror",
      "cushioned chair",
      "jewelry box",
      "perfume vials",
      "silk cushions",
      "wardrobe",
    ],
    Bestiary: [
      "{1d8+1} Iron cages",
      "feeding troughs",
      "chain collar",
      "leather leads straw bedding",
      "water bucket",
    ],
    Cell: [
      "Straw pallet",
      "iron ring set in the wall",
      "wooden bucket",
      "crude stool",
      "thin blanket",
    ],
    Chantry: [
      "Prayer bench",
      "small altar",
      "hymn book",
      "votive candle rack",
      "incense burner",
      "kneeler",
    ],
    Chapel: [
      "Altar",
      "pews",
      "lectern",
      "holy symbol on a stand",
      "candle stands",
      "offering plate",
    ],
    Cistern: [
      "Stone basin",
      "bucket and rope",
      "wooden cover",
      "dipper",
      "overflow channel",
      "ladder",
    ],
    Classroom: [
      "Writing desks",
      "benches",
      "slate boards",
      "chalk",
      "ink pots and quills",
      "wall chart",
    ],
    Closet: [
      "Shelves",
      "hanging pegs",
      "storage boxes",
      "spare linens",
      "brooms",
      "folded cloaks",
    ],
    "Conjuring Chamber": [
      "Circle inlaid in the floor",
      "lectern",
      "candle stands at the cardinal points",
      "chalk box",
      "component shelves",
      "brazier",
    ],
    Corridor: ["tbd"],
    Court: [
      "Benches along the walls",
      "raised seat for the presiding official",
      "railing",
      "clerk’s table with ledger and ink",
    ],
    Crypt: [
      "Stone sarcophagi",
      "niche shelves",
      "funerary urns",
      "offering bowls",
      "iron candlesticks",
      "carved name plaques",
    ],
    "Dining Room": [
      "Table and chairs",
      "sideboard",
      "serving dishes",
      "napkins",
      "candlesticks",
      "salt cellar",
    ],
    "Divination Chamber": [
      "Low table",
      "scrying bowl",
      "cushioned seats",
      "star chart",
      "incense holder",
      "crystal on a stand",
    ],
    Dormitory: [
      "Rows of cots",
      "shared chests",
      "washbasins",
      "pegs for clothes",
      "lantern",
      "folded blankets",
    ],
    "Dressing Room": [
      "Wardrobe",
      "full-length mirror",
      "stool",
      "clothes brushes",
      "shoe rack",
      "jewelry tray",
    ],
    Entry: [
      "Door mat",
      "coat hooks",
      "umbrella stand",
      "staff rack",
      "small bench",
      "lantern niche",
    ],
    Vestibule: [
      "Bench",
      "cloak pegs",
      "small table",
      "floor mat",
      "wall sconce",
    ],
    Gallery: [
      "{1d6+1} framed paintings",
      "tapestries",
      "display pedestals",
      "cushioned viewing benches",
      "label plaques",
    ],
    "Game Room": [
      "Gaming table",
      "dice cup",
      "cards",
      "game board",
      "chairs",
      "score slate",
      "side table with cups",
    ],
    "Garbage Dump": [
      "Broken crates",
      "discarded pots",
      "scrap wood",
      "torn sacks",
      "rusted buckets",
      "pile of rags",
    ],
    Guardroom: [
      "Table and stools",
      "weapon rack",
      "dice cup",
      "bunk",
      "lantern",
      "checklist board",
    ],
    Hall: [
      "Benches along the walls",
      "wall hangings",
      "torch brackets",
      "side tables",
      "floor runner",
    ],
    "Great Hall": [
      "Long tables",
      "benches",
      "high seat",
      "hearth tools",
      "tapestries",
      "serving sideboards",
    ],
    "Harem Chamber": [
      "Cushioned divans",
      "low tables",
      "silk screens",
      "perfume bottles",
      "jewelry caskets",
      "hanging drapes",
    ],
    Kennel: [
      "Straw bedding",
      "food and water bowls",
      "chain leads",
      "leather collars",
      "wooden kennel boxes",
    ],
    Kitchen: [
      "Hearth",
      "oven",
      "iron pots and pans",
      "cutting boards",
      "knives",
      "work table",
      "spice jars",
      "ladle and spoons",
    ],
    Laboratory: [
      "Workbench",
      "glass flasks and retorts",
      "burner",
      "brazier",
      "mortar and pestle",
      "shelves of jars",
      "notebooks",
    ],
    Library: [
      "Bookshelves",
      "reading tables",
      "chairs",
      "ladders",
      "catalog ledger",
      "oil lamps",
      "book stands",
    ],
    Lounge: [
      "Cushioned chairs",
      "low tables",
      "rugs",
      "decanter and glasses",
      "footstools",
      "wall hangings",
    ],
    "Meditation Chamber": [
      "Floor cushions",
      "small altar",
      "focus stone",
      "incense holder",
      "prayer beads on a stand",
      "simple mat",
    ],
    Observatory: [
      "Telescope on a stand",
      "star charts",
      "writing desk",
      "stool",
      "astrolabe",
      "candle lamp",
    ],
    Office: [
      "Desk",
      "chair",
      "ledger books",
      "ink and quills",
      "document chest",
      "seal and wax",
      "shelves",
    ],
    Pantry: [
      "Shelves of jars and sacks",
      "bins",
      "hanging herbs",
      "cheese cloth",
      "crocks",
      "scoop and scales",
    ],
    Prison: [
      "Iron-barred cells",
      "straw pallets",
      "buckets",
      "ring bolts",
      "guard’s stool",
      "key ring on a hook",
    ],
    "Animal Pen": [
      "Trough",
      "straw bedding",
      "water bucket",
      "hitching rail",
      "feed sack",
      "gate latch",
    ],
    Latrine: [
      "Wooden seat over a pit",
      "bucket of sand",
      "scrub brush",
      "wall peg for a rag",
    ],
    "Reception Room": [
      "Chairs",
      "small table",
      "sideboard",
      "coat stand",
      "rug",
      "vase",
    ],
    Refectory: [
      "Long communal tables",
      "benches",
      "serving platters",
      "bread baskets",
      "pitchers",
      "simple candlesticks",
    ],
    "Robing Room": [
      "Wardrobe of ceremonial robes",
      "bench",
      "mirror",
      "garment hooks",
      "chest for vestments",
      "shoe rack",
    ],
    Salon: [
      "Upholstered chairs",
      "tea table",
      "cushions",
      "decorative screen",
      "small paintings",
      "side cabinet",
    ],
    Shrine: [
      "Small altar",
      "offering bowl",
      "votive candles",
      "kneeling cushion",
      "holy symbol",
      "incense burner",
    ],
    "Sitting Room": [
      "Armchairs",
      "side tables",
      "rug",
      "fireplace tools",
      "cushions",
      "small bookshelf",
    ],
    Smithy: [
      "Anvil",
      "forge trough",
      "hammers and tongs",
      "quench bucket",
      "bellows",
      "workbench with vises",
      "coal bin",
    ],
    Stable: [
      "Stalls",
      "hay racks",
      "water troughs",
      "saddles and bridles on pegs",
      "pitchfork",
      "grooming brushes",
      "feed bins",
    ],
    Storage: [
      "Crates",
      "barrels",
      "shelves",
      "sacks",
      "coils of rope",
      "spare tools",
      "labeled boxes",
    ],
    Vault: [
      "Iron-bound chests",
      "strongboxes",
      "shelves of locked coffers",
      "ledger of contents",
      "heavy door bar",
    ],
    Treasury: [
      "Coin chests",
      "scales and weights",
      "ingot racks",
      "gem boxes",
      "counting table",
      "lockboxes",
    ],
    Study: [
      "Desk",
      "chair",
      "bookshelves",
      "inkstand",
      "reading lamp",
      "papers and scrolls",
      "waste basket",
    ],
    Temple: [
      "Altar",
      "pews",
      "font",
      "candelabra",
      "lectern",
      "offering plates",
      "religious banners",
    ],
    "Throne Room": [
      "Throne on a dais",
      "courtier benches",
      "banners",
      "carpet runner",
      "herald’s stand",
      "side tables",
    ],
    "Torture Chamber": [
      "Rack",
      "iron chair",
      "manacles on the wall",
      "brazier",
      "tongs",
      "stool",
      "bucket",
    ],
    "Training Room": [
      "Practice dummies",
      "weapon racks",
      "padded mats",
      "target butts",
      "benches",
      "chalk lines on the floor",
    ],
    "Trophy Room": [
      "Mounted heads",
      "mounted horns on plaques",
      "display cases",
      "pedestals",
      "weapon mounts",
      "label plates",
      "viewing benches",
    ],
    Museum: [
      "Glass cases",
      "labeled pedestals",
      "wall plaques",
      "rope stanchions",
      "catalog desk",
      "display shelves",
    ],
    "Waiting Room": [
      "Benches",
      "small table",
      "coat hooks",
      "notice board",
      "floor mat",
      "lantern",
    ],
    Well: [
      "Stone curb",
      "bucket and rope",
      "winch",
      "pulley",
      "dipper",
      "wooden cover",
    ],
    Workroom: [
      "Workbench",
      "stools",
      "tool rack",
      "clamps",
      "storage bins",
      "task lamp",
      "scrap box",
    ],
    Workshop: [
      "Workbenches",
      "vises",
      "hand tools on pegboards",
      "material bins",
      "stools",
      "measuring sticks",
      "finished-goods shelf",
    ],
  };

  /**
   * Returns items given a room purpose based on probability distribution,
   * eliminating duplicates.
   * @param {string} purpose - Room purpose.
   * @returns {Array<string>} Array of item names.
   */
  static getItemsByPurpose(purpose) {
    let list = null;
    if (purpose) {
      const exact = Item.purposeItemsMap[purpose];
      if (exact) {
        list = exact;
      } else {
        const lowerPurpose = purpose.toLowerCase();
        for (const key of Object.keys(Item.purposeItemsMap)) {
          if (key.toLowerCase() === lowerPurpose) {
            list = Item.purposeItemsMap[key];
            break;
          }
        }
      }
    }

    if (!list) {
      return [];
    }

    const roll = Dice.roll(1, 100);
    let count = 0;
    if (roll <= 25) {
      count = 0;
    } else if (roll <= 50) {
      count = 1;
    } else if (roll <= 75) {
      count = Dice.roll(1, 6);
    } else {
      count = Dice.rollSum(2, 6);
    }

    if (count === 0 || list.length === 0) {
      return [];
    }

    const chosen = [];
    for (let i = 0; i < count; i++) {
      let itemStr = Dice.chooseOne(list);
      itemStr = itemStr.replace(/\{([^}]+)\}/g, (match, expr) =>
        Dice.computeRoll(expr),
      );
      chosen.push(itemStr);
    }

    return [...new Set(chosen)];
  }

  /**
   * Initializes a new item instance.
   */
  constructor() {
    this.id = 0;
    this.room = null;
    this.name = "";
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
        const currentNum = parseInt(item.name.replace(/[^0-9]/g, ""), 10) || 0;
        item.name = (number + currentNum).toLocaleString() + " " + type;
        break;
      }
    }
    // If not existing, create new coin entry
    if (!item) {
      item = Item.generate(roomId, roomList);
      item.coins = type;
      item.name = number.toLocaleString() + " " + type;
    }
    // Calculate gold piece value equivalence based on coin type
    switch (type) {
      case "cp":
        item.value = Math.round((number / 100) * 100) / 100;
        break;
      case "sp":
        item.value = Math.round((number / 10) * 100) / 100;
        break;
      case "ep":
        item.value = Math.round((number / 2) * 100) / 100;
        break;
      case "gp":
        item.value = number;
        break;
      case "pp":
        item.value = 5 * number;
        break;
      default:
        item.value = 0;
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
      let base = 10,
        count = Dice.roll(1, 10);
      // Roll gemstone base value category
      const rollBase = Dice.roll(1, 5, 4);
      if (rollBase === 1) {
        base = 10;
        count = Dice.roll(1, 10);
      } else if (rollBase === 2) {
        base = 50;
        count = Dice.roll(1, 8);
      } else if (rollBase === 3) {
        base = 100;
        count = Dice.roll(1, 6);
      } else if (rollBase === 4) {
        base = 500;
        count = Dice.roll(1, 4);
      } else {
        base = 1000;
        count = Dice.roll(1, 2);
      }

      // Apply value adjustments and assign name and total value
      const adjustments = [0.1, 0.5, 0.75, 1, 1.5, 2, 10];
      base = base * adjustments[Dice.roll(0, 6, 4)];
      item.name =
        Dice.chooseOne(Item.gemsList) +
        " (" +
        count +
        " @ " +
        base.toLocaleString() +
        " gp)";
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
      "Great Axe",
      "Battle Axe",
      "Hand Axe",
      "Shortbow",
      "Longbow",
      "Dagger",
      "Shortsword",
      "Longsword",
      "Scimitar",
      "Two-Handed Sword",
      "Warhammer",
      "Mace",
      "Maul",
      "Pole Arm",
      "Spear",
      "Arrow",
      "Sling",
    ];
    const polearms = [
      "Ahlspeiss",
      "Bardiche",
      "Bec de corbin",
      "Bill-Guisarme",
      "Bill Hook",
      "Corseque",
      "Fauchard",
      "Glaive",
      "Guisarme",
      "Halberd",
      "Partisan",
      "Poleaxe",
      "Ranseur",
      "Scythe",
      "Spetum",
      "Trident",
      "Voulge",
      "Lucerne Hammer",
    ];
    const arrows = [
      "Shortbow Arrow",
      "Longbow Arrow",
      "Heavy Quarrel",
      "Light Quarrel",
      "Sling Bullet",
      "Dart",
    ];
    const enemies = [
      "Dragons",
      "Regenerators",
      "Enchanted",
      "Spell Users",
      "Lycanthropes",
      "Undead",
    ];

    // Select weapon category and sub-type
    let type = Dice.chooseOne(types);
    if (type === "Pole Arm") type = Dice.chooseOne(polearms);
    let missile = false,
      quantity = 1;
    if (type === "Arrow") {
      type = Dice.chooseOne(arrows);
      quantity = Dice.rollSum(2, 6);
      missile = true;
    }

    // Determine magical bonus or curse properties
    const roll = Math.floor(Math.random() * 100) + 1;
    let bonus = "+1",
      special = "";
    if (missile) {
      if (roll <= 5) bonus = "+0";
      else if (roll <= 46) bonus = "+1";
      else if (roll <= 58) bonus = "+2";
      else if (roll <= 64) bonus = "+3";
      else if (roll <= 82) bonus = "+1, +2 vs. " + Dice.chooseOne(enemies);
      else if (roll <= 94) bonus = "+1, +3 vs. " + Dice.chooseOne(enemies);
      else if (roll <= 98) bonus = "Cursed -1";
      else bonus = "Cursed -2";
    } else {
      if (roll <= 10) {
        bonus = "+0";
        item.value = 1000;
      } else if (roll <= 50) {
        bonus = "+1";
        item.value = 2000;
      } else if (roll <= 60) {
        bonus = "+2";
        item.value = 4000;
      } else if (roll <= 65) {
        bonus = "+3";
        item.value = 8000;
      } else if (roll <= 67) {
        bonus = "+4";
        item.value = 12000;
      } else if (roll <= 68) {
        bonus = "+5";
        item.value = 18000;
      } else if (roll <= 85) {
        bonus = "+1, +2 vs. " + Dice.chooseOne(enemies);
        item.value = 3000;
      } else if (roll <= 95) {
        bonus = "+1, +3 vs. " + Dice.chooseOne(enemies);
        item.value = 5000;
      } else if (roll <= 98) {
        bonus = "Cursed -1";
        item.value = 500;
      } else {
        bonus = "Cursed -2";
        item.value = 500;
      }

      // Small chance for special weapon ability
      if (Math.random() * 100 < 10) {
        const sRoll = Math.floor(Math.random() * 20) + 1;
        if (sRoll <= 9) {
          special = "Casts Light on Command";
          item.value += 500;
        } else if (sRoll <= 11) {
          special = "Charm Person";
          item.value += 1000;
        } else if (sRoll <= 12) {
          special = "Drains Energy";
          item.value += 4000;
        } else if (sRoll <= 16) {
          special = "Flames on Command";
          item.value += 2000;
        } else if (sRoll <= 19) {
          special = "Locate Objects";
          item.value += 1000;
        } else {
          special = Math.floor(Math.random() * 4 + 1) + " Wishes";
          item.value += 25000;
        }
      }
    }
    item.name = type + " " + bonus;
    if (special) item.name += ", " + special;
    if (quantity > 1) item.name += ", " + quantity + " count";
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
    if (roll <= 9) item.name = "Leather Armor";
    else if (roll <= 28) item.name = "Chain Mail";
    else if (roll <= 43) item.name = "Plate Mail";
    else item.name = "Shield";

    // Determine enchantment or curse
    const bRoll = Math.floor(Math.random() * 100) + 1;
    if (bRoll <= 50) item.name += "+1";
    else if (bRoll <= 80) item.name += "+2";
    else if (bRoll <= 90) item.name += "+3";
    else if (bRoll <= 95) item.name = "Cursed -1";
    else item.name = "Cursed AC 11";
  }

  /**
   * Generates a magic potion.
   * @param {number} roomId - Room identifier.
   * @param {Array} roomList - Room list.
   * @param {Cavern} cavern - Cavern generator.
   */
  static potion(roomId, roomList, cavern) {
    const potions = [
      "Clairaudience",
      "Clairvoyance",
      "Cold Resistance",
      "Control Animal",
      "Control Dragon",
      "Control Giant",
      "Control Human",
      "Control Plant",
      "Control Undead",
      "Delusion",
      "Diminution",
      "ESP",
      "Fire Resistance",
      "Flying",
      "Gaseous Form",
      "Giant Strength",
      "Growth",
      "Healing",
      "Heroism",
      "Invisibility",
      "Invulnerability",
      "Levitation",
      "Longevity",
      "Poison",
      "Polymorph Self",
      "Speed",
      "Treasure Finding",
    ];
    const item = Item.generate(roomId, roomList);
    item.name = "Potion of " + Dice.chooseOne(potions);
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
    if (roll <= 3) item.name = "Cleric Spell Scroll (1 Spell)";
    else if (roll <= 6) item.name = "Cleric Spell Scroll (2 Spells)";
    else if (roll <= 8) item.name = "Cleric Spell Scroll (3 Spells)";
    else if (roll <= 9) item.name = "Cleric Spell Scroll (4 Spells)";
    else if (roll <= 15) item.name = "Magic-User Spell Scroll (1 Spell)";
    else if (roll <= 20) item.name = "Magic-User Spell Scroll (2 Spells)";
    else if (roll <= 25) item.name = "Magic-User Spell Scroll (3 Spells)";
    else if (roll <= 29) item.name = "Magic-User Spell Scroll (4 Spells)";
    else if (roll <= 32) item.name = "Magic-User Spell Scroll (5 Spells)";
    else if (roll <= 34) item.name = "Magic-User Spell Scroll (6 Spells)";
    else if (roll <= 35) item.name = "Magic-User Spell Scroll (7 Spells)";
    else if (roll <= 40) item.name = "Cursed Scroll";
    else if (roll <= 46) item.name = "Protection from Elementals";
    else if (roll <= 56) item.name = "Protection from Lycanthropes";
    else if (roll <= 61) item.name = "Protection from Magic";
    else if (roll <= 75) item.name = "Protection from Undead";
    else if (roll <= 85) item.name = "Map to Treasure Type A";
    else if (roll <= 89) item.name = "Map to Treasure Type E";
    else if (roll <= 92) item.name = "Map to Treasure Type G";
    else item.name = "Map to 1d4 Magic Items";
  }

  /**
   * Generates a magic ring.
   * @param {number} roomId - Room identifier.
   * @param {Array} roomList - Room list.
   */
  static ring(roomId, roomList) {
    const item = Item.generate(roomId, roomList);
    let name = "Ring of ";
    const roll = Math.floor(Math.random() * 100) + 1;
    // Determine specific ring type
    if (roll <= 6) name += "Control Animal";
    else if (roll <= 12) name += "Control Human";
    else if (roll <= 19) name += "Control Plant";
    else if (roll <= 30) name += "Delusion";
    else if (roll <= 33) name += "Djinni Summoning";
    else if (roll <= 44) name += "Fire Resistance";
    else if (roll <= 57) name += "Invisibility";
    else if (roll <= 66) name += "Protection +1";
    else if (roll <= 70) name += "Protection +2";
    else if (roll <= 71) name += "Protection +3";
    else if (roll <= 73) name += "Regeneration";
    else if (roll <= 75) name += "Spell Storing";
    else if (roll <= 81) name += "Spell Turning";
    else if (roll <= 83) name += "Telekinesis";
    else if (roll <= 90) name += "Water Walking";
    else if (roll <= 97) name += "Weakness";
    else if (roll <= 98) name += "Wishes";
    else name += "X-Ray Vision";
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
    if (roll <= 8) item.name = "Rod of Cancellation";
    else if (roll <= 13) item.name = "Snake Staff";
    else if (roll <= 17) item.name = "Staff of Commanding";
    else if (roll <= 28) item.name = "Staff of Healing";
    else if (roll <= 30) item.name = "Staff of Power";
    else if (roll <= 34) item.name = "Staff of Striking";
    else if (roll <= 35) item.name = "Staff of Wizardry";
    else if (roll <= 40) item.name = "Wand of Cold";
    else if (roll <= 45) item.name = "Wand of Enemy Detection";
    else if (roll <= 50) item.name = "Wand of Fear";
    else if (roll <= 55) item.name = "Wand of Fireballs";
    else if (roll <= 60) item.name = "Wand of Illusion";
    else if (roll <= 65) item.name = "Wand of Lightning Bolts";
    else if (roll <= 73) item.name = "Wand of Magic Detection";
    else if (roll <= 79) item.name = "Wand of Paralyzation";
    else if (roll <= 84) item.name = "Wand of Polymorph";
    else if (roll <= 92) item.name = "Wand of Secret Door Detection";
    else item.name = "Wand of Trap Detection";
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
    if (roll <= 4) item.name = "Amulet of Proof against Detection and Location";
    else if (roll <= 6) item.name = "Bag of Devouring";
    else if (roll <= 12) item.name = "Bag of Holding";
    else if (roll <= 17) item.name = "Boots of Levitation";
    else if (roll <= 22) item.name = "Boots of Speed";
    else if (roll <= 27) item.name = "Boots of Traveling and Leaping";
    else if (roll <= 28) item.name = "Bowl Commanding Water Elementals";
    else if (roll <= 29) item.name = "Brazier Commanding Fire Elementals";
    else if (roll <= 35) item.name = "Broom of Flying";
    else if (roll <= 36) item.name = "Censer Commanding Air Elementals";
    else if (roll <= 39) item.name = "Cloak of Displacement";
    else if (roll <= 43) item.name = "Crystal Ball";
    else if (roll <= 45) item.name = "Crystal Ball with Clairaudience";
    else if (roll <= 46) item.name = "Drums of Panic";
    else if (roll <= 47) item.name = "Efreeti Bottle";
    else if (roll <= 54) item.name = "Elven Boots";
    else if (roll <= 61) item.name = "Elven Cloak";
    else if (roll <= 63) item.name = "Flying Carpet";
    else if (roll <= 70) item.name = "Gauntlets of Ogre Power";
    else if (roll <= 72) item.name = "Girdle of Giant Strength";
    else if (roll <= 78) item.name = "Helm of Reading Languages and Magic";
    else if (roll <= 79) item.name = "Helm of Telepathy";
    else if (roll <= 80) item.name = "Helm of Teleportation";
    else if (roll <= 81) item.name = "Horn of Blasting";
    else if (roll <= 82) item.name = "Horn of Doom";
    else if (roll <= 91) item.name = "Medallion of ESP";
    else if (roll <= 92) item.name = "Mirror of Life Trapping";
    else if (roll <= 97) item.name = "Rope of Climbing";
    else if (roll <= 99) item.name = "Scarab of Protection";
    else item.name = "Stone Commanding Earth Elementals";
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
      if (type === "weapons armor") {
        if (roll <= 70) Item.weapon(roomId, roomList, cavern);
        else Item.armor(roomId, roomList);
      } else if (type === "not weapons") {
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
      "Antique",
      "Beaded",
      "Bronze",
      "Copper",
      "Dainty",
      "Decorative",
      "Delicate",
      "Detailed",
      "Elegant",
      "Engraved",
      "Exotic",
      "Feminine",
      "Fine",
      "Garish",
      "Golden",
      "Iron",
      "Masculine",
      "Platinum",
      "Profane",
      "Religious",
      "Shiny",
      "Silver",
      "Tasteless",
      "Polished",
    ];
    const names = [
      "Anklet",
      "Belt",
      "Flagon",
      "Bowl",
      "Goblet",
      "Bracelet",
      "Knife",
      "Brooch",
      "Letter Opener",
      "Buckle",
      "Locket",
      "Chain",
      "Medal",
      "Choker",
      "Necklace",
      "Circlet",
      "Plate",
      "Clasp",
      "Pin",
      "Comb",
      "Sceptre",
      "Crown",
      "Statuette",
      "Cup",
      "Tiara",
      "Headdress",
      "Amulet",
      "Bracer",
      "Figurine",
      "Horn",
      "Box",
    ];
    const decorations = Item.gemsList.concat([
      "Religious Symbols",
      "Profane Symbols",
      "Battle Scenes",
      "a Name",
      "a Face",
      "Animals",
      "Abstract Patterns",
      "a Family Crest",
      "a Star",
      "Angels",
      "Antelopes",
      "an Arrow",
      "an Archer",
      "a Badger",
      "a Bear",
      "Bees",
      "a Devil",
      "Demons",
      "a Knight",
      "a Camel",
      "a Bird",
      "Birds",
      "an Owl",
      "a Comet",
      "an Eagle",
      "a Hawk",
      "a Falcon",
      "a Cross",
      "a Frog",
      "a Fish",
      "a Goose",
      "a Bull",
      "a Horn",
      "a Lion",
      "a Griffin",
      "a Dog",
      "Dogs",
      "a Cat",
      "Scales of Justice",
      "a Sword",
      "an Axe",
      "Lightning",
      "the Sun",
      "the Moon",
      "a Helmet",
      "a Raven",
      "a Fox",
      "a Shark",
      "a Spider",
      "a Stag",
      "a Trident",
      "a Warrior",
      "a Priest",
      "a Mage",
      "a Tree",
      "Skulls",
      "a Skull",
    ]);

    for (let n = 0; n < number; n++) {
      const item = Item.generate(roomId, roomList);
      item.value = Dice.rollSum(2, 8) * 100;
      item.name = "";
      // Randomly prefix with an adjective
      if (Dice.roll(1, 3) === 1) {
        item.name = Dice.chooseOne(adjective) + " ";
      }
      item.name += Dice.chooseOne(names);
      // Randomly add decoration details
      if (Dice.roll(1, 3) === 1) {
        item.name += " Decorated with " + Dice.chooseOne(decorations);
      }
      item.name += " (" + item.value.toLocaleString() + " gp)";
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
        if (Dice.p(75))
          Item.coins("cp", Dice.rollSum(1, 8) * 100, roomId, roomList);
        if (Dice.p(50))
          Item.coins("sp", Dice.rollSum(1, 6) * 100, roomId, roomList);
        if (Dice.p(25))
          Item.coins("ep", Dice.rollSum(1, 4) * 100, roomId, roomList);
        if (Dice.p(7))
          Item.coins("gp", Dice.rollSum(1, 4) * 100, roomId, roomList);
        if (Dice.p(1))
          Item.coins("pp", Dice.rollSum(1, 4) * 100, roomId, roomList);
        if (Dice.p(7)) Item.gems(Dice.roll(1, 4), roomId, roomList, cavern);
        if (Dice.p(3)) Item.jewelry(Dice.roll(1, 4), roomId, roomList, cavern);
        if (Dice.p(2)) Item.magic(1, "any", roomId, roomList, cavern);
        break;
      case 2:
        if (Dice.p(50))
          Item.coins("cp", Dice.rollSum(1, 10) * 100, roomId, roomList);
        if (Dice.p(50))
          Item.coins("sp", Dice.rollSum(1, 8) * 100, roomId, roomList);
        if (Dice.p(25))
          Item.coins("ep", Dice.rollSum(1, 6) * 100, roomId, roomList);
        if (Dice.p(20))
          Item.coins("gp", Dice.rollSum(1, 6) * 100, roomId, roomList);
        if (Dice.p(2))
          Item.coins("pp", Dice.rollSum(1, 4) * 100, roomId, roomList);
        if (Dice.p(10)) Item.gems(Dice.roll(1, 6), roomId, roomList, cavern);
        if (Dice.p(7)) Item.jewelry(Dice.roll(1, 4), roomId, roomList, cavern);
        if (Dice.p(5)) Item.magic(1, "any", roomId, roomList, cavern);
        break;
      case 3:
        if (Dice.p(30))
          Item.coins("cp", Dice.rollSum(2, 6) * 100, roomId, roomList);
        if (Dice.p(50))
          Item.coins("sp", Dice.rollSum(1, 10) * 100, roomId, roomList);
        if (Dice.p(25))
          Item.coins("ep", Dice.rollSum(1, 8) * 100, roomId, roomList);
        if (Dice.p(50))
          Item.coins("gp", Dice.rollSum(1, 6) * 100, roomId, roomList);
        if (Dice.p(4))
          Item.coins("pp", Dice.rollSum(1, 4) * 100, roomId, roomList);
        if (Dice.p(15)) Item.gems(Dice.roll(1, 6), roomId, roomList, cavern);
        if (Dice.p(7)) Item.jewelry(Dice.roll(1, 6), roomId, roomList, cavern);
        if (Dice.p(8)) Item.magic(1, "any", roomId, roomList, cavern);
        break;
      case 4:
      case 5:
        if (Dice.p(20))
          Item.coins("cp", Dice.rollSum(3, 6) * 100, roomId, roomList);
        if (Dice.p(50))
          Item.coins("sp", Dice.rollSum(2, 6) * 100, roomId, roomList);
        if (Dice.p(25))
          Item.coins("ep", Dice.rollSum(1, 10) * 100, roomId, roomList);
        if (Dice.p(50))
          Item.coins("gp", Dice.rollSum(2, 6) * 100, roomId, roomList);
        if (Dice.p(8))
          Item.coins("pp", Dice.rollSum(1, 4) * 100, roomId, roomList);
        if (Dice.p(20)) Item.gems(Dice.roll(1, 8), roomId, roomList, cavern);
        if (Dice.p(10)) Item.jewelry(Dice.roll(1, 6), roomId, roomList, cavern);
        if (Dice.p(12)) Item.magic(1, "any", roomId, roomList, cavern);
        break;
      case 6:
      case 7:
        if (Dice.p(15))
          Item.coins("cp", Dice.rollSum(4, 6) * 100, roomId, roomList);
        if (Dice.p(50))
          Item.coins("sp", Dice.rollSum(3, 6) * 100, roomId, roomList);
        if (Dice.p(25))
          Item.coins("ep", Dice.rollSum(1, 12) * 100, roomId, roomList);
        if (Dice.p(70))
          Item.coins("gp", Dice.rollSum(2, 8) * 100, roomId, roomList);
        if (Dice.p(15))
          Item.coins("pp", Dice.rollSum(1, 4) * 100, roomId, roomList);
        if (Dice.p(30)) Item.gems(Dice.roll(1, 8), roomId, roomList, cavern);
        if (Dice.p(15)) Item.jewelry(Dice.roll(1, 6), roomId, roomList, cavern);
        if (Dice.p(16)) Item.magic(1, "any", roomId, roomList, cavern);
        break;
      default:
        if (Dice.p(10))
          Item.coins("cp", Dice.rollSum(5, 6) * 100, roomId, roomList);
        if (Dice.p(50))
          Item.coins("sp", Dice.rollSum(5, 6) * 100, roomId, roomList);
        if (Dice.p(25))
          Item.coins("ep", Dice.rollSum(2, 8) * 100, roomId, roomList);
        if (Dice.p(75))
          Item.coins("gp", Dice.rollSum(4, 6) * 100, roomId, roomList);
        if (Dice.p(30))
          Item.coins("pp", Dice.rollSum(1, 4) * 100, roomId, roomList);
        if (Dice.p(40)) Item.gems(Dice.roll(1, 8), roomId, roomList, cavern);
        if (Dice.p(30)) Item.jewelry(Dice.roll(1, 8), roomId, roomList, cavern);
        if (Dice.p(20)) Item.magic(1, "any", roomId, roomList, cavern);
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
      case "A":
        if (Dice.p(50))
          Item.coins("cp", Dice.rollSum(5, 6) * 100, roomId, roomList);
        if (Dice.p(60))
          Item.coins("sp", Dice.rollSum(5, 6) * 100, roomId, roomList);
        if (Dice.p(40))
          Item.coins("ep", Dice.rollSum(5, 4) * 100, roomId, roomList);
        if (Dice.p(70))
          Item.coins("gp", Dice.rollSum(10, 6) * 100, roomId, roomList);
        if (Dice.p(50))
          Item.coins("pp", Dice.rollSum(1, 10) * 100, roomId, roomList);
        if (Dice.p(50)) Item.gems(Dice.roll(6, 6), roomId, roomList, cavern);
        if (Dice.p(50)) Item.jewelry(Dice.roll(6, 6), roomId, roomList, cavern);
        if (Dice.p(30)) Item.magic(3, "any", roomId, roomList, cavern);
        break;
      case "B":
        if (Dice.p(75))
          Item.coins("cp", Dice.rollSum(5, 10) * 100, roomId, roomList);
        if (Dice.p(50))
          Item.coins("sp", Dice.rollSum(5, 6) * 100, roomId, roomList);
        if (Dice.p(50))
          Item.coins("ep", Dice.rollSum(5, 4) * 100, roomId, roomList);
        if (Dice.p(50))
          Item.coins("gp", Dice.rollSum(3, 6) * 100, roomId, roomList);
        if (Dice.p(25)) Item.gems(Dice.roll(1, 6), roomId, roomList, cavern);
        if (Dice.p(25)) Item.jewelry(Dice.roll(1, 6), roomId, roomList, cavern);
        if (Dice.p(10))
          Item.magic(3, "weapons armor", roomId, roomList, cavern);
        break;
      case "C":
        if (Dice.p(60))
          Item.coins("cp", Dice.rollSum(6, 6) * 100, roomId, roomList);
        if (Dice.p(60))
          Item.coins("sp", Dice.rollSum(5, 4) * 100, roomId, roomList);
        if (Dice.p(30))
          Item.coins("ep", Dice.rollSum(2, 6) * 100, roomId, roomList);
        if (Dice.p(25)) Item.gems(Dice.roll(1, 4), roomId, roomList, cavern);
        if (Dice.p(25)) Item.jewelry(Dice.roll(1, 4), roomId, roomList, cavern);
        if (Dice.p(15))
          Item.magic(
            Math.floor(Math.random() * 2 + 1),
            "any",
            roomId,
            roomList,
            cavern,
          );
        break;
      case "D":
        if (Dice.p(30))
          Item.coins("cp", Dice.rollSum(4, 6) * 100, roomId, roomList);
        if (Dice.p(45))
          Item.coins("sp", Dice.rollSum(6, 6) * 100, roomId, roomList);
        if (Dice.p(90))
          Item.coins("gp", Dice.rollSum(5, 8) * 100, roomId, roomList);
        if (Dice.p(30)) Item.gems(Dice.roll(1, 8), roomId, roomList, cavern);
        if (Dice.p(30)) Item.jewelry(Dice.roll(1, 8), roomId, roomList, cavern);
        if (Dice.p(20)) {
          Item.magic(
            Math.floor(Math.random() * 2 + 1),
            "any",
            roomId,
            roomList,
            cavern,
          );
          Item.potion(roomId, roomList, cavern);
        }
        break;
      case "E":
        if (Dice.p(30))
          Item.coins("cp", Dice.rollSum(2, 8) * 100, roomId, roomList);
        if (Dice.p(60))
          Item.coins("sp", Dice.rollSum(6, 10) * 100, roomId, roomList);
        if (Dice.p(50))
          Item.coins("ep", Dice.rollSum(3, 8) * 100, roomId, roomList);
        if (Dice.p(50))
          Item.coins("gp", Dice.rollSum(4, 10) * 100, roomId, roomList);
        if (Dice.p(10)) Item.gems(Dice.roll(1, 10), roomId, roomList, cavern);
        if (Dice.p(10))
          Item.jewelry(Dice.roll(1, 10), roomId, roomList, cavern);
        if (Dice.p(30)) {
          Item.magic(
            Math.floor(Math.random() * 4 + 1),
            "any",
            roomId,
            roomList,
            cavern,
          );
          Item.scroll(roomId, roomList);
        }
        break;
      case "F":
        if (Dice.p(40))
          Item.coins("sp", Dice.rollSum(3, 8) * 100, roomId, roomList);
        if (Dice.p(50))
          Item.coins("ep", Dice.rollSum(4, 8) * 100, roomId, roomList);
        if (Dice.p(85))
          Item.coins("gp", Dice.rollSum(6, 10) * 100, roomId, roomList);
        if (Dice.p(70))
          Item.coins("pp", Dice.rollSum(2, 8) * 100, roomId, roomList);
        if (Dice.p(20)) Item.gems(Dice.roll(2, 12), roomId, roomList, cavern);
        if (Dice.p(10))
          Item.jewelry(Dice.roll(1, 12), roomId, roomList, cavern);
        if (Dice.p(35)) {
          Item.magic(
            Math.floor(Math.random() * 4 + 1),
            "not weapons",
            roomId,
            roomList,
            cavern,
          );
          Item.potion(roomId, roomList, cavern);
          Item.scroll(roomId, roomList);
        }
        break;
      case "G":
        if (Dice.p(90))
          Item.coins("gp", Dice.rollSum(4, 6) * 1000, roomId, roomList);
        if (Dice.p(75))
          Item.coins("pp", Dice.rollSum(5, 8) * 100, roomId, roomList);
        if (Dice.p(25)) Item.gems(Dice.roll(3, 6), roomId, roomList, cavern);
        if (Dice.p(25))
          Item.jewelry(Dice.roll(1, 10), roomId, roomList, cavern);
        if (Dice.p(50)) {
          Item.magic(
            Math.floor(Math.random() * 4 + 1),
            "any",
            roomId,
            roomList,
            cavern,
          );
          Item.scroll(roomId, roomList);
        }
        break;
      case "H":
        if (Dice.p(75))
          Item.coins("cp", Dice.rollSum(8, 10) * 100, roomId, roomList);
        if (Dice.p(75))
          Item.coins("sp", Dice.rollSum(6, 10) * 1000, roomId, roomList);
        if (Dice.p(75))
          Item.coins("ep", Dice.rollSum(3, 10) * 1000, roomId, roomList);
        if (Dice.p(75))
          Item.coins("gp", Dice.rollSum(5, 8) * 1000, roomId, roomList);
        if (Dice.p(75))
          Item.coins("pp", Dice.rollSum(9, 8) * 100, roomId, roomList);
        if (Dice.p(50)) Item.gems(Dice.roll(1, 100), roomId, roomList, cavern);
        if (Dice.p(50))
          Item.jewelry(Dice.roll(10, 4), roomId, roomList, cavern);
        if (Dice.p(20)) {
          Item.magic(
            Math.floor(Math.random() * 4 + 1),
            "any",
            roomId,
            roomList,
            cavern,
          );
          Item.potion(roomId, roomList, cavern);
          Item.scroll(roomId, roomList);
        }
        break;
      case "I":
        if (Dice.p(80))
          Item.coins("pp", Dice.rollSum(3, 10) * 100, roomId, roomList);
        if (Dice.p(50)) Item.gems(Dice.roll(2, 6), roomId, roomList, cavern);
        if (Dice.p(50)) Item.jewelry(Dice.roll(2, 6), roomId, roomList, cavern);
        if (Dice.p(15)) Item.magic(1, "any", roomId, roomList, cavern);
        break;
      case "J":
        if (Dice.p(45))
          Item.coins("cp", Dice.rollSum(3, 8) * 100, roomId, roomList);
        if (Dice.p(45))
          Item.coins("sp", Dice.rollSum(1, 8) * 100, roomId, roomList);
        break;
      case "K":
        if (Dice.p(90))
          Item.coins("sp", Dice.rollSum(2, 10) * 100, roomId, roomList);
        if (Dice.p(35))
          Item.coins("ep", Dice.rollSum(1, 8) * 100, roomId, roomList);
        break;
      case "L":
        if (Dice.p(50)) Item.gems(Dice.roll(1, 4), roomId, roomList, cavern);
        break;
      case "M":
        if (Dice.p(90))
          Item.coins("gp", Dice.rollSum(4, 10) * 100, roomId, roomList);
        if (Dice.p(90))
          Item.coins("pp", Dice.rollSum(2, 8) * 1000, roomId, roomList);
        if (Dice.p(55)) Item.gems(Dice.roll(5, 4), roomId, roomList, cavern);
        if (Dice.p(45)) Item.jewelry(Dice.roll(1, 6), roomId, roomList, cavern);
        break;
      case "N":
        if (Dice.p(40)) {
          for (let i = Dice.rollSum(2, 4); i > 0; i--)
            Item.potion(roomId, roomList, cavern);
        }
        break;
      case "O":
        if (Dice.p(50)) {
          for (let i = Math.floor(Math.random() * 4 + 1); i > 0; i--)
            Item.scroll(roomId, roomList);
        }
        break;
      case "P":
        Item.coins("cp", Dice.rollSum(3, 8) * 100, roomId, roomList);
        break;
      case "Q":
        Item.coins("sp", Dice.rollSum(3, 6) * 100, roomId, roomList);
        break;
      case "R":
        Item.coins("ep", Dice.rollSum(2, 6) * 100, roomId, roomList);
        break;
      case "S":
        Item.coins("gp", Dice.rollSum(2, 4) * 100, roomId, roomList);
        break;
      case "T":
        Item.coins("pp", Dice.rollSum(1, 6) * 100, roomId, roomList);
        break;
      case "U":
        if (Dice.p(50))
          Item.coins("cp", Dice.rollSum(1, 20) * 100, roomId, roomList);
        if (Dice.p(50))
          Item.coins("sp", Dice.rollSum(1, 20) * 100, roomId, roomList);
        if (Dice.p(25))
          Item.coins("gp", Dice.rollSum(1, 20) * 100, roomId, roomList);
        if (Dice.p(5))
          Item.gems(
            Math.floor(Math.random() * 4 + 1),
            roomId,
            roomList,
            cavern,
          );
        if (Dice.p(5))
          Item.jewelry(
            Math.floor(Math.random() * 4 + 1),
            roomId,
            roomList,
            cavern,
          );
        if (Dice.p(2)) Item.magic(1, "any", roomId, roomList, cavern);
        break;
      case "V":
        if (Dice.p(25))
          Item.coins("sp", Dice.rollSum(1, 20) * 100, roomId, roomList);
        if (Dice.p(25))
          Item.coins("ep", Dice.rollSum(1, 20) * 100, roomId, roomList);
        if (Dice.p(50))
          Item.coins("gp", Dice.rollSum(1, 20) * 100, roomId, roomList);
        if (Dice.p(25))
          Item.coins("pp", Dice.rollSum(1, 20) * 100, roomId, roomList);
        if (Dice.p(10))
          Item.gems(
            Math.floor(Math.random() * 4 + 1),
            roomId,
            roomList,
            cavern,
          );
        if (Dice.p(10))
          Item.jewelry(
            Math.floor(Math.random() * 4 + 1),
            roomId,
            roomList,
            cavern,
          );
        if (Dice.p(5)) Item.magic(1, "any", roomId, roomList, cavern);
        break;
    }
  }

  /**
   * Generates random junk items in a room.
   * @param {number} roomId - Room identifier.
   * @param {Array} roomList - Room list.
   */
  static makeJunk(roomId, roomList) {
    const roll = Dice.roll(1, 100);
    let count = 1;
    if (roll <= 50) {
      count = 1;
    } else if (roll <= 75) {
      count = Dice.roll(1, 6);
    } else {
      count = Dice.rollSum(2, 6);
    }

    for (let i = 0; i < count; i++) {
      const item = Item.generate(roomId, roomList);
      let name = Dice.chooseOne(Item.junkList);
      name = name.replace(/\{([^}]+)\}/g, (match, expr) =>
        Dice.computeRoll(expr),
      );
      item.name = name;
      item.value = 0;
    }
  }
}
