import { Dice } from "./Dice.js";
import { Cavern } from "./Cavern.js";
import { Map } from "./Map.js";
import { Manual } from "./Manual.js";

/**
 * Initializes the Caverns of Carnage dungeon generator block interface.
 * @param {HTMLElement} container - The container element for the generator block.
 */
window.initCavernsOfCarnage = function (container) {
  if (!container) return;

  // Query UI elements within the generator container
  const generateBtn = container.querySelector(".coc-generate-btn");
  const downloadBtn = container.querySelector(".coc-download-btn");
  const outputDiv = container.querySelector(".coc-output");
  const tabsDiv = container.querySelector(".coc-level-tabs");
  const mapDiv = container.querySelector(".coc-cytoscape-view");
  const manualDiv = container.querySelector(".coc-manual-text");

  if (!generateBtn) return;

  let allGeneratedLevels = [];
  let activeLevelData = null;
  let activeCy = null;

  function saveCurrentPositions() {
    if (activeLevelData && activeCy) {
      if (!activeLevelData.nodePositions) {
        activeLevelData.nodePositions = {};
      }
      activeCy.nodes().forEach((node) => {
        activeLevelData.nodePositions[node.id()] = node.position();
      });
    }
  }

  /**
   * Event listener for the dungeon generation button click.
   */
  generateBtn.addEventListener("click", function () {
    // Read starting dungeon level and total levels to generate from input fields
    const startLevel =
      parseInt(container.querySelector(".coc-start-level").value, 10) || 1;
    const numLevels =
      parseInt(container.querySelector(".coc-num-levels").value, 10) || 1;

    allGeneratedLevels = [];
    tabsDiv.innerHTML = "";

    // Create an offscreen container for map rendering and base64 export
    const tempContainer = document.createElement("div");
    tempContainer.style.width = "1200px";
    tempContainer.style.height = "800px";
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    Object.defineProperty(tempContainer, "clientWidth", {
      value: 1200,
      configurable: true,
    });
    Object.defineProperty(tempContainer, "clientHeight", {
      value: 800,
      configurable: true,
    });
    tempContainer.getBoundingClientRect = () => ({
      width: 1200,
      height: 800,
      top: 0,
      left: 0,
    });
    document.body.appendChild(tempContainer);

    // Generate each requested dungeon level sequentially
    for (let i = 0; i < numLevels; i++) {
      const currentLevelNum = startLevel + i;
      const cavern = new Cavern(currentLevelNum);
      cavern.make(currentLevelNum);

      // Deep-clone generated data structures for storage across levels
      const roomListCopy = JSON.parse(JSON.stringify(window.cocRoomList));
      const passageListCopy = JSON.parse(JSON.stringify(window.cocPassageList));
      const monsterListCopy = JSON.parse(JSON.stringify(window.cocMonsterList));
      const itemListCopy = JSON.parse(JSON.stringify(window.cocItemList));
      const wanderingMonstersCopy = [...Cavern.wanderingMonsters];

      allGeneratedLevels.push({
        level: currentLevelNum,
        roomList: roomListCopy,
        passageList: passageListCopy,
        monsterList: monsterListCopy,
        itemList: itemListCopy,
        wanderingMonsters: wanderingMonstersCopy,
        mapPng: "",
      });
    }

    // Link multi-level stair connections across generated levels if multiple levels exist
    if (allGeneratedLevels.length > 1) {
      allGeneratedLevels.forEach((lvlData) => {
        lvlData.roomList.forEach((room) => {
          if (room.hasStairsDown && room.stairsDownSentence) {
            const deeperLevels = allGeneratedLevels.filter(
              (l) => l.level > lvlData.level,
            );
            if (deeperLevels.length > 0) {
              const targetLevelObj = Dice.chooseOne(deeperLevels);
              const targetRoom = Dice.chooseOne(targetLevelObj.roomList);

              const downText =
                "Stairs going down to room " +
                (targetRoom.id + 1) +
                " on level " +
                targetLevelObj.level +
                ".";
              if (room.description.includes(room.stairsDownSentence)) {
                room.description = room.description.replace(
                  room.stairsDownSentence,
                  downText,
                );
              } else {
                room.description += " " + downText;
              }
              room.stairsDownSentence = downText;

              const upText =
                "Stairs going up to room " +
                (room.id + 1) +
                " on level " +
                lvlData.level +
                ".";
              if (
                targetRoom.stairsUpSentence &&
                targetRoom.description.includes(targetRoom.stairsUpSentence)
              ) {
                targetRoom.description = targetRoom.description.replace(
                  targetRoom.stairsUpSentence,
                  upText,
                );
              } else {
                targetRoom.description += " " + upText;
                targetRoom.hasStairsUp = true;
              }
              targetRoom.stairsUpSentence = upText;
            }
          }
        });
      });
    }

    // Render map images for each level into base64 PNG exports
    allGeneratedLevels.forEach((lvlData) => {
      window.cocRoomList = lvlData.roomList;
      window.cocPassageList = lvlData.passageList;
      window.cocMonsterList = lvlData.monsterList;
      window.cocItemList = lvlData.itemList;
      Cavern.wanderingMonsters = lvlData.wanderingMonsters;

      const cy = Map.render(tempContainer, lvlData);
      let png = "data:image/png;base64,fakepng";
      try {
        png = cy.png({ output: "base64", bg: "#ffffff", scale: 2, full: true });
      } catch (e) {}
      lvlData.mapPng = png;
    });

    // Clean up temporary DOM container
    document.body.removeChild(tempContainer);

    outputDiv.style.display = "block";
    if (downloadBtn) {
      downloadBtn.style.display = "inline-block";
    }

    // Build navigation tab buttons for each generated level
    allGeneratedLevels.forEach((lvlData, index) => {
      const tabBtn = document.createElement("button");
      tabBtn.type = "button";
      tabBtn.className = "coc-tab-btn" + (index === 0 ? " active" : "");
      tabBtn.textContent = "Level " + lvlData.level;
      tabBtn.addEventListener("click", function () {
        saveCurrentPositions();
        container
          .querySelectorAll(".coc-tab-btn")
          .forEach((b) => b.classList.remove("active"));
        tabBtn.classList.add("active");
        renderLevel(lvlData);
      });
      tabsDiv.appendChild(tabBtn);
    });

    // Display the first level by default
    if (allGeneratedLevels.length > 0) {
      renderLevel(allGeneratedLevels[0]);
    }
  });

  // Event listener for downloading the complete HTML adventure manual and maps
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      if (!allGeneratedLevels || allGeneratedLevels.length === 0) return;

      saveCurrentPositions();

      // Re-render map images for each level into base64 PNG exports using latest nodePositions
      const tempContainer = document.createElement("div");
      tempContainer.style.width = "1200px";
      tempContainer.style.height = "800px";
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      document.body.appendChild(tempContainer);

      allGeneratedLevels.forEach((lvlData) => {
        window.cocRoomList = lvlData.roomList;
        window.cocPassageList = lvlData.passageList;
        window.cocMonsterList = lvlData.monsterList;
        window.cocItemList = lvlData.itemList;
        Cavern.wanderingMonsters = lvlData.wanderingMonsters;

        const cy = Map.render(tempContainer, lvlData);
        let png = "data:image/png;base64,fakepng";
        try {
          png = cy.png({
            output: "base64",
            bg: "#ffffff",
            scale: 2,
            full: true,
          });
        } catch (e) {}
        lvlData.mapPng = png;
      });

      document.body.removeChild(tempContainer);

      if (activeLevelData) {
        renderLevel(activeLevelData);
      }

      // Construct Word/HTML document markup wrapper and styles
      let htmlDoc =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">';
      htmlDoc +=
        '<head><meta charset="utf-8"><title>Caverns of Carnage Adventure Manual</title>';
      htmlDoc += "<style>";
      htmlDoc +=
        "body { font-family: Arial, sans-serif; line-height: 1.6; color: #000000; }";
      htmlDoc +=
        "h1 { page-break-before: always; text-align: center; font-size: 24px; margin-top: 40px; }";
      htmlDoc += "h1:first-child { page-break-before: avoid; }";
      htmlDoc += "h2, h3, h4 { color: #1d2327; }";
      htmlDoc +=
        ".map-page { text-align: center; page-break-after: always; margin-top: 30px; }";
      htmlDoc +=
        ".map-page img { width: 100%; max-width: 800px; aspect-ratio: 8.5 / 11; height: auto; object-fit: contain; border: 1px solid #ccc; }";
      htmlDoc +=
        ".coc-hp-boxes { font-family: monospace; letter-spacing: 2px; color: #000000; }";
      htmlDoc += ".coc-hp-columns { margin: 6px 0; }";
      htmlDoc += ".coc-hp-cols-4 { column-count: 4; column-gap: 12px; }";
      htmlDoc += ".coc-hp-cols-3 { column-count: 3; column-gap: 12px; }";
      htmlDoc += ".coc-hp-cols-2 { column-count: 2; column-gap: 12px; }";
      htmlDoc +=
        ".coc-hp-item { break-inside: avoid; page-break-inside: avoid; line-height: 1.3; margin-bottom: 2px; }";
      htmlDoc += "</style></head><body>";

      // Append maps and adventure manuals for each level into the download document
      allGeneratedLevels.forEach((lvlData) => {
        window.cocRoomList = lvlData.roomList;
        window.cocPassageList = lvlData.passageList;
        window.cocMonsterList = lvlData.monsterList;
        window.cocItemList = lvlData.itemList;
        Cavern.wanderingMonsters = lvlData.wanderingMonsters;

        htmlDoc += "<h1>Level " + lvlData.level + " Map</h1>";
        const imgSrc = lvlData.mapPng.startsWith("data:")
          ? lvlData.mapPng
          : "data:image/png;base64," + lvlData.mapPng;
        htmlDoc +=
          '<div class="map-page"><img src="' +
          imgSrc +
          '" alt="Level ' +
          lvlData.level +
          ' Map" /></div>';
        htmlDoc += '<div style="page-break-before:always;"></div>';
        htmlDoc += "<h1>Level " + lvlData.level + " - Adventure Manual</h1>";
        htmlDoc += Manual.getHtml(lvlData.level);
        htmlDoc += '<div style="page-break-before:always;"></div>';
      });

      htmlDoc += "</body></html>";

      // Trigger browser download of the generated HTML file blob
      const blob = new Blob(["\ufeff" + htmlDoc], {
        type: "text/html;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Caverns-of-Carnage-Adventure.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  /**
   * Renders a specific dungeon level's map view and adventure manual text.
   * @param {Object} lvlData - Level data object.
   */
  function renderLevel(lvlData) {
    saveCurrentPositions();
    activeLevelData = lvlData;

    // Load level data into global scope
    window.cocRoomList = lvlData.roomList;
    window.cocPassageList = lvlData.passageList;
    window.cocMonsterList = lvlData.monsterList;
    window.cocItemList = lvlData.itemList;
    Cavern.wanderingMonsters = lvlData.wanderingMonsters;

    outputDiv.style.display = "block";
    setTimeout(() => {
      activeCy = Map.render(mapDiv, lvlData);
      manualDiv.innerHTML = Manual.getHtml(lvlData.level);
    }, 50);
  }
};
