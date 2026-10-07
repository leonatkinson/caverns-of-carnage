import { Dice } from "./Dice.js";
import { Passage } from "./Passage.js";
import { Monster } from "./Monster.js";
import { Npc } from "./Npc.js";
import { Item } from "./Item.js";
import { Trap } from "./Trap.js";
import { Cavern } from "./Cavern.js";

export class Room {
  /**
   * Initializes a new room instance with default parameters.
   */
  constructor() {
    this.id = 0;
    this.name = "Room";
    this.purpose = null;
    this.description = "";
    this.outlets = [];
    this.width = 0;
    this.depth = 0;
    this.height = 0;
    this.light = 0;
    this.trapped = false;
    this.trap = "";
    this.monsters = [];
    this.contents = [];
    this.hasStairsDown = false;
    this.stairsDownSentence = "";
    this.hasStairsUp = false;
    this.stairsUpSentence = "";
  }

  /**
   * Generates a new room with randomized dimensions, lighting, stairs, monsters, and treasure.
   * @param {number} level - Dungeon level.
   * @param {Cavern} cavern - Cavern generator instance.
   * @returns {Room} The generated room.
   */
  static generate(level, cavern) {
    // Ensure global room list array exists
    if (!window.cocRoomList) window.cocRoomList = [];
    const r = new Room();
    r.id = window.cocRoomList.length;

    // Roll randomized dimensions and height for the room
    r.width = Math.max(5, Math.round(Dice.roll(5, 50) / 5) * 5);
    r.depth = Math.max(5, Math.round(Dice.roll(5, 50) / 5) * 5);
    r.height = Math.max(5, Math.round(Dice.roll(4, 12, 4) / 5) * 5);

    // Determine room lighting level (dark, dim, or bright)
    const light = Dice.roll(1, 100);
    if (light <= 50) r.light = 0;
    else if (light <= 75) r.light = 0.5;
    else r.light = 1;

    window.cocRoomList[r.id] = r;

    // Build base description string with dimensions
    r.description =
      "The room is " +
      r.width +
      "&prime;&times;" +
      r.depth +
      "&prime; with a " +
      r.height +
      "&prime; ceiling.";

    // Random chance for stairs leading down or up
    if (Dice.p(10)) {
      r.hasStairsDown = true;
      r.stairsDownSentence = Room.stairs("down", cavern);
      r.description += " " + r.stairsDownSentence;
    }
    if (Dice.p(10)) {
      r.hasStairsUp = true;
      r.stairsUpSentence = Room.stairs("up", cavern);
      r.description += " " + r.stairsUpSentence;
    }

    // Roll for room contents (monsters, treasure, traps, or empty)
    const roll = Dice.roll(1, 20);
    if (roll <= 12) {
      // Room is empty
    } else if (roll <= 16) {
      if (Dice.p(25)) {
        Npc.makeNpcPartyByLevel(r.id, level, window.cocRoomList, cavern);
      } else {
        Monster.makeMonsterByLevel(r.id, level, window.cocRoomList, cavern);
      }
    } else if (roll <= 18) {
      if (Dice.p(25)) {
        Npc.makeNpcPartyByLevel(r.id, level, window.cocRoomList, cavern);
      } else {
        Monster.makeMonsterByLevel(r.id, level, window.cocRoomList, cavern);
      }
      Item.makeTreasureByLevel(r.id, level, window.cocRoomList, cavern);
    } else if (roll === 19) {
      r.description += " " + Trap.get(cavern);
      r.trapped = true;
    } else {
      Item.makeTreasureByLevel(r.id, level, window.cocRoomList, cavern);
    }

    // Small chance for miscellaneous room feature or extra detail
    if (Dice.roll(1, 20) === 1) {
      r.description += " " + Room.extra(cavern);
    }

    // Level-based chance for an additional trap
    if (Dice.roll(1, 20) <= level) {
      r.trapped = true;
      r.trap = Trap.get(cavern);
    }

    // 25% of rooms will have at least one junk item
    if (Dice.p(25)) {
      Item.makeJunk(r.id, window.cocRoomList);
    }

    return r;
  }

  /**
   * Alters room connections by adding new passages or linking to existing rooms.
   * @param {number} level - Dungeon level.
   * @param {Cavern} cavern - Cavern generator instance.
   */
  alter(level, cavern) {
    // Calculate maximum allowed door capacity based on room perimeter
    const circumference = this.width + this.depth * 2;
    const doorspace = Math.max(4, Math.floor(circumference / 20));
    if (this.outlets.length < doorspace) {
      const chanceOfPassage = Math.floor(100 / (this.outlets.length + 1));
      if (Dice.p(chanceOfPassage)) {
        const passage = Passage.generate(
          this.id,
          level,
          window.cocRoomList,
          cavern,
        );
        this.outlets.push(passage.id);
      }
    }

    // Random chance to create a cross-connection to an existing room
    if (Dice.p(25)) {
      const roomId = Dice.roll(0, window.cocRoomList.length - 1);
      const rejectedRooms = [this.id];
      for (const passageId of this.outlets) {
        const passage = window.cocPassageList[passageId];
        rejectedRooms.push(passage.start);
        if (passage.end !== null) rejectedRooms.push(passage.end);
      }
      if (!rejectedRooms.includes(roomId)) {
        const passage = Passage.generate(
          this.id,
          level,
          window.cocRoomList,
          cavern,
        );
        passage.end = roomId;
        this.outlets.push(passage.id);
        window.cocRoomList[roomId].outlets.push(passage.id);
      }
    }
  }

  /**
   * Generates a descriptive sentence for stairs leading up or down.
   * @param {string} dir - Direction ('up' or 'down').
   * @param {Cavern} cavern - Cavern generator instance.
   * @returns {string} The stairs description.
   */
  static stairs(dir, cavern) {
    const wide = Dice.roll(3, 10, 4) + " foot wide";
    const choices = {};
    choices["A " + wide + " spiral staircase leads " + dir + "."] = 5;
    choices[" " + wide + " stone stairs climb " + dir + ", out of the room."] =
      10;
    choices[
      "A steep " +
        wide +
        " ramp connects this room to " +
        (dir === "up" ? "an upper" : "a lower") +
        " level."
    ] = 5;
    choices[
      "Oversized stairs, 4 foot tall and " + wide + ", go " + dir + " a level."
    ] = 1;
    choices["Severely steep stairs, " + wide + ", lead " + dir + "."] = 2;
    choices["Uneven " + wide + " stairs twist " + dir + " into darkness."] = 2;
    choices["Slippery " + wide + " stone stairs go " + dir + "."] = 2;
    choices[" " + wide + " wooden stairs go " + dir + "."] = 2;
    choices[" " + wide + " rotten wooden stairs go " + dir + "."] = 2;
    choices[
      "Handholds extend below a trapdoor in the " +
        (dir === "up" ? "ceiling" : "floor") +
        "."
    ] = 1;
    choices[
      "A ladder extends below a trapdoor in the " +
        (dir === "up" ? "ceiling" : "floor") +
        "."
    ] = 1;
    choices[
      "Handholds extend below an open hole in the " +
        (dir === "up" ? "ceiling" : "floor") +
        "."
    ] = 1;
    choices[
      "A ladder extends below an open hole in the " +
        (dir === "up" ? "ceiling" : "floor") +
        "."
    ] = 1;
    choices[
      "A smooth shaft in the " +
        (dir === "up" ? "ceiling" : "floor") +
        " stretches beyond vision."
    ] = 1;
    choices[
      "A secure rope dangles through a hole in the " +
        (dir === "up" ? "ceiling" : "floor") +
        "."
    ] = 1;
    choices[
      "A poorly-secured rope dangles through a hole in the " +
        (dir === "up" ? "ceiling" : "floor") +
        "."
    ] = 1;
    choices[
      "Thick roots can be seen growing inside a hole in the " +
        (dir === "up" ? "ceiling" : "floor") +
        "."
    ] = 1;

    return Dice.chooseOneWeighted(choices) + " ";
  }

  /**
   * Generates a random environmental detail or extra feature description for a room.
   * @param {Cavern} cavern - Cavern generator instance.
   * @returns {string} The extra feature description.
   */
  static extra(cavern) {
    // Array of environmental flavor text descriptions
    const description = [
      "Broken parts of adventure gear sprawls, rusting and rotting.",
      "A discarded snake skin drapes over a jagged stone.",
      "Thick spider webs stretch over hollows, sprinkled with web-wrapped prey.",
      "Dueling scorpions crawl from under a rock.",
      "Centipedes rest under a rotting log.",
      "Rat feces dots the floor and crunches underfoot.",
      "Piles of guano collect in various locations.",
      "Flies spin randomly over a decaying corpse crawling with maggots.",
      "Freshly disturbed dust draws attention to numerous floor-level holes.",
      "A ragged rope tied to a stone cascades into a dark hole.",
      "Clean bones are stacked into a pyramid-shaped pile.",
      "Vomit circles a small pile of regurgitated bits.",
      "Sewage leaks from a crack and spreads partway across the floor.",
      "A spyhole allows monitoring of this room. 1 in 6 chance an eye pressed upon the other side.",
      "Flammable oil drips down a wall and pools on the floor.",
      "Soft eggs twitch slightly.",
      "Words and pictures on the walls praise a god or demon.",
      "Words and pictures mark the territory in favor of some faction.",
      "Words and pictures warn of danger elsewhere in the caverns.",
      "A clean path with a faint sheen crosses the chamber.",
      "Water floods the chamber to " + Dice.roll(1, 24) + " inches deep.",
      "Mud covers the chamber floor " + Dice.roll(1, 24) + " inches deep.",
      "Dried blood pools on the floor.",
      "Dried blood was left spattered on a wall.",
      "Patches of fungus grow around the edges of the room.",
      "An artful mural decorates one wall.",
      "Slugs gather in a moist depression.",
      "Cockroaches scitter after any disturbance.",
      "Severed hands are pinned to the wall with iron nails.",
      "Unusually cold air turns each breath into faint plumes of steam.",
      "Icicles hang from the ceiling.",
      "A pool of ice covers part of the floor.",
      "Fog fills the chamber, reducing visibility to 5 feet or less.",
      "Part of the room is magically dark.",
      "Part of the room glows with magical light.",
      "The room is " + Dice.roll(1, 4) * 10 + "F hotter than other areas.",
      "Every 10 minutes, there is a " +
        Dice.roll(1, 4) +
        " in 6 chance a harmless jet of steam or water emerges from a hole in the floor.",
      "Several burial nooks hold mummys or coffins.",
      "Iron pins hold manacles to the wall.",
      "A pile of rusting weapons sits fused into a single mass.",
      "Rotting garbage distributed into piles cascades down to cover most of the floor.",
      "Goblin faces carved into the walls peer into the darkness.",
      "Sharp spikes are driven uniformly into the walls.",
      "A sprung trap holds a lifeless vermin.",
      "A fountain overflows with purple ichor.",
      "The walls of this room are covered in primitive art.",
      "Many unlit candles hold fast in pools of wax.",
      "Moths flutter lazily.",
      "Thin slime covers most room surfaces.",
      "Incomprehensible mumbling is heard when all else is quiet.",
      "The stench of a crypt permeates the air.",
      "The stench of rotting drifts through the air.",
      "A sweet smell lingers.",
      "Stacks of regular stones are discarded here.",
      "A crystalline vein cuts through one wall.",
      "Sulphurous liquid bubbles in a small pool.",
      "Relief carving in faded paint depicts a dramatic scene.",
      "A strong odor of incense hangs in the air.",
      "Fossilized sea creatures protrude from the walls.",
      "A vein of metal slices down one wall.",
    ];
    return Dice.chooseOne(description);
  }

  /**
   * Generates a random room purpose/function descriptor.
   * @param {Cavern} cavern - Cavern generator instance.
   * @returns {string} The purpose description.
   */
  static purpose(cavern) {
    // Array of possible functional room purposes
    const description = [
      "Antechamber",
      "Armory",
      "Audience Chamber",
      "Aviary",
      "Banquet Room",
      "Barracks",
      "Bath",
      "Bedroom",
      "Boudoir",
      "Bestiary",
      "Cell",
      "Chantry",
      "Chapel",
      "Cistern",
      "Classroom",
      "Closet",
      "Conjuring Chamber",
      "Corridor",
      "Court",
      "Crypt",
      "Dining Room",
      "Divination Chamber",
      "Dormitory",
      "Dressing Room",
      "Entry",
      "Vestibule",
      "Gallery",
      "Game Room",
      "Garbage Dump",
      "Guardroom",
      "Hall",
      "Great Hall",
      "Harem Chamber",
      "Kennel",
      "Kitchen",
      "Laboratory",
      "Library",
      "Lounge",
      "Meditation Chamber",
      "Observatory",
      "Office",
      "Pantry",
      "Prison",
      "Animal Pen",
      "Latrine",
      "Reception Room",
      "Refectory",
      "Robing Room",
      "Salon",
      "Shrine",
      "Sitting Room",
      "Smithy",
      "Stable",
      "Storage",
      "Vault",
      "Treasury",
      "Study",
      "Temple",
      "Throne Room",
      "Torture Chamber",
      "Training Room",
      "Trophy Room",
      "Museum",
      "Waiting Room",
      "Well",
      "Workroom",
      "Workshop",
    ];
    return Dice.chooseOne(description);
  }
}
