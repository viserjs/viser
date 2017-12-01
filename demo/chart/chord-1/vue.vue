<template>
  <div>
    <v-chart :force-fit="true" :height="600" :data-pre="dataPre" :data="data" :scale="scale">
      <v-view :view-id="'2'" :data-view="'edges'">
        <v-coord :type="'polar'" :direction="'yReverse'" />
        <v-edge :position="'x*y'" :color="'source'" :shape="'arc'" :opacity="0.5" :tooltip="'source*target*value'" />
      </v-view>
      <v-view :view-id="'3'" :data-view="'nodes'">
        <v-coord :type="'polar'" :direction="'yReverse'" />
        <v-polygon :position="'x*y'" :color="'id'" :label="label" />
      </v-view>
    </v-chart>
  </div>
</template>
<script>
import { data, scale, dataPre } from "./data";

export default {
  data() {
    return {
      data,
      dataPre,
      scale,
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
