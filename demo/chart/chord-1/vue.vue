<template>
  <div>
    <v-chart :force-fit="true" :height="600" :scale="scale">
      <v-view  :data="edgesData">
        <v-coord :type="'polar'" :direction="'yReverse'" />
        <v-edge :position="'x*y'" :color="'source'" :shape="'arc'" :opacity="0.5" :tooltip="'source*target*value'" />
      </v-view>
      <v-view  :data="nodesData">
        <v-coord :type="'polar'" :direction="'yReverse'" />
        <v-polygon :position="'x*y'" :color="'id'" :label="label" />
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
  type: 'diagram.arc',
  sourceWeight: e => e.sourceWeight,
  targetWeight: e => e.targetWeight,
  weight: true,
  marginRatio: 0.3
});

export default {
  data() {
    return {
      scale,
      edgesData: dv.edges,
      nodesData: dv.nodes,
      label: [
        'name', {
          labelEmit: true,
          textStyle: {
            fill: '#8c8c8c'
          },
        }
      ],
    };
  },
};
</script>

<style scoped>

</style>
