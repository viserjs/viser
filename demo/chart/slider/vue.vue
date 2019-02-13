<template>
    <div v-if="data.length">
        <div id="mountNode">
            <h4 style="text-align:center;margin-bottom:5px;">北京市 2010-2015 年 AQI 指数</h4>
            <v-chart :forceFit="true" height="400" :padding="[20,20,40,80]" :data="dataview" :scale="scale">
                <v-tooltip></v-tooltip>
                <v-axis></v-axis>
                <v-line position="date*aqi" opacity="0.75"></v-line>
                <v-guide v-for="(tick,i) in ticks" :key="i" type="region" :start="['min',tick]" :end="['max',ticks[i+1]]" :v-style="{fill:colors[i],fillOpacity:0.4}"></v-guide>
            </v-chart>
        </div>
        <div id="slider">
            <v-plugin>
                <v-slider
                    container='viser-slider-1'
                    width="auto"
                    :height="height"
                    :start="start"
                    :end="end"
                    xAxis="date"
                    yAxis="aqi"
                    :scale="{
                        time:{
                            type:'time',
                            tickCount:10,
                            mask:'YYYY-MM-DD'
                        }
                    }"
                    :data="data"
                    :backgroundChart="{type:'line'}"
                    :onChange="onChange"
                ></v-slider>
            </v-plugin>
        </div>
    </div>
</template>

<script>
import { data } from './data';
const DataSet = require('@antv/data-set');

export default {
  data() {
    return {
      dataview: {},
      data: [],
      ticks: [],
      colors: [],
      scale: [],
      start: "2000-06-05",
      end: "2000-12-29",

      height: 30,
    };
  },
  methods: {
    getData() {
      const { data, start, end } = this;
      const ds = new DataSet({
        state: {
          start: new Date(start).getTime(),
          end: new Date(end).getTime()
        }
      });
      const dataview = ds.createView().source(data);
      dataview.transform({
        type: "filter",
        callback: function callback(obj) {
          var time = new Date(obj.date).getTime(); // !注意：时间格式，建议转换为时间戳进行比较
          return time >= ds.state.start && time <= ds.state.end;
        }
      });
      return dataview;
    },
    onChange(_ref) {
      const startValue = _ref.startValue,
        endValue = _ref.endValue;
      this.start = startValue;
      this.end = endValue;
      console.log('onChange', startValue, endValue);
      this.dataview = this.getData();
    }
  },
  mounted() {
    const ticks = [0, 50, 100, 150, 200, 300, 500];
    const colors = [
      "#5AC405",
      "#F9C709",
      "#FD942C",
      "#e4440D",
      "#810043",
      "#45001B"
    ];
    this.$data.data = data;
    this.$data.dataview = this.getData();
    this.$data.ticks = ticks;
    this.$data.colors = colors;
    this.$data.scale = [
      {
        dataKey: "date",
        type: "time",
        mask: "YYYY-MM-DD",
        tickCount: 4,
        alias: "日期",
        nice: false
      },
      {
        dataKey: "aqi",
        min: 0,
        ticks: ticks,
        alias: "AQI(空气质量指数)"
      }
    ];

    setTimeout(() => {
      console.log('$data');
      this.$data.height = 50;
      this.$data.start = '2000-11-05';
    }, 2000);

  },
};
</script>
