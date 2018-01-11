<template>
  <div>
    <v-chart :force-fit="true" :height="600" :data="sourcedata" :scale="scale">
      <v-tooltip />
      <v-legend />
      <v-coord :type="'polar'" />
      <v-facet :type="'circle'" :fields="['clarity']" :views="views" />
    </v-chart>
  </div>
</template>

<script>
const DataSet = require('@antv/data-set');
import { sourcedata } from './data';
const { DataView } = DataSet;

const scale = [
  {
    dataKey: 'mean',
    sync: true
  },
  {
    dataKey: 'cut',
    sync: true
  }
];

const views = (view, facet) => {
  const data = facet.data;
  const dv = new DataView();
  dv.source(data).transform({
    type: 'aggregate',
    fields: ['price'],
    operations: ['mean'],
    as: ['mean'],
    groupBy: ['cut']
  });

  return {
    data: dv,
    series: {
      quickType: 'bar',
      position: 'cut*mean',
      color: 'cut'
    }
  };
};

export default {
  data() {
    return {
      sourcedata,
      scale,
      views
    };
  },
  methods: {}
};
</script>
