import { ViserGraph } from '../../../packages/viser-graph/src/index';
import { oriData } from './data'

const refreshDragedNodePosition = (e) => {
  const model = e.item.get('model');
  model.fx = e.x;
  model.fy = e.y;
}

const data = {
  nodes: oriData.nodes.map(function(node, i) {
    return {...node, size: Math.random() * 30 + 5 };
  }),
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
      preventOverlap: true
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
