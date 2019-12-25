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
    y: 100
  }, {
    id: '1',
    x: 350,
    y: 300
  }],
  edges: [
  // 内置折线
    {
      source: '0',
      target: '1'
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
