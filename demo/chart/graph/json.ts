import { ViserGraph } from '../../../packages/viser-graph/src';
const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 200
  },{
    id: 'node2',
    x: 300,
    y: 200
  }],
  edges: [{
    id: 'edge1',
    target: 'node2',
    source: 'node1'
  }]
};
var lastPoint = void 0;

new ViserGraph({
  graph: {
    container: 'mount',
    width: 500,
    height: 500,
    fitView: 'cc',
    fitViewPadding: true,
    animate: true,
    type: 'graph',
  },
  data,
  events: {
    onClick: function(ev, graph) {
      console.log('click', ev, graph);
    },
    onDragstart: (ev, graph) => {
      graph.css({
        cursor: '-webkit-grabbing'
      });
    },
    onDrag: (ev, graph) => {
      if (lastPoint) {
        graph.translate(ev.domX - lastPoint.x, ev.domY - lastPoint.y);
      }
      lastPoint = {
        x: ev.domX,
        y: ev.domY
      };
    },
    onDragend:(ev, graph) => {
      lastPoint = undefined;
      graph.css({
        cursor: '-webkit-grab'
      });
    }
  },
  zoom: {
    min: 1,
    max: 10,
    current: 0.5,
  },
}).render();

