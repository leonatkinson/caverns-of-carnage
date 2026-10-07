import { Dice } from "./Dice.js";
import { Room } from "./Room.js";
import { Passage } from "./Passage.js";
import { Monster } from "./Monster.js";
import { Item } from "./Item.js";

export class Cavern {
  /**
   * Initializes a new cavern instance for a given dungeon level.
   * @param {number} level - The dungeon level number.
   */
  constructor(level = 1) {
    // Initialize global list containers for rooms, passages, monsters, and items
    window.cocRoomList = [];
    window.cocPassageList = [];
    window.cocMonsterList = [];
    window.cocItemList = [];

    Cavern.level = level;
    Cavern.wanderingMonsters = [];
  }

  /**
   * Generates a complete cavern dungeon level layout.
   * @param {number} level - Dungeon level.
   */
  make(level = 1) {
    Cavern.level = level;
    Cavern.wanderingMonsters = [];

    // Generate the initial entrance room
    Room.generate(level, this);
    const targetRooms = 2 + Dice.roll(1, 30, 3);

    // Configure the entrance room settings and initial outlet passage
    let room = window.cocRoomList[0];
    room.name = "Entrance";
    const passage = Passage.generate(room.id, level, window.cocRoomList, this);
    room.outlets.push(passage.id);

    // Iteratively expand the dungeon rooms and passages until target count is met
    let loop = 1000000;
    while (loop && window.cocRoomList.length < targetRooms) {
      room.alter(level, this);
      let moved = false;
      for (const passageId of room.outlets) {
        const pass = window.cocPassageList[passageId];
        if (pass.end === null) {
          room = Room.generate(level, this);
          room.outlets.push(passageId);
          pass.end = room.id;
          moved = true;
        }
      }
      if (!moved) {
        room = window.cocRoomList[Dice.roll(0, window.cocRoomList.length - 1)];
      }
      loop--;
    }

    // Clean up any dangling passages that failed to connect to a room
    for (const passageId in window.cocPassageList) {
      const pass = window.cocPassageList[passageId];
      if (pass.end === null) {
        delete window.cocPassageList[passageId];
      }
    }

    // Propagate lighting from lighted passages into dark rooms
    window.cocRoomList.forEach((r) => {
      if (r.light > 0) return;
      r.outlets.forEach((passageId) => {
        const pass = window.cocPassageList[passageId];
        if (pass && pass.light > 0) {
          r.light += 0.25;
          if (r.light > 1) r.light = 1;
        }
      });
    });

    // Assign descriptive names to rooms based on traps, monsters, or contents
    window.cocRoomList.forEach((r) => {
      if (r.name === "Entrance") return;
      let name = "";
      let purpose = null;
      if (r.trapped) name += "Trapped ";
      if (Dice.p(50)) {
        purpose = Room.purpose(this);
        name += purpose;
      } else if (r.monsters.length > 0) {
        const monster = window.cocMonsterList[r.monsters[0]];
        name += monster.name + " Area";
      } else if (r.contents.length > 0) {
        const item = window.cocItemList[r.contents[0]];
        name += "Room with " + item.name;
      } else {
        name += "Room";
      }
      r.name = name;
      r.purpose = purpose;

      if (purpose) {
        const purposedItems = Item.getItemsByPurpose(purpose);
        for (const itemName of purposedItems) {
          const item = Item.generate(r.id, window.cocRoomList);
          item.name = itemName;
          item.value = 0;
        }
      }
    });

    // Check lighting exception for dark rooms with open doors/doorways leading to well-lit passages
    window.cocRoomList.forEach((r) => {
      if (r.light === 0) {
        for (const passageId of r.outlets) {
          const pass = window.cocPassageList[passageId];
          if (!pass || pass.light <= 0.9) continue;
          const isStart = pass.start === r.id;
          const doorType = isStart ? pass.startDoor : pass.endDoor;
          const location = isStart ? pass.startLocation : pass.endLocation;
          const isOpen = isStart ? pass.startDoorOpen : pass.endDoorOpen;

          const t = String(doorType).toLowerCase();
          const isOpenDoorway = t === "open doorway";
          const isOpenDoor =
            isOpen &&
            t !== "secret door" &&
            t !== "open doorway" &&
            t !== "none";

          if (isOpenDoorway || isOpenDoor) {
            const noun = isOpenDoorway ? "open doorway" : "door";
            r.description = r.description.replace(
              " The room is dark.",
              ` The room has no light source except for the dim light coming in from the ${noun} on the ${location}.`,
            );
            break;
          }
        }
      }
    });

    // Populate wandering monsters table for this cavern level
    const tableSizeChoices = [0, 4, 6, 8, 10, 12, 20];
    const tableSize = Dice.chooseOne(tableSizeChoices);
    const usedMonsters = [];
    for (let m = 0; m < tableSize; m++) {
      const rollVal = Dice.roll(1, 10);
      if (rollVal <= 5) {
        const monster = Monster.makeMonsterByLevel(
          null,
          Cavern.level,
          window.cocRoomList,
          this,
        );
        Cavern.wanderingMonsters.push(monster);
        usedMonsters.push(monster.id);
      } else if (rollVal <= 9) {
        const monsterId = Dice.roll(0, window.cocMonsterList.length - 1);
        let monster;
        if (
          usedMonsters.includes(monsterId) ||
          !window.cocMonsterList[monsterId]
        ) {
          monster = Monster.makeMonsterByLevel(
            null,
            Cavern.level,
            window.cocRoomList,
            this,
          );
        } else {
          monster = window.cocMonsterList[monsterId];
        }
        Cavern.wanderingMonsters.push(monster);
        usedMonsters.push(monster.id);
      } else {
        Cavern.wanderingMonsters.push(this.getEvent());
      }
    }

    // Cache the generated level data for multi-level tracking
    if (!window.cocGeneratedLevels) {
      window.cocGeneratedLevels = [];
    }
    window.cocGeneratedLevels = window.cocGeneratedLevels.filter(
      (l) => l.level < level,
    );
    window.cocGeneratedLevels.push({
      level: level,
      roomList: JSON.parse(JSON.stringify(window.cocRoomList)),
      monsterList: JSON.parse(JSON.stringify(window.cocMonsterList)),
    });
  }

  /**
   * Generates a random environmental event description.
   * @returns {string} The event text.
   */
  getEvent() {
    // Return a randomly selected environmental event description
    const events = [
      "An earthquake rumbles from below, causing small stones to drop from above.",
      "Water rushes through the chamber, rising to 2d6 inches, then recedes.",
      "Water falls from the ceiling, drenching everything.",
      "Sulfrous gas burns noses then passes.",
      "Air blows strongly for 1d6 minutes then subsides.",
      "The unmistakable sound of one of the monsters in the area echoes through the chamber.",
      "The sound of a distant gong is heard. The next 1d6 rolls made by the PCs automatically fail.",
      "The tinkle of bells skitters through the chamber. The next 1d6 rolls made by the PCs automatically succeed.",
    ];
    return Dice.chooseOne(events);
  }
}
