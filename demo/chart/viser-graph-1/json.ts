import { ViserGraph } from '../../../packages/viser-graph/src/index';

const data = {
  nodes: [{
    id: '0',
    x: 150,
    y: 100
  }, {
    id: '1',
    x: 350,
    y: 300
  }],
  edges: [
  // 内置折线
    {
      source: '0',
      target: '1'
    }]
};
new ViserGraph({
  data,
  graph: {
    container: 'mount',
    type: 'graph',
    width: 500,
    height: 500,
    pixelRatio: 2,
    renderer: 'svg',
    modes: {
      default: [ 'drag-node' ]
    } as any,
    fitView: true,
    defaultNode: {
      style: {
        fill: '#DEE9FF',
        stroke: '#5B8FF9'
      }
    } as any,
  } as any,
  edge: {
    formatter: () => {
      return {
        shape: 'polyline',
        style: {
          stroke: '#F6BD16'
        }
      }
    },
  },
}).render();