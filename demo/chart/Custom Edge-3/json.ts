import { ViserGraph, GlobalG6 as G6 } from '../../../packages/viser-graph/src/index';

G6.registerEdge('multipleLabelsEdge', {
  options: {
    style: {
      stroke: '#000'
    }
  },
  labelAutoRotate: true,
  draw(cfg, group) {
    const startPoint = cfg.startPoint,
      endPoint = cfg.endPoint;
    const stroke = cfg.style && cfg.style.stroke || this.options.style.stroke;

    const shape = group.addShape('path', {
      attrs: {
        stroke,
        path: [
          [ 'M', startPoint.x, startPoint.y ],
          [ 'L', endPoint.x, endPoint.y ]]
      }
    });
    if (cfg.label && cfg.label.length) {
      // 绘制左边的label
      group.addShape('text', {
        attrs: {
          text: cfg.label[0],
          fill: '#595959',
          textAlign: 'start',
          textBaseline: 'middle',
          x: startPoint.x,
          y: startPoint.y - 10
        }
      });
      if (cfg.label.length > 1) {
        // 绘制右边的label
        group.addShape('text', {
          attrs: {
            text: cfg.label[1],
            fill: '#595959',
            textAlign: 'end',
            textBaseline: 'middle',
            x: endPoint.x,
            y: endPoint.y - 10
          }
        });
      }
    }
    // 返回边的keyShape
    return shape;
  }
});

const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 100,
    label: 'node1'
  }, {
    id: 'node2',
    x: 300,
    y: 100,
    label: 'node2'
  }],
  edges: [{
    source: 'node1',
    target: 'node2',
    // 定义边左侧和右侧的label
    label: [ 'hello', 'world' ]
  }]
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
    fitView: true,
    modes: {
      default: [{
        type: 'drag-node',
        delegate: false
      }, 'drag-canvas', {
        type: 'zoom-canvas',
        sensitivity: 0.5
      }]
    },
    defaultNode: {
      shape: 'circle',
      size: [ 50 ],
      style: {
        fill: '#DEE9FF',
        stroke: '#5B8FF9'
      },
      linkPoints: {
        left: true,
        right: true,
        fill: '#fff',
        stroke: '#1890FF',
        size: 3
      }
    },
    defaultEdge: {
      shape: 'multipleLabelsEdge',
      style: {
        stroke: '#F6BD16'
      }
    }
  }
}).render();