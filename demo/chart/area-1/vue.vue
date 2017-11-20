<template>
  <div>
    <v-chart :force-fit="true" :height="height" :data="data" :data-pre="dataPre" :data-mapping="dataMapping" :scale="scale">
      <v-axis />
      <v-area :v-style="areaStyle" />
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
      areaStyle: {
        lineWidth: 1
      }
    };
  },
  methods: {

  }
};
</script>

<style scoped>

</style>
