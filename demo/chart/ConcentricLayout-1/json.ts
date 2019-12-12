import { ViserGraph } from '../../../packages/viser-graph/src/index';
import { data } from './data';

new ViserGraph({
  data,
  graph: {
    container: 'mount',
    type: 'graph',
    width: 500,
    height: 500,
    pixelRatio: 1.0,
    renderer: 'canvas',
    fitView: false,
    animate: true,
    modes: {
      default: [ 'drag-canvas', 'drag-node' ]
    },
    layout: {
      type: 'concentric',
      maxLevelDiff: 0.5,
      sortBy: 'degree'
    },
  },
  node: {
    formatter: () => {
      return {
        size: 5,
        style: {
          fill: '#C6E5FF',
          stroke: '#5B8FF9'
        }
      }
    },
  },
  edge: {
    formatter: () => {
      return {
        size: 1,
        color: '#e2e2e2',
      }
    },
  },
}).render();
