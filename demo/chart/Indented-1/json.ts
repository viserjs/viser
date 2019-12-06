import { ViserGraph, GlobalG6 as G6 } from '../../../packages/viser-graph/src/index';

G6.registerNode('file-node', {
  draw: function draw(cfg, group) {
    const keyShape = group.addShape('rect', {
      attrs: {
        x: cfg.x - 4,
        y: cfg.y - 12,
        fill: '#fff',
        stroke: null
      }
    });
    if (cfg.collapsed) {
      group.addShape('marker', {
        attrs: {
          symbol: 'triangle',
          x: cfg.x + 4,
          y: cfg.y - 2,
          r: 4,
          fill: '#666'
        }
      });
    } else if (cfg.children && cfg.children.length > 0) {
      group.addShape('marker', {
        attrs: {
          symbol: 'triangle-down',
          x: cfg.x + 4,
          y: cfg.y - 2,
          r: 4,
          fill: '#666'
        }
      });
    }
    const shape = group.addShape('text', {
      attrs: {
        x: cfg.x + 15,
        y: cfg.y + 4,
        text: cfg.name,
        fill: '#666',
        fontSize: 16,
        textAlign: 'left'
      }
    });
    const bbox = shape.getBBox();
    keyShape.attr({
      width: bbox.width + 20,
      height: bbox.height + 4
    });
    return keyShape;
  }
});
G6.registerEdge('step-line', {
  getControlPoints: function getControlPoints(cfg) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;
    return [{
      x: startPoint.x,
      y: endPoint.y
    }];
  }
}, 'polyline');

const data = {
  id: '1',
  name: 'src',
  children: [{
    id: '1-1',
    name: 'behavior',
    children: []
  }, {
    id: '1-3',
    name: 'graph',
    children: [{
      id: '1-3-1',
      name: 'controller',
      children: []
    }]
  }, {
    id: '1-5',
    name: 'item',
    children: []
  }, {
    id: '1-6',
    name: 'shape',
    children: [{
      id: '1-6-2',
      name: 'extend',
      children: []
    }]
  }, {
    id: '1-7',
    name: 'util',
    children: []
  }]
};

new ViserGraph({
  data,
  graph: {
    container: 'mount',
    type: 'tree',
    width: 500,
    height: 500,
    pixelRatio: 2,
    renderer: 'svg',
    modes: {
      default: ['collapse-expand', 'drag-canvas']
    },
    fitView: true,
    layout: {
      type: 'indented',
      direction: 'LR',
      indent: 30,
      getHeight() { return 16 },
      getWidth() { return 16 },
    }
  },
  node: {
    formatter: node => {
      return {
        shape: 'file-node',
        label: node.name
      }
    }
  },
  edge: {
    formatter: () => {
      return {
        shape: 'step-line',
        style: {
          stroke: '#A3B1BF'
        }
      }
    },
  },
}).render();