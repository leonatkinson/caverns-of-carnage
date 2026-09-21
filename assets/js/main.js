import { Cavern } from './Cavern.js';
import { Map } from './Map.js';
import { Manual } from './Manual.js';

window.initCavernsOfCarnage = function(container) {
    if (!container) return;

    const generateBtn = container.querySelector('.coc-generate-btn');
    const downloadBtn = container.querySelector('.coc-download-btn');
    const outputDiv = container.querySelector('.coc-output');
    const tabsDiv = container.querySelector('.coc-level-tabs');
    const mapDiv = container.querySelector('.coc-cytoscape-view');
    const manualDiv = container.querySelector('.coc-manual-text');

    if (!generateBtn) return;

    let allGeneratedLevels = [];

    generateBtn.addEventListener('click', function() {
        const startLevel = parseInt(container.querySelector('.coc-start-level').value, 10) || 1;
        const numLevels = parseInt(container.querySelector('.coc-num-levels').value, 10) || 1;

        allGeneratedLevels = [];
        tabsDiv.innerHTML = '';

        const tempContainer = document.createElement('div');
        tempContainer.style.width = '1200px';
        tempContainer.style.height = '800px';
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        document.body.appendChild(tempContainer);

        for (let i = 0; i < numLevels; i++) {
            const currentLevelNum = startLevel + i;
            const cavern = new Cavern(currentLevelNum);
            cavern.make(currentLevelNum);

            const roomListCopy = JSON.parse(JSON.stringify(window.cocRoomList));
            const passageListCopy = JSON.parse(JSON.stringify(window.cocPassageList));
            const monsterListCopy = JSON.parse(JSON.stringify(window.cocMonsterList));
            const itemListCopy = JSON.parse(JSON.stringify(window.cocItemList));
            const wanderingMonstersCopy = [...Cavern.wanderingMonsters];

            window.cocRoomList = roomListCopy;
            window.cocPassageList = passageListCopy;
            window.cocMonsterList = monsterListCopy;
            window.cocItemList = itemListCopy;
            Cavern.wanderingMonsters = wanderingMonstersCopy;

            const cy = Map.render(tempContainer);
            const mapPng = cy.png({ output: 'base64', bg: '#ffffff', scale: 2, full: true });

            allGeneratedLevels.push({
                level: currentLevelNum,
                roomList: roomListCopy,
                passageList: passageListCopy,
                monsterList: monsterListCopy,
                itemList: itemListCopy,
                wanderingMonsters: wanderingMonstersCopy,
                mapPng: mapPng
            });
        }

        document.body.removeChild(tempContainer);

        outputDiv.style.display = 'block';
        if (downloadBtn) {
            downloadBtn.style.display = 'inline-block';
        }

        allGeneratedLevels.forEach((lvlData, index) => {
            const tabBtn = document.createElement('button');
            tabBtn.type = 'button';
            tabBtn.className = 'coc-tab-btn' + (index === 0 ? ' active' : '');
            tabBtn.textContent = 'Level ' + lvlData.level;
            tabBtn.addEventListener('click', function() {
                container.querySelectorAll('.coc-tab-btn').forEach(b => b.classList.remove('active'));
                tabBtn.classList.add('active');
                renderLevel(lvlData);
            });
            tabsDiv.appendChild(tabBtn);
        });

        if (allGeneratedLevels.length > 0) {
            renderLevel(allGeneratedLevels[0]);
        }
    });

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            if (!allGeneratedLevels || allGeneratedLevels.length === 0) return;

            let htmlDoc = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">';
            htmlDoc += '<head><meta charset="utf-8"><title>Caverns of Carnage Adventure Manual</title>';
            htmlDoc += '<style>';
            htmlDoc += 'body { font-family: Arial, sans-serif; line-height: 1.6; color: #000000; }';
            htmlDoc += 'h1 { page-break-before: always; text-align: center; font-size: 24px; margin-top: 40px; }';
            htmlDoc += 'h1:first-child { page-break-before: avoid; }';
            htmlDoc += 'h2, h3, h4 { color: #1d2327; }';
            htmlDoc += '.map-page { text-align: center; page-break-after: always; margin-top: 30px; }';
            htmlDoc += '.map-page img { width: 100%; max-width: 800px; aspect-ratio: 8.5 / 11; height: auto; object-fit: contain; border: 1px solid #ccc; }';
            htmlDoc += '.coc-hp-boxes { font-family: monospace; letter-spacing: 2px; color: #000000; }';
            htmlDoc += '.coc-hp-columns { margin: 6px 0; }';
            htmlDoc += '.coc-hp-cols-4 { column-count: 4; column-gap: 12px; }';
            htmlDoc += '.coc-hp-cols-3 { column-count: 3; column-gap: 12px; }';
            htmlDoc += '.coc-hp-cols-2 { column-count: 2; column-gap: 12px; }';
            htmlDoc += '.coc-hp-item { break-inside: avoid; page-break-inside: avoid; line-height: 1.3; margin-bottom: 2px; }';
            htmlDoc += '</style></head><body>';

            allGeneratedLevels.forEach(lvlData => {
                window.cocRoomList = lvlData.roomList;
                window.cocPassageList = lvlData.passageList;
                window.cocMonsterList = lvlData.monsterList;
                window.cocItemList = lvlData.itemList;
                Cavern.wanderingMonsters = lvlData.wanderingMonsters;

                htmlDoc += '<h1>Level ' + lvlData.level + ' Map</h1>';
                const imgSrc = lvlData.mapPng.startsWith('data:') ? lvlData.mapPng : ('data:image/png;base64,' + lvlData.mapPng);
                htmlDoc += '<div class="map-page"><img src="' + imgSrc + '" alt="Level ' + lvlData.level + ' Map" /></div>';
                htmlDoc += '<div style="page-break-before:always;"></div>';
                htmlDoc += '<h1>Level ' + lvlData.level + ' - Adventure Manual</h1>';
                htmlDoc += Manual.getHtml(lvlData.level);
                htmlDoc += '<div style="page-break-before:always;"></div>';
            });

            htmlDoc += '</body></html>';

            const blob = new Blob(['\ufeff' + htmlDoc], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Caverns-of-Carnage-Adventure.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    function renderLevel(lvlData) {
        window.cocRoomList = lvlData.roomList;
        window.cocPassageList = lvlData.passageList;
        window.cocMonsterList = lvlData.monsterList;
        window.cocItemList = lvlData.itemList;
        Cavern.wanderingMonsters = lvlData.wanderingMonsters;

        outputDiv.style.display = 'block';
        setTimeout(() => {
            Map.render(mapDiv);
            manualDiv.innerHTML = Manual.getHtml(lvlData.level);
        }, 50);
    }
};
