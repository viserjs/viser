<template>
  <div>
    <v-chart
      :forceFit="true"
      height="500"
    >
      <v-view
        :data="data"
        :end="{x:0.45,y:1}"
      >
        <v-axis></v-axis>
        <v-point position="Horsepower*Miles_per_Gallon"></v-point>
      </v-view>
      <v-view
        :data="data"
        :start="{x:0.55,y:0}"
      >
        <v-axis></v-axis>
        <v-point position="Acceleration*Displacement"></v-point>
      </v-view>
      <v-brush
        :dragable="true"
        :onBrushstart="onBrushstart"
        :onBrushmove="onBrushmove"
        :onDragmove="onBrushmove"
      ></v-brush>
    </v-chart>
  </div>
</template>

<script>
import { data } from './data';

export default {
  methods:{
    onBrushstart(ev){
      const x = ev.x,
        y = ev.y,
        chart=this.$children[0].chart.chartInstance;

      const views = chart.getViewsByPoint({
        x: x,
        y: y
      });
      const brush=this.$children[0].$children[2];
      if (views.length > 1) {
        brush.chart = views[1];
        const coord = views[1].get('coord');
        brush.plot = {
          start: coord.start,
          end: coord.end
        };
        brush.xScale = views[1].getXScale();
        brush.yScale = views[1].getYScales()[0];
      }
    },
    onBrushmove(ev){
      const data = ev.data;
      const viewInstance=this.$children[0].chart.viewInstance;
      const view2=viewInstance[Object.keys(viewInstance)[1]];
      view2.filterShape(function(obj) {
        return data.indexOf(obj) > -1;
      });
    }
  },
  data() {
    return {
      data: data
    };
  }
};
</script>

