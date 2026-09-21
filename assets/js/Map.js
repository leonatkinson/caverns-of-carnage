import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';
import { Passage } from './Passage.js';

try {
    cytoscape.use(fcose);
} catch (e) {
    // Fallback if already registered
}

export class Map {
    static render(container) {
        const elements = [];

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

        window.cocPassageList.forEach(passage => {
            if (passage.end === null) return;
            const shade = Math.floor(passage.light * 255);
            const edgeColor = `rgb(${Math.floor(shade * 0.75)}, ${Math.floor(shade * 0.75)}, 0)`;

            elements.push({
                data: {
                    source: 'Room' + passage.start,
                    target: 'Room' + passage.end,
                    label: passage.length + '′',
                    startArrow: Passage.getArrow(passage.startDoor),
                    endArrow: Passage.getArrow(passage.endDoor),
                    color: edgeColor
                }
            });
        });

        container.innerHTML = '';
        const cy = cytoscape({
            container: container,
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
                        'arrow-scale': 1.2,
                        'curve-style': 'bezier'
                    }
                }
            ],
            layout: {
                name: 'fcose',
                animate: false,
                nodeRepulsion: 45000,
                idealEdgeLength: 250,
                uniformNodeDimensions: false,
                nodeDimensionsIncludeLabels: false,
                fit: true,
                padding: 10
            }
        });

        cy.resize();
        cy.fit(null, 30);
        cy.center();

        return cy;
    }
}
