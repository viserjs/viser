<template>
  <div>
    <v-chart :force-fit="true" :height="600" :data="chartData" :data-mapping="dataMapping" :scale="scale">
      <v-facet :type="'rect'" :fields="['cut', 'clarity']">
        <v-facet-view>
          <v-axis />
          <v-tooltip />
          <v-point :opacity="0.3" :size="3" />
        </v-facet-view>
      </v-facet>
    </v-chart>
  </div>
</template>

<script>
import { chartData, dataMapping, scale } from "./data";

export default {
  data() {
    return {
      chartData,
      dataMapping,
      scale
    };
  },
  methods: {}
};
</script>

<style scoped>

</style>
