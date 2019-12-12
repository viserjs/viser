import { ViserGraph } from '../../../packages/viser-graph/src/index';

const oriData = {
  nodes: [{
    id: '0',
    label: '0'
  },
  {
    id: '1',
    label: '1'
  },
  {
    id: '2',
    label: '2'
  },
  {
    id: '3',
    label: '3'
  },
  {
    id: '4',
    label: '4'
  },
  {
    id: '5',
    label: '5'
  },
  {
    id: '6',
    label: '6'
  },
  {
    id: '7',
    label: '7'
  },
  {
    id: '8',
    label: '8'
  },
  {
    id: '9',
    label: '9'
  }],
  edges: [{
    source: '0',
    target: '1'
  },
  {
    source: '0',
    target: '2'
  },
  {
    source: '0',
    target: '3'
  },
  {
    source: '0',
    target: '4'
  },
  {
    source: '0',
    target: '5'
  },
  {
    source: '0',
    target: '7'
  },
  {
    source: '0',
    target: '8'
  },
  {
    source: '0',
    target: '9'
  },
  {
    source: '2',
    target: '3'
  },
  {
    source: '4',
    target: '5'
  },
  {
    source: '4',
    target: '6'
  },
  {
    source: '5',
    target: '6'
  }]
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
      nodeSize: 20
    },
    modes: {
      default: ['drag-node'] 
    },
  },
  node: {
    formatter: node => {
      return {
        label: node.label,
        size: 20,
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
