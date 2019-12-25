<template>
  <div>
    <v-graph :data="data" :width="graph.width" :height="graph.width"
      :layout="graph.layout" :modes="graph.modes" 
      :defaultNode="graph.defaultNode"
    >
    </v-graph>
  </div>
</template>

<script>
import { GlobalG6 as G6 } from '../../../packages/viser-graph-vue/src/index';
const data = {
  nodes: [
    {
      id: 'image',
      img: 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
      x: 250,
      y: 150
    }
  ]
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
    default: [ 'drag-canvas', 'drag-node' ]
  },
  defaultNode: {
    shape: 'image',
    size: [ 260, 80 ],
    clipCfg: {
      show: false,
      // 裁剪类型可以为：circle、ellipse、rect、path等
      type: 'circle',
      // circle
      r: 30,
      // clip 的属性样式
      style: {
        lineWidth: 1
      }
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
