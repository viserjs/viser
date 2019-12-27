<template>
  <div>
    <v-graph :data="data" :width="graph.width" :height="graph.width"
      :layout="graph.layout" :modes="graph.modes" 
      :defaultNode="graph.defaultNode" :defaultEdge="graph.defaultEdge"
    >
    </v-graph>
  </div>
</template>

<script>
import { GlobalG6 as G6 } from '../../../packages/viser-graph-vue/src/index';
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
