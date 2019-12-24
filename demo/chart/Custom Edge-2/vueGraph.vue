<template>
  <div>
    <v-graph :data="data" :width="graph.width" :height="graph.height" :modes="graph.modes"
      :defaultNode="graph.defaultNode" :defaultEdge="graph.defaultEdge"
    >
    </v-graph>
  </div>
</template>

<script>
import { GlobalG6 as G6 } from '../../../packages/viser-graph-vue/src/index';
G6.registerEdge('line-arrow', {
  options: {
    style: {
      stroke: '#ccc'
    }
  },
  draw: function draw(cfg, group) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;

    const stroke = cfg.style && cfg.style.stroke || this.options.style.stroke;

    const keyShape = group.addShape('path', {
      attrs: {
        path: [[ 'M', startPoint.x, startPoint.y ], [ 'L', endPoint.x / 3 + 2 / 3 * startPoint.x, startPoint.y ], [ 'L', endPoint.x / 3 + 2 / 3 * startPoint.x, endPoint.y ], [ 'L', endPoint.x, endPoint.y ]],
        stroke,
        lineWidth: 1,
        startArrow: {
          path: 'M 6,0 L -6,-6 L -3,0 L -6,6 Z',
          d: 6
        },
        endArrow: {
          path: 'M 6,0 L -6,-6 L -3,0 L -6,6 Z',
          d: 6
        },
        className: 'edge-shape'
      }
    });
    return keyShape;
  }
});

const data = {
  nodes: [{
    id: '7',
    x: 150,
    y: 100,
    size: 40,
    anchorPoints: [[ 1, 0.5 ], [ 1, 0 ]]
  }, {
    id: '8',
    x: 300,
    y: 200,
    size: 40,
    anchorPoints: [[ 0, 0.5 ], [ 0, 1 ]]
  }],
  edges: [{
    source: '7',
    target: '8',
    sourceAnchor: 0,
    targetAnchor: 0
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
    // 支持的 behavior
    default: [ 'drag-node', 'drag-canvas' ]
  },
  defaultNode: {
    shape: 'circle',
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
    shape: 'line-arrow',
    style: {
      stroke: '#F6BD16'
    }
  }
};

export default {
  data() {
    return {
      data,
      graph,
    };
  },
  methods: {

  }
};
</script>
