import * as React from 'react';
import { Graph } from '../../../packages/viser-graph-react/src/index';

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
    shape: 'polyline',
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
