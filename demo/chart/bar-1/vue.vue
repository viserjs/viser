<template>
  <div>
    <button v-on:click="handleClick">Click</button>
    <v-chart :force-fit="true" :height="height" :data="data" :data-pre="dataPre" :data-mapping="dataMapping" :scale="scale">
      <v-tooltip />
      <v-axis />
      <v-stack-bar :v-style="stackBarStyle" />
    </v-chart>
  </div>
</template>

<script>
import { data, dataMapping, dataPre, scale } from "./data";

export default {
  data() {
    return {
      data,
      dataMapping,
      dataPre,
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
