<template>
  <div>
    <v-graph  :data="data" :width="graph.width" :height="graph.width"
      :layout="graph.layout" :modes="graph.modes"
      :defaultNode="graph.defaultNode"
      :defaultEdge="graph.defaultEdge"
    >
     <v-node :formatter="node.formatter"></v-node>
    </v-graph>
  </div>
</template>

<script>
import { GlobalG6 as G6 } from '../../../packages/viser-graph-vue/src/index';
import { data } from './data'

const graph = {
  data,
  container: 'mount',
  type: 'graph',
  width: 500,
  height: 500,
  renderer: 'svg',
  fitView: false,
  animate: true,
  layout: {
    type: 'radial',
    unitRadius: 50,
    preventOverlap: true,
    maxPreventOverlapIteration: 100
  },
  defaultNode: {
    style: {
      lineWidth: 2,
      fill: '#C6E5FF',
      stroke: '#5B8FF9'
    }
  },
  defaultEdge: {
    size: 1,
    color: '#e2e2e2',
    style: {
      endArrow: {
        path: 'M 4,0 L -4,-4 L -4,4 Z',
        d: 4
      }
    }
  },
  modes: {
    default: [ 'drag-canvas', 'drag-node' ]
  },
};

const node = {
  formatter: () => {
    return {
      size: Math.random() * 20 + 10,
    }
  }
}

export default {
  data() {
    return {
      data,
      graph,
      node
    };
  },
  methods: {

  }
};
</script>
