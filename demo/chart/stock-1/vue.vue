<template>
  <div>
    <v-chart :force-fit="true" :height="400" animate={false} :padding="[ 10, 40, 40, 40 ]" :data="getData()" :scale="scale">
      <v-tooltip :show-title="tooltipOpts.showTitle" :item-tpl="tooltipOpts.itemTpl"/>
      <v-axis />
      <v-legend :offset="20"/>
      <v-line :position="'time*max'" />
    </v-chart>
    <v-plugin>
      <v-slider width="auto" :height="26" :padding="[ 20, 40, 20, 40 ]" :start="start" :end="end"
        :data="data" xAxis="time" yAxis="volumn" :scales="{
          time: {
            type: 'timeCat',
            nice: false,
          }
        }" :onchange="slideChange"/>
    </v-plugin>
  </div>
</template>

<script>
const DataSet = require('@antv/data-set');
import { data, scale } from './data';

const tooltipOpts = {
  showTitle: false,
  itemTpl: '<li data-index={index}>'
  + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
  + '{name}{value}</li>',
};

export default {
  methods: {
    getData: () => {
      const { start, end } = this.a.data();
      const ds = new DataSet({
        state: {
          start,
          end,
        }
      });
      const dv = ds.createView();
      dv.source(data)
        .transform({
          type: 'filter',
          callback: obj => {
            const date = obj.time;
            return date <= end && date >= start;
          }
        })
        .transform({
          type: 'map',
          callback: obj => {
            obj.trend = (obj.start <= obj.end) ? '上涨' : '下跌';
            obj.range = [ obj.start, obj.end, obj.max, obj.min ];
            return obj;
          }
        });
      return dv;
    },
    slideChange: (opts) => {
      this.$data.start = opts.startText;
      this.$data.end = opts.endText;
    },
  },
  data() {
    return {
      data,
      scale,
      start: '2015-07-07',
      end: '2015-07-28',
      tooltipOpts,
    };
  },
};
</script>
