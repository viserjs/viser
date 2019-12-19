import * as React from 'react';
import { Graph } from '../../../packages/viser-graph-react/src/index';
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
      radius: 10,
      offset: 30,
      endArrow: true,
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
