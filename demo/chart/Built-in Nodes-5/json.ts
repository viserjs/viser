import { ViserGraph } from '../../../packages/viser-graph/src/index';

const data = {
  nodes: [
    {
      id: 'diamond',
      label: 'Diamond',
      x: 250,
      y: 150
    }
  ]
};
new ViserGraph({
  data,
  graph: {
    container: 'mount',
    type: 'graph',
    width: 500,
    height: 500,
    pixelRatio: 2,
    renderer: 'svg',
    modes: {
      default: [ 'drag-canvas', 'drag-node' ]
    },
    fitView: true,
    defaultNode: {
      shape: 'diamond',
      size: [ 150, 100 ],
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
        position: 'bottom'
      },
      // 节点上左右上下四个方向上的链接circle配置
      linkPoints: {
        top: false,
        bottom: false,
        left: true,
        right: true,
        size: 5,
        fill: '#fff',
        lineWidth: 1,
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
  },
  node: {
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
  },
}).render();