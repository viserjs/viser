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
    }
  },
  zoom: {
    min: 1,
    max: 10,
  },
}).render();

