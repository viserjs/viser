<template>
  <div>
    <v-chart :force-fit="true" :height="600">
      <v-view :view-id="'2'" :data="edgesData" :scale="scale">
        <v-sankey :position="'x*y'" :v-style="{ curvature: 0.5 }" :color="'#333'" :opacity="0.1" :tooltip="'value'" />
      </v-view>
      <v-view :view-id="'3'" :data="nodesData" :scale="scale">
        <v-polygon :position="'x*y'" :color="'name'" :v-style="{ stroke: '#ccc' }" :label="label" />
      </v-view>
    </v-chart>
  </div>
</template>
<script>
import { data, scale } from "./data";
const DataSet = require('@antv/data-set');

const ds = new DataSet();
const dv = ds.createView().source(data, {
  type: 'graph',
  edges: d => d.links
});

dv.transform({
  type: 'diagram.sankey',
  nodeWidth: 0.015,
  nodePadding: 0.02,
});

export default {
  data() {
    return {
      edgesData: dv.edges,
      nodesData: dv.nodes,
      scale,
      label: [
        'name', {
          textStyle: {
            fill: 'black',
            textAlign: 'left'
          },
          offset: 0,
        }
      ],
    };
  },
};
</script>

<style scoped>

</style>
