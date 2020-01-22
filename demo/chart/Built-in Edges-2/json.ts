import { ViserGraph } from '../../../packages/viser-graph/src/index';

const data = {
  nodes: [{
    id: '2',
    x: 150,
    y: 150
  }, {
    id: '3',
    x: 350,
    y: 250
  }],
  edges: [
  // 配置内置折线的弯折弧度、端点最小距离
    {
      source: '2',
      target: '3'
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
    },
    fitView: true,
    defaultNode: {
      style: {
        fill: '#DEE9FF',
        stroke: '#5B8FF9'
      }
    },
  },
  edge: {
    formatter: () => {
      return {
        shape: 'polyline',
        style: {
          radius: 10,
          offset: 30,
          endArrow: true,
          stroke: '#F6BD16'
        }
      }
    },
  },
}).render();