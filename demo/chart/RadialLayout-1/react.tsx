import * as React from 'react';
import { Graph } from '../../../packages/viser-graph-react/src/index';
import { data } from './data'

const graph = {
  data,
  container: 'mount',
  type: 'graph',
  width: 500,
  height: 500,
  renderer: 'svg',
  fitView: false,
  animate: true,
  layout: {
    type: 'radial',
    unitRadius: 50
  },
  defaultNode: {
    size: 20,
    style: {
      lineWidth: 2,
      fill: '#C6E5FF',
      stroke: '#5B8FF9'
    }
  },
  defaultEdge: {
    size: 1,
    color: '#e2e2e2',
    style: {
      endArrow: {
        path: 'M 4,0 L -4,-4 L -4,4 Z',
        d: 4
      }
    }
  },
  modes: {
    default: [ 'drag-canvas', 'drag-node' ]
  },
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Graph {...graph}/>
      </div>
    );
  }
}
