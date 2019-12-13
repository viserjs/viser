import * as React from 'react';
import { Graph } from '../../../packages/viser-graph-react/src/index';

const data = {
  nodes: [{
    id: 'node5',
    x: 150,
    y: 200,
    label: '5',
    anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]]
  }, {
    id: 'node6',
    x: 300,
    y: 150,
    label: '6',
    anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]]
  }, {
    id: 'node7',
    x: 300,
    y: 250,
    label: '7',
    anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]]
  }],
  edges: [{
    source: 'node5',
    target: 'node6',
    shape: 'cubic-horizontal'
  }, {
    source: 'node5',
    target: 'node7',
    shape: 'cubic-horizontal'
  }]
};

const graph = {
  data,
  type: 'graph',
  container: 'mount',
  width: 500,
  height: 500,
  pixelRatio: 2,
  renderer: 'svg',
  fitView: true,
  modes: {
    default: [ 'drag-node' ]
  },
  defaultNode: {
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9'
    }
  },
  defaultEdge: {
    shape: 'cubic-horizontal',
    style: {
      stroke: '#F6BD16'
    }
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
