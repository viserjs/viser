<template>
  <div>
    <v-chart :force-fit="true" :height="600" :data-pre="dataPre" :data="data">
      <v-view :view-id="'2'" :data-view="'edges'" :data-mapping="dataMapping" scale={scale}>
        <v-sankey :v-style="{ curvature: 0.5 }" :color="'#333'" :opacity="0.1" :tooltip="'value'" />
      </v-view>
      <v-view :view-id="'3'" :data-view="'nodes'" :data-mapping="viewDataMapping" scale={scale}>
        <v-polygon :v-style="{ stroke: '#ccc' }" :label="label" />
      </v-view>
    </v-chart>
  </div>
</template>
<script>
import { data, dataMapping, scale, dataPre } from "./data";

export default {
  data() {
    return {
      data,
      dataMapping,
      dataPre,
      scale,
      viewDataMapping: { column: 'x', row: 'y', color: 'name' },
      label: {
        dataKey: 'name',
        textStyle: {
          fill: 'black',
          textAlign: 'left'
        },
        offset: 0,
      },
    };
  },
};
</script>

<style scoped>

</style>
