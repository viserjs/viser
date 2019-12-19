<template>
  <div>
    <v-graph type="tree" :data="data" :width="graph.width" :height="graph.width"
      :layout="graph.layout" :modes="graph.modes"
      :defaultNode="graph.defaultNode"
    >
      <v-node :formatter="node.formatter"></v-node>
      <v-edge :formatter="edge.formatter"></v-edge> 
    </v-graph>
  </div>
</template>

<script>
import { GlobalG6 as G6 } from '../../../packages/viser-graph-vue/src/index';
const data = {
  isRoot: true,
  id: 'Root',
  style: {
    fill: 'red'
  },
  children: [{
    id: 'SubTreeNode1',
    raw: {},
    children: [{
      id: 'SubTreeNode1.1'
    }, {
      id: 'SubTreeNode1.2',
      children: [{
        id: 'SubTreeNode1.2.1'
      }, {
        id: 'SubTreeNode1.2.2'
      }, {
        id: 'SubTreeNode1.2.3'
      }]
    }]
  }, {
    id: 'SubTreeNode2',
    children: [{
      id: 'SubTreeNode2.1'
    }]
  }, {
    id: 'SubTreeNode3',
    children: [{
      id: 'SubTreeNode3.1'
    }, {
      id: 'SubTreeNode3.2'
    }, {
      id: 'SubTreeNode3.3'
    }]
  }, {
    id: 'SubTreeNode4'
  }, {
    id: 'SubTreeNode5'
  }, {
    id: 'SubTreeNode6'
  }, {
    id: 'SubTreeNode7'
  }, {
    id: 'SubTreeNode8'
  }, {
    id: 'SubTreeNode9'
  }, {
    id: 'SubTreeNode10'
  }, {
    id: 'SubTreeNode11'
  }]
};

const graph = {
  data,
  container: 'mount',
  type: 'tree',
  width: 500,
  height: 500,
  pixelRatio: 2,
  renderer: 'svg',
  fitView: true,
  linkCenter: true,
  modes: {
    default: ['collapse-expand', 'drag-canvas']
  },
  defaultNode: {
    size: 16,
    style: {
      fill: '#C6E5FF',
      stroke: '#5B8FF9'
    }
  },
  layout: {
    type: 'compactBox',
    direction: 'LR',
    getId(d) { return d.id; },
    getHeight() { return 16 },
    getWidth() { return 16 },
    getVGap() { return 10 },
    getHGap() { return 100 }
  }
};
const node = {
  formatter: node => {
    return {
      size: 16,
      anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]],
      style: {
        fill: '#C6E5FF',
        stroke: '#5B8FF9'
      },
      label: node.id,
      labelCfg: {
        position: node.children && node.children.length > 0 ? 'left' : 'right',
        offset: 5
      }
    }
  }
}
let i = 0;
const edge = {
  formatter: () => {
    i++;
    return {
      shape: 'cubic-horizontal',
      color: '#A3B1BF',
      label: i
    }
  },
}

export default {
  data() {
    return {
      data,
      graph,
      node,
      edge
    };
  },
  methods: {

  }
};
</script>
