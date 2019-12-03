import { ViserGraph, registerNode, registerEdge, GlobalG6 as G6 } from '../../../packages/viser-graph/src/index';

G6.registerNode('circleNode', {
  drawShape(cfg, group) {
    const keyShape = group.addShape('circle', {
      attrs: {
        x: 0,
        y: 0,
        r: 30,
        fill: '#87e8de'
      }
    });

    return keyShape;
  }
}, 'circle');

G6.registerEdge('loop-growth', {
    afterDraw(cfg, group) {
        const shape = group.get('children')[0];
        const length = shape.getTotalLength();
        shape.animate({
        onFrame(ratio) {
            const startLen = ratio * length;
            // 计算线的lineDash
            const cfg = {
            lineDash: [startLen, length - startLen]
            };
            return cfg;
        },
        repeat: true
        }, 2000);
    }
}, 'loop');

const data = {
  nodes: [{
      x: 300,
      y: 300,
      shape: 'circleNode',
      label: 'rect',
      id:'node1',
      labelCfg: {
          position: 'bottom'
      },
      anchorPoints: [
          [0.5, 0, {type: 'circle', style: {stroke: 'red', fill: 'red'}}], 
          [1, 0.5, {type: 'circle', style: {stroke: 'blue', fill: 'red'}}]
      ]
  }
  ],
  edges: [
      {
          source: 'node1',
          target: 'node1',
          label: 'loop',
          shape:'loop-growth',
          labelCfg: {
              refY: 10
          }
      }
  ]
};


new ViserGraph({
  data,
  graph: {
    container: 'mount',
    width: 1000,
    height: 600,
    defaultEdge: {
     color: '#bae7ff'
   },
    modes: {
        default: ['drag-node']
      }
  },
}).render();