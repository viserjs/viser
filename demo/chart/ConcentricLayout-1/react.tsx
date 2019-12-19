import * as React from 'react';
import { Graph } from '../../../packages/viser-graph-react/src/index';
import { data } from './data';

const graph = {
  data,
  container: 'mount',
  type: 'graph',
  width: 500,
  height: 500,
  pixelRatio: 1.0,
  renderer: 'canvas',
  fitView: false,
  modes: {
    default: [ 'drag-canvas', 'drag-node' ]
  },
  layout: {
    type: 'concentric',
    maxLevelDiff: 0.5,
    sortBy: 'degree'
  },
  animate: true,
  defaultNode: {
    size: 5,
    style: {
      fill: '#C6E5FF',
      stroke: '#5B8FF9'
    }
  },
  defaultEdge: {
    size: 1,
    color: '#e2e2e2',
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
