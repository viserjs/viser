import * as React from 'react';
import { Graph, Node, Edge, } from '../../../packages/viser-graph-react/src/index';
import { data } from './data'

// 弹性缓冲效果未实现

const graph = {
  data,
  container: 'mount',
  type: 'graph',
  width: 500,
  height: 500,

 // pixelRatio: 1,

  renderer: 'svg',
  fitView: true,
  layout: {
   type: 'force',
  },
  defaultNode: {
    size: 15,
    color: '#5B8FF9',
    style: {
      lineWidth: 1,
      fill: '#C6E5FF'
    }
  },
  defaultEdge: {
    size: 1,
    color: '#e2e2e2'
  },

  modes: {
    default: ['drag-canvas','drag-node'] // 展示区域暂时有问题 增加canvas拖拽
  },
  onDragstart : (e) => {
    refreshDragedNodePosition(e);
  },
  onDrag : (e) => {
    refreshDragedNodePosition(e);
  },
  onDragend: (e) => {
    refreshDragedNodePosition(e);
  },
};

const node = {
  formatter: node => {
    return {
      size: 15,
      style: {
        fill: '#C6E5FF',
        stroke: '#5B8FF9'
      },
    }
  }
}

const edge = {
  formatter: () => {

    return {
      color: '#eee',
    }
  },
}

const refreshDragedNodePosition = (e) => {
  const model = e.item.get('model');
  model.fx = e.x;
  model.fy = e.y;
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
          <Edge {...edge}/>
        </Graph>
      </div>
    );
  }
}
