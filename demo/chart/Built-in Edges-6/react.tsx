import * as React from 'react';
import { Graph } from '../../../packages/viser-graph-react/src/index';

const data = {
  nodes: [{
    id: '0',
    x: 150,
    y: 50
  }, {
    id: '1',
    x: 350,
    y: 250
  }],
  edges: [
// 内置弧线
    {
      id: 'edge0',
      source: '0',
      target: '1',
      label: 'curveOffset = 20',
      curveOffset: 20
    },
// 配置内置折线的弯折弧度、端点最小距离
    {
      id: 'edge1',
      source: '0',
      target: '1',
      label: 'curveOffset = 50',
      curveOffset: 50
    },
// // 带有 controlPoints，则按照给定控制点弯折
    {
      id: 'edge2',
      source: '0',
      target: '1',
      label: 'curveOffset = -50',
      curveOffset: -50
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
  linkCenter: true,
  modes: {
    default: [ 'drag-node' ]
  },
  defaultNode: {
    size: 45,
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9'
    }
  },
  defaultEdge: {
    shape: 'arc',
    style: {
      stroke: '#F6BD16'
    },
    labelCfg: {
      autoRotate: true,
      refY: -10
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
