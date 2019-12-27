<template>
  <div>
    <v-graph type="tree" :data="data" :width="graph.width" :height="graph.width"
      :layout="graph.layout" :modes="graph.modes"
      :defaultNode="graph.defaultNode"
    >
      <v-node :events="node.events" :formatter="node.formatter"></v-node>
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
  }]
};

let i = 0;
let count = 0;

const graph = {
  data,
  type: 'tree',
  container: 'mount',
  width: 500,
  height: 500,
  pixelRatio: 2,
  renderer: 'svg',
  modes: {
    default: [ 'collapse-expand', 'drag-canvas' ]
  },
  fitView: true,
  layout: {
    type: 'compactBox',
    direction: 'LR',
    defalutPosition: [],
    getId(d) { return d.id; },
    getHeight() { return 16 },
    getWidth() { return 16 },
    getVGap() { return 50 },
    getHGap() { return 100 }
  },
  defaultNode: {
    size: 16,
    anchorPoints: [[0,0.5], [1,0.5]],
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9'
    },
  }
};

const node = {
  formatter: node => {
    return {
      size: 16,
      anchorPoints: [[0,0.5], [1,0.5]],
      style: {
        fill: '#DEE9FF',
        stroke: '#5B8FF9'
      },
      label: node.id,
      labelCfg: {
        position: node.children && node.children.length > 0 ? 'left' : 'right'
      }
    }
  },
  events: {
    onClick: (evt, graph) => {
      const item = evt.item;
      const nodeId = item.get('id');
      const model = item.getModel();
      const children = model.children;
      if (!children || children.length === 0) {
        const childData = {
          id: 'child-data-' + count,
          shape: 'rect',
          children: [{
            id: 'x-' + count
          }, {
            id: 'y-' + count
          }]
        };
        graph.addChild(childData, nodeId);
        count++;
        graph.refreshLayout();
      }
    }
  }
}

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
