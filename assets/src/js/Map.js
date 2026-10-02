import cytoscape from 'cytoscape';
import { Passage } from './Passage.js';

export class Map {
    /**
     * Renders the interactive topological cavern map using Cytoscape.js.
     * @param {HTMLElement} container - DOM container element.
     * @returns {Object} The Cytoscape instance.
     */
    static render(container, lvlData = null) {
        const elements = [];

        // Build graph nodes for each room with lighting and dimension styling
        window.cocRoomList.forEach(room => {
            const shade = Math.floor(room.light * 255);
            const fillcolor = `rgb(${shade}, ${shade}, ${shade})`;
            const color = room.light < 0.5 ? 'gray' : 'black';
            let fontcolor = 'black';
            if (room.light <= 0.25) fontcolor = 'white';
            else if (room.light < 0.5) fontcolor = 'gray';

            elements.push({
                data: {
                    id: 'Room' + room.id,
                    label: (room.id + 1) + '. ' + room.name + '\n' + room.width + '′×' + room.depth + '′×' + room.height + '′',
                    fillcolor: fillcolor,
                    color: color,
                    fontcolor: fontcolor
                }
            });
        });

        // Build graph edges for each passage connecting rooms
        window.cocPassageList.forEach(passage => {
            if (passage.end === null) return;
            const shade = Math.floor(passage.light * 255);
            const edgeColor = `rgb(${Math.floor(shade * 0.75)}, ${Math.floor(shade * 0.75)}, 0)`;

            elements.push({
                data: {
                    source: 'Room' + passage.start,
                    target: 'Room' + passage.end,
                    label: passage.length + '′',
                    length: passage.length,
                    startArrow: Passage.getArrow(passage.startDoor),
                    endArrow: Passage.getArrow(passage.endDoor),
                    color: edgeColor
                }
            });
        });

        // Clear container and initialize Cytoscape graph renderer
        container.innerHTML = '';
        if (container && !container.getBoundingClientRect) {
            container.getBoundingClientRect = () => ({
                width: container.clientWidth || 800,
                height: container.clientHeight || 600,
                top: 0,
                left: 0
            });
        }
        const cy = cytoscape({
            container: (container && container.clientWidth && !process.env.VITEST) ? container : undefined,
            headless: !!process.env.VITEST || !(container && container.clientWidth),
            elements: elements,
            style: [
                {
                    selector: 'node',
                    style: {
                        'content': 'data(label)',
                        'text-wrap': 'wrap',
                        'text-valign': 'center',
                        'text-halign': 'center',
                        'background-color': 'data(fillcolor)',
                        'border-color': 'data(color)',
                        'border-width': 3,
                        'color': 'data(fontcolor)',
                        'font-size': '32px',
                        'font-family': 'sans-serif',
                        'shape': 'rectangle',
                        'width': '350px',
                        'height': '124px',
                        'padding': '10px',
                        'text-max-width': '400px'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'content': 'data(label)',
                        'font-size': '32px',
                        'color': '#666',
                        'text-background-color': '#fff',
                        'text-background-opacity': 0.8,
                        'text-background-padding': '2px',
                        'line-color': 'data(color)',
                        'width': 2,
                        'source-arrow-shape': 'data(startArrow)',
                        'target-arrow-shape': 'data(endArrow)',
                        'source-arrow-color': 'data(color)',
                        'target-arrow-color': 'data(color)',
                        'arrow-scale': 6,
                        'curve-style': 'bezier'
                    }
                }
            ]
        });

        // Resize and run layout simulation or apply saved custom positions
        cy.resize();
        if (lvlData && lvlData.hasCustomPositions && lvlData.nodePositions && Object.keys(lvlData.nodePositions).length > 0) {
            cy.batch(() => {
                cy.nodes().forEach(node => {
                    if (lvlData.nodePositions[node.id()]) {
                        node.position(lvlData.nodePositions[node.id()]);
                    }
                });
            });
            cy.fit(undefined, 50);
        } else {
            cy.layout({
                name: 'breadthfirst',
                directed: false,
                roots: '#Room0',
                spacingFactor: 1.8,
                avoidOverlap: true,
                padding: 24,
                fit: true,
                nodeDimensionsIncludeLabels: true
            }).run();

            if (lvlData) {
                if (!lvlData.nodePositions) {
                    lvlData.nodePositions = {};
                }
                cy.nodes().forEach(node => {
                    lvlData.nodePositions[node.id()] = node.position();
                });
            }
        }

        if (lvlData) {
            const updatePositions = function() {
                lvlData.hasCustomPositions = true;
                if (!lvlData.nodePositions) {
                    lvlData.nodePositions = {};
                }
                cy.nodes().forEach(node => {
                    lvlData.nodePositions[node.id()] = node.position();
                });
            };

            cy.on('free', 'node', updatePositions);
            cy.on('dragfree', 'node', updatePositions);
        }

        return cy;
    }
}
