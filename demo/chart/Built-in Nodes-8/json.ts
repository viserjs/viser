import { ViserGraph } from '../../../packages/viser-graph/src/index';

const data = {
  nodes: [
    {
      id: 'image',
      img: 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
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
      shape: 'image',
      size: [ 260, 80 ],
      clipCfg: {
        show: false,
        // 裁剪类型可以为：circle、ellipse、rect、path等
        type: 'circle',
        // circle
        r: 30,
        // clip 的属性样式
        style: {
          lineWidth: 1
        }
      }
    },
  },
  node: {
    formatter: () => {
      return {
        label: '',
      }
    },
  },
}).render();