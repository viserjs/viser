<template>
  <div>
    <v-graph  :data="data" :width="graph.width" :height="graph.width"
      :layout="graph.layout" :modes="graph.modes"
      :defaultNode="graph.defaultNode"
      :defaultEdge="graph.defaultEdge"
    >
    </v-graph>
  </div>
</template>

<script>
import { GlobalG6 as G6 } from '../../../packages/viser-graph-vue/src/index';
import { data } from './data';

const graph = {
  data,
  container: 'mount',
  type: 'graph',
  width: 500,
  height: 500,
  pixelRatio: 1.0,
  renderer: 'canvas',
  fitView: false,
  modes: {
    default: [ 'drag-canvas', 'drag-node' ]
  },
  layout: {
    type: 'concentric',
    maxLevelDiff: 0.5,
    sortBy: 'degree'
  },
  animate: true,
  defaultNode: {
    size: 5,
    style: {
      fill: '#C6E5FF',
      stroke: '#5B8FF9'
    }
  },
  defaultEdge: {
    size: 1,
    color: '#e2e2e2',
  },
};

export default {
  data() {
    return {
      data,
      graph,
     // node,
    };
  },
  methods: {

  }
};
</script>
