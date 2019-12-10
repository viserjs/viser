import * as React from 'react';
import { Graph, Node } from '../../../packages/viser-graph-react/src/index';

const data = {
  nodes: [
    {
      id: 'rect',
      label: 'rect',
      x: 250,
      y: 150
    }
  ]
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
    default: [ 'drag-canvas', 'drag-node' ]
  },
  defaultNode: {
    shape: 'rect',
    size: [ 160, 80 ],
    style: {
      fill: '#9EC9FF',
      stroke: '#5B8FF9',
      lineWidth: 3
    },
    labelCfg: {
      style: {
        fill: '#fff',
        fontSize: 18
      }
    },
    linkPoints: {
      top: true,
      bottom: true,
      left: true,
      right: true,
      size: 5,
      fill: '#fff',
      lineWidth: 1,
      stroke: '#1890FF'
    }
  },
  nodeStateStyles: {
    // 鼠标hover状态下的配置
    hover: {
      fillOpacity: 0.8
    },
    // 选中节点状态下的配置
    selected: {
      lineWidth: 5
    }
  }
};
const node = {
  events: {
    onMouseenter: (evt, graph) => {
      const { item } = evt;
      graph.setItemState(item, 'hover', true);
    },
    onMouseleave: (evt, graph) => {
      const { item } = evt;
      graph.setItemState(item, 'hover', false);
    },
    onClick: (evt, graph) => {
      const { item } = evt;
      graph.setItemState(item, 'selected', true);
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
