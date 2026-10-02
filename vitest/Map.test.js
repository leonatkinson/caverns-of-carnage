import { describe, it, expect } from 'vitest';
import { Map } from '../assets/src/js/Map.js';

describe('Map', () => {
  it('renders map with cytoscape', () => {
    if (typeof HTMLCanvasElement !== 'undefined') {
      HTMLCanvasElement.prototype.getContext = () => ({
        fillRect: () => {},
        clearRect: () => {},
        getImageData: () => ({ data: [] }),
        putImageData: () => {},
        createImageData: () => [],
        setTransform: () => {},
        drawImage: () => {},
        save: () => {},
        fillText: () => {},
        restore: () => {},
        beginPath: () => {},
        moveTo: () => {},
        lineTo: () => {},
        closePath: () => {},
        stroke: () => {},
        translate: () => {},
        scale: () => {},
        rotate: () => {},
        arc: () => {},
        fill: () => {},
        measureText: () => ({ width: 0 }),
        transform: () => {},
        rect: () => {},
        clip: () => {}
      });
    }

    const container = document.createElement('div');
    container.style.width = '800px';
    container.style.height = '600px';
    document.body.appendChild(container);
    window.cocRoomList = [{ id: 0, name: 'Room 1', light: 0.5, width: 30, depth: 30, height: 10, description: 'Test room' }];
    window.cocPassageList = [];
    const cy = Map.render(container);
    expect(cy).toBeDefined();
    document.body.removeChild(container);
  });
});
