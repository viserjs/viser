<template>
  <div>
    <v-chart :force-fit="true" :height="600" :data="chartData" :scale="scale">
      <v-tooltip />
      <v-axis />
      <v-facet :type="'rect'" :fields="['cut', 'clarity']">
        <v-facet-view>
          <v-point :position="'carat*price'" :color="'cut'" :opacity="0.3" :size="3" />
        </v-facet-view>
      </v-facet>
    </v-chart>
  </div>
</template>

<script>
import { chartData, scale } from "./data";

export default {
  data() {
    return {
      chartData,
      scale
    };
  },
  methods: {}
};
</script>

<style scoped>

</style>
