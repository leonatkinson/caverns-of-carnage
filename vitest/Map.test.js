import { describe, it, expect } from 'vitest';
import { Map } from '../assets/src/js/Map.js';

describe('Map', () => {
  it('renders map with custom positions and triggers drag events', () => {
    if (typeof HTMLCanvasElement !== 'undefined') {
      HTMLCanvasElement.prototype.getContext = () => ({
        fillRect: () => {}, clearRect: () => {}, getImageData: () => ({ data: [] }),
        putImageData: () => {}, createImageData: () => [], setTransform: () => {},
        drawImage: () => {}, save: () => {}, fillText: () => {}, restore: () => {},
        beginPath: () => {}, moveTo: () => {}, lineTo: () => {}, closePath: () => {},
        stroke: () => {}, translate: () => {}, scale: () => {}, rotate: () => {},
        arc: () => {}, fill: () => {}, measureText: () => ({ width: 0 }),
        transform: () => {}, rect: () => {}, clip: () => {}
      });
    }

    const container = document.createElement('div');
    container.style.width = '800px';
    container.style.height = '600px';
    document.body.appendChild(container);

    window.cocRoomList = [
      { id: 0, name: 'Room 1', light: 0.5, width: 30, depth: 30, height: 10, description: 'Desc' },
      { id: 1, name: 'Room 2', light: 0.8, width: 20, depth: 20, height: 10, description: 'Desc2' }
    ];
    window.cocPassageList = [
      { start: 0, end: 1, light: 0.5, length: 20, startDoor: 'door', endDoor: 'door' }
    ];

    const lvlData = {
      hasCustomPositions: true,
      nodePositions: {
        Room0: { x: 0, y: 0 },
        Room1: { x: 100, y: 100 }
      }
    };

    const cy = Map.render(container, lvlData);
    expect(cy).toBeDefined();

    const node = cy.$('#Room0');
    node.emit('free');
    expect(lvlData.hasCustomPositions).toBe(true);

    document.body.removeChild(container);
  });
});
