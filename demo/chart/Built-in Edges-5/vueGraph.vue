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
    id: 'node5',
    x: 150,
    y: 200,
    label: '5',
    anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]]
  }, {
    id: 'node6',
    x: 300,
    y: 150,
    label: '6',
    anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]]
  }, {
    id: 'node7',
    x: 300,
    y: 250,
    label: '7',
    anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]]
  }],
  edges: [{
    source: 'node5',
    target: 'node6',
    shape: 'cubic-horizontal'
  }, {
    source: 'node5',
    target: 'node7',
    shape: 'cubic-horizontal'
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
    shape: 'cubic-horizontal',
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
