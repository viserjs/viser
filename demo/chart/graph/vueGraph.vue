<template>
  <div>
    <v-graph :width="graph.width" :height="graph.width"
      :fit-view="graph.fitView" :fit-view-padding="graph.fitViewPadding"
      :animate="graph.animate" :type="graph.type"
      :data="data"
      :on-click="graph.onClick">
      <v-zoom :max="zoom.max" :min="zoom.min"></v-zoom>
    </v-graph>
  </div>
</template>

<script>
const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 200
  },{
    id: 'node2',
    x: 300,
    y: 200
  }],
  edges: [{
    id: 'edge1',
    target: 'node2',
    source: 'node1'
  }]
};

const graph = {
  width: 500,
  height: 500,
  fitView: 'cc',
  fitViewPadding: true,
  animate: true,
  type: 'graph',
  data,
  onClick: function(ev, graph) {
    console.log('click', ev, graph);
  }
};
const zoom = {
  min: 1,
  max: 10,
};

export default {
  data() {
    return {
      data,
      graph,
      zoom,
    };
  },
  methods: {

  }
};
</script>
