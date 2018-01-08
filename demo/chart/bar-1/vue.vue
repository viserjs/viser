<template>
  <div>
    <!-- <button v-on:click="handleClick">Click</button> -->
    <v-chart :force-fit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip />
      <v-axis />
      <v-stack-bar :position="'year*percent'" :color="'country'" :v-style="stackBarStyle" />
    </v-chart>
    <!-- <v-lite-chart :stack-bar="true" :height="400" :data="data" :data-pre="dataPre" :dataMapping="dataMapping" :forceFit="true" /> -->
  </div>
</template>

<script>
import { data, scale } from "./data";
const DataSet = require('@antv/data-set');

const ds = new DataSet();
const dv = ds.createView().source(data);

dv.transform({
  type: 'percent',
  field: 'value',
  dimension: 'country',
  groupBy: ['year'],
  as: 'percent'
});

export default {
  data() {
    return {
      data: dv.rows,
      scale,
      height: 400,
      stackBarStyle: {
        stroke: "#fff",
        lineWidth: 1
      }
    };
  },
  methods: {
    handleClick: function() {
      this.height = 600;
      this.stackBarStyle.lineWidth = 10;
    }
  }
};
</script>

<style scoped>

</style>
