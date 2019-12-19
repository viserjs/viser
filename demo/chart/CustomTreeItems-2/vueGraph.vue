<template>
  <div>
    <v-graph type="tree" :data="data" :width="graph.width" :height="graph.width"
      :layout="graph.layout" :modes="graph.modes" 
      :defaultNode="graph.defaultNode" :defaultEdge="graph.defaultEdge"
    >
    </v-graph>
  </div>
</template>

<script>
import { GlobalG6 as G6 } from '../../../packages/viser-graph-vue/src/index';
const data = {
  id: "Modeling Methods",
  children: [
    {
      id: "Classification",
      children: [
        { id: "Logistic regression" },
        { id: "Linear discriminant analysis" },
        { id: "Rules" },
        { id: "Decision trees" },
        { id: "Naive Bayes" },
        { id: "K nearest neighbor" },
        { id: "Probabilistic neural network" },
        { id: "Support vector machine" }
      ]
    },
    {
      id: "Consensus",
      children: [
        {
          id: "Models diversity",
          children: [
            { id: "Different initializations" },
            { id: "Different parameter choices" },
            { id: "Different architectures" },
            { id: "Different modeling methods" },
            { id: "Different training sets" },
            { id: "Different feature sets" }
          ]
        },
        {
          id: "Methods",
          children: [
            { id: "Classifier selection" },
            { id: "Classifier fusion" }
          ]
        },
        {
          id: "Common",
          children: [
            { id: "Bagging" },
            { id: "Boosting" },
            { id: "AdaBoost" }
          ]
        }
      ]
    },
    {
      id: "Regression",
      children: [
        { id: "Multiple linear regression" },
        { id: "Partial least squares" },
        { id: "Multi-layer feedforward neural network" },
        { id: "General regression neural network" },
        { id: "Support vector regression" }
      ]
    }
  ]
};
const COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
  return [[ 'M', x, y ], [ 'a', r, r, 0, 1, 0, r * 2, 0 ], [ 'a', r, r, 0, 1, 0, -r * 2, 0 ], [ 'M', x + 2, y ], [ 'L', x + 2 * r - 2, y ]];
};
const EXPAND_ICON = function EXPAND_ICON(x, y, r) {
  return [[ 'M', x, y ], [ 'a', r, r, 0, 1, 0, r * 2, 0 ], [ 'a', r, r, 0, 1, 0, -r * 2, 0 ], [ 'M', x + 2, y ], [ 'L', x + 2 * r - 2, y ], [ 'M', x + r, y - r + 2 ], [ 'L', x + r, y + r - 2 ]];
};
G6.registerNode('tree-node', {
  drawShape: function drawShape(cfg, group) {
    const rect = group.addShape('rect', {
      attrs: {
        fill: '#fff',
        stroke: '#666'
      }
    });
    const content = cfg.id.replace(/(.{19})/g, '$1\n');
    const text = group.addShape('text', {
      attrs: {
        text: content,
        x: 0,
        y: 0,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: '#666'
      }
    });
    const bbox = text.getBBox();
    const hasChildren = cfg.children && cfg.children.length > 0;
    if (hasChildren) {
      group.addShape('marker', {
        attrs: {
          x: bbox.maxX + 6,
          y: bbox.minX + bbox.height / 2 - 6,
          r: 6,
          symbol: COLLAPSE_ICON,
          stroke: '#666',
          lineWidth: 2
        },
        classid: 'collapse-icon'
      });
    }
    rect.attr({
      x: bbox.minX - 4,
      y: bbox.minY - 6,
      width: bbox.width + (hasChildren ? 26 : 8),
      height: bbox.height + 12
    });
    return rect;
  }
}, 'single-shape');

const graph = {
  data,
  container: 'mount',
  type: 'tree',
  width: 800,
  height: 1000,
  pixelRatio: 2,
  renderer: 'svg',
  fitView: true,
  modes: {
    default: [{
      type: 'collapse-expand',
      onChange: function onChange(item, collapsed) {
        const data = item.get('model');
        const icon = item.get('group').findByClassName('collapse-icon');
        if (collapsed) {
          icon.attr('symbol', EXPAND_ICON);
        } else {
          icon.attr('symbol', COLLAPSE_ICON);
        }
        data.collapsed = collapsed;
        return true;
      }
    }, 'drag-canvas' ]
  },
  defaultNode: {
    shape: 'tree-node',
    anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]]
  },
  defaultEdge: {
    shape: 'cubic-horizontal',
    style: {
      stroke: '#A3B1BF'
    }
  },
  layout: {
    type: 'compactBox',
    direction: 'LR',
    getId(d) { return d.id; },
    getHeight() { return 16 },
    getWidth() { return 16 },
    getVGap() { return 20 },
    getHGap() { return 80 }
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
