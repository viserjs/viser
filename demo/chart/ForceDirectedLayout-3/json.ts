import { ViserGraph } from '../../../packages/viser-graph/src/index';

const oriData = {
  nodes: [
    { id: 'node0', size: 50 },
    { id: 'node1', size: 30 },
    { id: 'node2', size: 30 },
    { id: 'node3', size: 30 },
    { id: 'node4', size: 30, isLeaf: true },
    { id: 'node5', size: 30, isLeaf: true },
    { id: 'node6', size: 15, isLeaf: true },
    { id: 'node7', size: 15, isLeaf: true },
    { id: 'node8', size: 15, isLeaf: true },
    { id: 'node9', size: 15, isLeaf: true },
    { id: 'node10', size: 15, isLeaf: true },
    { id: 'node11', size: 15, isLeaf: true },
    { id: 'node12', size: 15, isLeaf: true },
    { id: 'node13', size: 15, isLeaf: true },
    { id: 'node14', size: 15, isLeaf: true }
  ],
  edges: [
    { source: 'node0', target: 'node1' },
    { source: 'node0', target: 'node2' },
    { source: 'node0', target: 'node3' },
    { source: 'node0', target: 'node4' },
    { source: 'node0', target: 'node5' },
    { source: 'node1', target: 'node6' },
    { source: 'node1', target: 'node7' },
    { source: 'node2', target: 'node8' },
    { source: 'node2', target: 'node9' },
    { source: 'node2', target: 'node10' },
    { source: 'node2', target: 'node11' },
    { source: 'node2', target: 'node12' },
    { source: 'node2', target: 'node13' },
    { source: 'node3', target: 'node14' },
    { source: 'node3', target: 'node15' },
    { source: 'node3', target: 'node16' }
  ]
};
const refreshDragedNodePosition = (e) => {
  const model = e.item.get('model');
  model.fx = e.x;
  model.fy = e.y;
}

const data = {
  nodes: oriData.nodes,
  edges: oriData.edges.map(function(edge, i) {
    return {...edge, id:'edge' + i };
  })
}
new ViserGraph({
  data,
  graph: {
    container: 'mount',
    type: 'graph',
    width: 500,
    height: 500,
    renderer: 'svg',
    fitView: false,
    layout: {
      type: 'force',
      preventOverlap: true,
      linkDistance: d => {
        if (d.source.id === 'node0') {
          return 100;
        }
        return 30;
      },
      nodeStrength: d => {
        if (d.isLeaf) {
          return -50;
        }
        return -10;
      },
      edgeStrength: d => {
        if (d.source.id === 'node1' || d.source.id === 'node2' || d.source.id === 'node3') {
          return 0.7;
        }
        return 0.1;
      }
    },
  },
  node: {
    formatter: node => {
      return {
        size: node.size,
        color: '#5B8FF9',
        style: {
          lineWidth: 2,
          fill: '#C6E5FF'
        }
      }
    },
    events: {
      onDragstart: (e, graph) => {
        graph.layout()
        refreshDragedNodePosition(e);
      },
      onDrag: (e) => {
        refreshDragedNodePosition(e);
      },
      onDragend: (e) => {
        e.item.get('model').fx = null;
        e.item.get('model').fy = null;
      },
    }
  },
  edge: {
    formatter: () => {
      return {
        size: 1,
        color: '#e2e2e2'
      }
    },
  },
}).render();
