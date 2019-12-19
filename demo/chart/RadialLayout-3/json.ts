import { ViserGraph } from '../../../packages/viser-graph/src/index';
import { data } from './data'

new ViserGraph({
  data,
  graph: {
    container: 'mount',
    type: 'graph',
    width: 500,
    height: 500,
    renderer: 'svg',
    fitView: false,
    animate: true,
    layout: {
      type: 'radial',
      unitRadius: 70,
      preventOverlap: true,
      strictRadial: false
    },
    modes: {
      default: [ 'drag-canvas', 'drag-node' ]
    },
  },
  node: {
    formatter: () => {
      return {
        size: 20,
        style: {
          lineWidth: 2,
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
        style: {
          endArrow: {
            path: 'M 4,0 L -4,-4 L -4,4 Z',
            d: 4
          }
        }
      }
    },
  },
}).render();
