import * as React from 'react';
import { Graph, Node } from '../../../packages/viser-graph-react/src/index';
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
    unitRadius: 50,
    preventOverlap: true,
    maxPreventOverlapIteration: 100
  },
  defaultNode: {
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

const node = {
  formatter: () => {
    return {
      size: Math.random() * 20 + 10,
    }
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Graph {...graph}>
          <Node {...node}/>
        </Graph>
      </div>
    );
  }
}
