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
    id: '4',
    x: 150,
    y: 100
  }, {
    id: '5',
    x: 350,
    y: 250
  }],
  edges: [
  // 带有 controlPoints，则按照给定控制点弯折
    {
      source: '4',
      target: '5',
      controlPoints: [{
        x: 260,
        y: 80
      }, {
        x: 320,
        y: 50
      }, {
        x: 390,
        y: 110
      }, {
        x: 420,
        y: 110
      }, {
        x: 420,
        y: 140
      }]
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
