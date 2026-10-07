import { Cavern } from "./Cavern.js";
import { Room } from "./Room.js";
import { Passage } from "./Passage.js";
import { Monster } from "./Monster.js";
import { Npc } from "./Npc.js";
import { Item } from "./Item.js";

export class Manual {
  /**
   * Generates HTML markup for a monster stat block and hit point checkboxes.
   * @param {Monster} monster - Monster instance.
   * @returns {string} HTML string.
   */
  static getMonsterBlock(monster) {
    let html = '<div class="coc-monster-block">';
    let header = "<strong>";
    // Format monster count header if appearing count > 1
    if (monster.appearing > 1) {
      header += monster.appearing + " ";
    }
    header += monster.name;
    if (monster.appearing > 1) {
      header += "s";
    }
    header += ":</strong>";
    header += monster.statBlock.replace(monster.name + ":", "");
    html += "<p>" + header + "</p>";

    let maxHp = 0;
    let hpLines = [];
    // Build hit point tracking boxes for each individual monster
    for (let i = 0; i < monster.appearing; i++) {
      const hpVal = monster.hp[i];
      if (hpVal > maxHp) maxHp = hpVal;
      const hp = hpVal + " hp";
      let boxes = "";
      for (let h = 1; h <= hpVal; h++) {
        boxes += "▢";
        if (h % 5 === 0) boxes += " ";
      }
      hpLines.push(
        '<div class="coc-hp-item"><code>' +
          hp +
          ' <span class="coc-hp-boxes">' +
          boxes +
          "</span></code></div>",
      );
    }

    // Determine CSS column layout based on max hit points
    let colClass = "coc-hp-cols-2";
    if (maxHp < 6) {
      colClass = "coc-hp-cols-4";
    } else if (maxHp <= 10) {
      colClass = "coc-hp-cols-3";
    }

    html +=
      '<div class="coc-hp-columns ' +
      colClass +
      '">' +
      hpLines.join("") +
      "</div>";
    html += "</div>";
    return html;
  }

  /**
   * Generates HTML markup for an NPC character record.
   * @param {Npc} npc - NPC instance.
   * @returns {string} HTML string.
   */
  static getNpcBlock(npc) {
    let html = '<div class="coc-npc-block">';
    let header =
      "<strong>" +
      npc.name +
      ", " +
      npc.race +
      " " +
      npc.className +
      " " +
      npc.level +
      ":</strong> ";
    header +=
      "AC " +
      npc.ac +
      ", AB +" +
      npc.ab +
      ", #At " +
      npc.at +
      ", Dam " +
      npc.dam +
      ", Mv " +
      npc.mv +
      ", ML " +
      npc.ml +
      ", XP " +
      npc.xp;
    html += "<p>" + header + "</p>";

    const primeAttr = Npc.primeMap[npc.className] || "DEX";
    const modVal =
      npc.stats[primeAttr + "_mod"] !== undefined
        ? npc.stats[primeAttr + "_mod"]
        : npc.stats.DEX_mod;
    const scoreVal =
      npc.stats[primeAttr] !== undefined ? npc.stats[primeAttr] : npc.stats.DEX;
    let attrStr =
      primeAttr +
      " " +
      scoreVal +
      " (" +
      (modVal >= 0 ? "+" : "") +
      modVal +
      ")";
    html += "<p>" + attrStr + "</p>";

    if (npc.spells && npc.spells.length > 0) {
      html += "<p><strong>Spells:</strong> " + npc.spells.join(", ") + "</p>";
    }

    let eqStr =
      npc.equipment && npc.equipment.length > 0
        ? npc.equipment.join(", ")
        : "none";
    html += "<p><strong>Equipment:</strong> " + eqStr + "</p>";

    let boxes = "";
    for (let h = 1; h <= npc.hp; h++) {
      boxes += "☐";
      if (h % 5 === 0) boxes += " ";
    }
    html +=
      '<div class="coc-hp-item"><code>HP ' +
      npc.hp +
      ' <span class="coc-hp-boxes">' +
      boxes +
      "</span></code></div>";

    html += "</div>";
    return html;
  }

  /**
   * Formats a door description according to the specified template.
   * @param {string} type - Door type.
   * @param {string} location - Door location.
   * @param {boolean} isOpen - Whether door is open.
   * @param {string} opening - Opening direction.
   * @param {string} hinges - Hinge placement.
   * @param {number} targetRoomId - Target room number.
   * @param {number} length - Passage length.
   * @param {number} passageLight - Passage light level.
   * @returns {string} Formatted door description.
   */
  static getDoorDescription(
    type,
    location,
    isOpen = false,
    opening = "into the room",
    hinges = "east",
    targetRoomId = 1,
    length = 10,
    passageLight = 0,
  ) {
    const t = String(type).toLowerCase();
    const typeWords = type
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    const wallWords = location
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    let lightStr = "dark";
    if (passageLight > 0.1 && passageLight <= 0.9) lightStr = "dim";
    else if (passageLight > 0.9) lightStr = "lighted";

    if (t === "open doorway") {
      return `${typeWords} (${wallWords}): Leads to Room ${targetRoomId} via ${length}′ ${lightStr} passage.`;
    }

    const state = t === "secret door" ? "Closed" : isOpen ? "Open" : "Closed";
    const dir = String(opening).toLowerCase().includes("in") ? "in" : "out";
    const hingeSide = String(hinges).toLowerCase();

    return `${typeWords} (${wallWords}): ${state}. Leads to Room ${targetRoomId} via ${length}′ ${lightStr} passage. Swings ${dir}, hinges ${hingeSide}.`;
  }

  /**
   * Generates the complete adventure manual HTML for a dungeon level.
   * @param {number} level - Dungeon level.
   * @returns {string} HTML adventure manual.
   */
  static getHtml(level) {
    let html = "<h2>Level " + level + "</h2>";

    // Render Wandering Monsters section if present
    if (Cavern.wanderingMonsters && Cavern.wanderingMonsters.length > 0) {
      html +=
        "<h3>Wandering Monsters d" + Cavern.wanderingMonsters.length + "</h3>";
      html += "<ol>";
      Cavern.wanderingMonsters.forEach((entry, key) => {
        let desc = "";
        if (
          entry instanceof Monster ||
          (entry && entry.name && entry.statBlock) ||
          entry.isNpc
        ) {
          if (entry.room !== null && entry.room !== undefined) {
            const room = window.cocRoomList[entry.room];
            desc =
              entry.name + " from Room " + (room.id + 1) + ". " + room.name;
          } else {
            desc = entry.isNpc
              ? Manual.getNpcBlock(entry)
              : Manual.getMonsterBlock(entry);
            window.cocMonsterList.forEach((m) => {
              if (m.parent === entry.id) {
                desc += m.isNpc
                  ? Manual.getNpcBlock(m)
                  : Manual.getMonsterBlock(m);
              }
            });
          }
        } else {
          desc = entry;
        }
        html += "<li>" + desc + "</li>";
      });
      html += "</ol>";
    }

    // Render detailed Room entries section
    window.cocRoomList.forEach((room) => {
      html += '<div class="coc-room-entry">';
      html += "<h4>" + (room.id + 1) + ". " + room.name + "</h4>";
      if (room.trapped) {
        html += "<p><strong>Trapped:</strong> " + room.trap + "</p>";
      }
      html += "<p>" + room.description + "</p>";

      // Append room contents summary
      html += "<p><strong>Contents:</strong> ";
      const list = [];
      if (room.contents && room.contents.length > 0) {
        room.contents.forEach((itemId) => {
          const item = window.cocItemList[itemId];
          if (item) list.push(item.name);
        });
      }
      html += (list.length > 0 ? list.join(", ") + "." : "empty.") + "</p>";

      // Append room exits and passage details
      html += "<p><strong>Exits:</strong></p><ul>";
      room.outlets.forEach((passageId) => {
        const passage = window.cocPassageList[passageId];
        if (!passage) return;
        let exit = "";
        const targetRoomNum =
          passage.start === room.id ? passage.end + 1 : passage.start + 1;
        const doorType =
          passage.start === room.id ? passage.startDoor : passage.endDoor;
        const location =
          passage.start === room.id
            ? passage.startLocation
            : passage.endLocation;
        const isOpen =
          passage.start === room.id
            ? passage.startDoorOpen
            : passage.endDoorOpen;
        const opening =
          passage.start === room.id
            ? passage.startDoorOpening
            : passage.endDoorOpening;
        const hinges =
          passage.start === room.id
            ? passage.startDoorHinges
            : passage.endDoorHinges;

        exit = Manual.getDoorDescription(
          doorType,
          location,
          isOpen,
          opening,
          hinges,
          targetRoomNum,
          passage.length,
          passage.light,
        );
        if (passage.trapped) {
          exit += " -- Trapped: " + passage.trap;
        }
        html += "<li>" + exit + "</li>";
      });
      html += "</ul>";

      // Append monster blocks present in the room
      if (room.monsters && room.monsters.length > 0) {
        room.monsters.forEach((monsterId) => {
          const monster = window.cocMonsterList[monsterId];
          if (monster) {
            if (monster.isNpc) {
              html += Manual.getNpcBlock(monster);
            } else {
              html += Manual.getMonsterBlock(monster);
            }
          }
        });
      }

      html += "</div><hr/>";
    });

    return html;
  }
}
