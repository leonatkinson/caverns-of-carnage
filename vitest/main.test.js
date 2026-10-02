import { describe, it, expect } from 'vitest';
import '../assets/src/js/main.js';

describe('main', () => {
  it('initializes caverns of carnage block interface and handles generation and download', () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <form class="coc-form">
        <input type="number" class="coc-start-level" value="1" />
        <input type="number" class="coc-num-levels" value="2" />
        <button type="button" class="coc-generate-btn">Generate</button>
        <button type="button" class="coc-download-btn" style="display:none;"></button>
      </form>
      <div class="coc-output" style="display:none;">
        <div class="coc-level-tabs"></div>
        <div class="coc-level-content">
          <div class="coc-cytoscape-view" style="width: 800px; height: 600px;"></div>
          <div class="coc-manual-text"></div>
        </div>
      </div>
    `;
    document.body.appendChild(container);

    if (typeof HTMLCanvasElement !== 'undefined') {
      HTMLCanvasElement.prototype.getContext = () => ({
        fillRect: () => {}, clearRect: () => {}, getImageData: () => ({ data: [] }),
        putImageData: () => {}, createImageData: () => [], setTransform: () => {},
        drawImage: () => {}, save: () => {}, fillText: () => {}, restore: () => {},
        beginPath: () => {}, moveTo: () => {}, lineTo: () => {}, closePath: () => {},
        stroke: () => {}, translate: () => {}, scale: () => {}, rotate: () => {},
        arc: () => {}, fill: () => {}, measureText: () => ({ width: 0 }),
        transform: () => {}, rect: () => {}, clip: () => {},
        toDataURL: () => 'data:image/png;base64,fakepng'
      });
    }

    window.initCavernsOfCarnage(container);

    const generateBtn = container.querySelector('.coc-generate-btn');
    const downloadBtn = container.querySelector('.coc-download-btn');

    generateBtn.click();
    expect(container.querySelector('.coc-output').style.display).toBe('block');

    const tabBtn = container.querySelector('.coc-tab-btn');
    if (tabBtn) tabBtn.click();

    downloadBtn.click();

    document.body.removeChild(container);
  });

  it('generates multi-level dungeons with stairs and tabs', () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <form class="coc-form">
        <input type="number" class="coc-start-level" value="1" />
        <input type="number" class="coc-num-levels" value="3" />
        <button type="button" class="coc-generate-btn">Generate</button>
        <button type="button" class="coc-download-btn" style="display:none;"></button>
      </form>
      <div class="coc-output" style="display:none;">
        <div class="coc-level-tabs"></div>
        <div class="coc-level-content">
          <div class="coc-cytoscape-view" style="width: 800px; height: 600px;"></div>
          <div class="coc-manual-text"></div>
        </div>
      </div>
    `;
    document.body.appendChild(container);

    window.initCavernsOfCarnage(container);

    const generateBtn = container.querySelector('.coc-generate-btn');
    generateBtn.click();

    const tabs = container.querySelectorAll('.coc-tab-btn');
    expect(tabs.length).toBe(3);

    tabs[1].click();
    tabs[2].click();

    document.body.removeChild(container);
  });
});
