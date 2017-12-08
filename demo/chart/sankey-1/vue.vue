<template>
  <div>
    <v-chart :force-fit="true" :height="600" :data-pre="dataPre" :data="data">
      <v-view :view-id="'2'" :data-view="'edges'" :scale="scale">
        <v-sankey :position="'x*y'" :v-style="{ curvature: 0.5 }" :color="'#333'" :opacity="0.1" :tooltip="'value'" />
      </v-view>
      <v-view :view-id="'3'" :data-view="'nodes'" :scale="scale">
        <v-polygon :position="'x*y'" :color="'name'" :v-style="{ stroke: '#ccc' }" :label="label" />
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
