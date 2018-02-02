<template>
  <div>
    <v-chart :force-fit="true" :height="height" :data="data" :scale="scale" :animate="false">
      <v-coord type="polar" :start-angle="-202.5" :end-angle="22.5" :radius="0.75">      </v-coord>
      <v-axis
        :data-key="'value'"
        :zIndex="2"
        :line="null"
        :label="axisLabel"
        :subTickCount="4"
        :subTickLine="axisSubTickLine"
        :tickLine="axisTickLine"
        :grid="null"
      ></v-axis>
      <v-axis :data-key="1" :show="false"></v-axis>
      <v-series
        :gemo="'point'"
        :position="'value*1'"
        :shape="'pointer'"
        :color="'#8C8C8C'"
        :active="false"
      ></v-series>
      <v-guide type="arc" :zIndex="0" :top="false" :start="arcGuideBgStart" :end="arcGuideBgEnd" :v-style="arcGuideBgStyle"></v-guide>
      <v-guide type="arc" :zIndex="1" :start="arcGuideLowStart" :end="arcGuideLowEnd" :v-style="arcGuideLowStyle"></v-guide>
      <v-guide type="arc" :zIndex="1" :start="arcGuideMidStart" :end="arcGuideMidEnd" :v-style="arcGuideMidStyle"></v-guide>
      <v-guide type="arc" :zIndex="1" :start="arcGuideHighStart" :end="arcGuideHighEnd" :v-style="arcGuideHighStyle"></v-guide>
      <v-guide
        type="html"
        :position="htmlGuidePosition"
        :html="htmlGuideHtml"
      ></v-guide>
    </v-chart>
  </div>
</template>

<script>
import { registerShape } from 'viser-vue';

registerShape('point', 'pointer', {
  draw(cfg, container) {
    let point = cfg.points[0]; // 获取第一个标记点
    point = this.parsePoint(point);
    const center = this.parsePoint({ // 获取极坐标系下画布中心点
      x: 0,
      y: 0
    });
    // 绘制指针
    container.addShape('line', {
      attrs: {
        x1: center.x,
        y1: center.y,
        x2: point.x,
        y2: point.y + 15,
        stroke: cfg.color,
        lineWidth: 5,
        lineCap: 'round'
      }
    });
    return container.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        r: 9.75,
        stroke: cfg.color,
        lineWidth: 4.5,
        fill: '#fff'
      }
    });
  }
});

const scale = [{
  dataKey: 'value',
  min: 0,
  max: 9,
  tickInterval: 1,
  nice: false
}];

const color = ['#0086FA', '#FFBF00', '#F5222D'];

export default {
  methods: {
    setData() {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      console.log('vue-timeout');

      const delta = Math.random();
      const prevVal = this.$data.data[0].value;
      if (this.$data.trend === 'up') {
        const nextVal = prevVal + delta;
        if (nextVal > 9) {
          this.$data.trend = 'down';
        } else {
          this.$data.data[0].value = nextVal;
          this.$data.arcGuideLowEnd[0] = Math.max(0, Math.min(3, nextVal));
          this.$data.arcGuideMidEnd[0] = Math.max(3, Math.min(6, nextVal));
          this.$data.arcGuideHighEnd[0] = Math.max(6, Math.min(9, nextVal));
          this.$data.htmlGuideHtml = `
            <div style="width: 300px;text-align: center;">
              <p style="font-size: 20px;color: #545454;margin: 0;">合格率</p>
              <p style="font-size: 36px;color: #545454;margin: 0;">${Math.ceil(nextVal * 10)}%</p>
            </div>
          `;
        }
      } else {
        const nextVal = prevVal - delta;
        if (nextVal < 0) {
          this.$data.trend = 'up';
        } else {
          this.$data.data[0].value = nextVal;
          this.$data.arcGuideLowEnd[0] = Math.max(0, Math.min(3, nextVal));
          this.$data.arcGuideMidEnd[0] = Math.max(3, Math.min(6, nextVal));
          this.$data.arcGuideHighEnd[0] = Math.max(6, Math.min(9, nextVal));
          this.$data.htmlGuideHtml = `
            <div style="width: 300px;text-align: center;">
              <p style="font-size: 20px;color: #545454;margin: 0;">合格率</p>
              <p style="font-size: 36px;color: #545454;margin: 0;">${Math.ceil(nextVal * 10)}%</p>
            </div>
          `;
        }
      }

      this.timer = setTimeout(this.setData, 1000);
    }
  },
  mounted() {
    this.timer = setTimeout(this.setData, 0);
  },
  beforeDestroy() {
    console.log('bd-vue');
    if (this.timer) {
      clearTimeout(this.timer);
    }
  },
  data() {
    const data = [
      { value: 5.6 }
    ];

    return {
      height: 400,
      data: data,
      scale: scale,

      axisLabel: {
        offset: -16,
        textStyle: {
          fontSize: 18,
          textAlign: 'center',
          textBaseline: 'middle'
        }
      },
      axisSubTickLine: {
        length: -8,
        stroke: '#fff',
        strokeOpacity: 1,
      },
      axisTickLine: {
        length: -17,
        stroke: '#fff',
        strokeOpacity: 1,
      },

      arcGuideBgStart: [0, 0.945],
      arcGuideBgEnd: [9, 0.945],
      arcGuideBgStyle: {
        stroke: '#CBCBCB',
        lineWidth: 18,
      },

      arcGuideLowStart: [0, 0.945],
      arcGuideLowEnd: [Math.max(0, Math.min(3, data[0].value)), 0.945],
      arcGuideLowStyle: {
        stroke: color[0],
        lineWidth: 18,
      },
      arcGuideMidStart: [3, 0.945],
      arcGuideMidEnd: [Math.max(3, Math.min(6, data[0].value)), 0.945],
      arcGuideMidStyle: {
        stroke: color[1],
        lineWidth: 18,
      },
      arcGuideHighStart: [6, 0.945],
      arcGuideHighEnd: [Math.max(6, Math.min(9, data[0].value)), 0.945],
      arcGuideHighStyle: {
        stroke: color[2],
        lineWidth: 18,
      },

      htmlGuidePosition: ['50%', '95%'],
      htmlGuideHtml: `
        <div style="width: 300px;text-align: center;">
          <p style="font-size: 20px;color: #545454;margin: 0;">合格率</p>
          <p style="font-size: 36px;color: #545454;margin: 0;">${(data[0].value) * 10}%</p>
        </div>
      `,
    };
  },
};
</script>
