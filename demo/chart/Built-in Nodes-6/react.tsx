import * as React from 'react';
import { Graph, Node } from '../../../packages/viser-graph-react/src/index';

const data = {
  nodes: [
    {
      id: 'star',
      label: 'Star',
      x: 250,
      y: 200
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
    shape: 'star',
    size: [ 120, 60 ],
    style: {
      fill: '#9EC9FF',
      stroke: '#5B8FF9',
      lineWidth: 3
    },
    labelCfg: {
      style: {
        fill: '#1890ff',
        fontSize: 18
      },
      position: 'bottom',
      offset: 50
    },
    // 节点上五个方向上的链接circle配置
    linkPoints: {
      top: true,
      right: true,
      left: true,
      leftBottom: true,
      rightBottom: true,
      // circle的大小
      size: 5,
      lineWidth: 1,
      fill: '#fff',
      stroke: '#1890FF'
    },
    // 节点中icon配置
    icon: {
      // 是否显示icon，值为 false 则不渲染icon
      show: true,
      // icon的地址，字符串类型
      img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      width: 60,
      height: 60
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
