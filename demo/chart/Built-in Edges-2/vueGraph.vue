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
    id: '2',
    x: 150,
    y: 150
  }, {
    id: '3',
    x: 350,
    y: 250
  }],
  edges: [
  // 配置内置折线的弯折弧度、端点最小距离
    {
      source: '2',
      target: '3'
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
    default: [ 'drag-node' ]
  },
  defaultNode: {
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9'
    }
  },
  defaultEdge: {
    shape: 'polyline',
    style: {
      radius: 10,
      offset: 30,
      endArrow: true,
      stroke: '#F6BD16'
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
