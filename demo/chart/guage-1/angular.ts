import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule, OnDestroy } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule, registerShape } from '../../../packages/viser-ng/src/index';

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

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-chart [forceFit]="forceFit" [height]="height" [data]="data" [scale]="scale" [animate]="false">
      <v-coord type="polar" [startAngle]="-202.5" [endAngle]="22.5" [radius]="0.75"></v-coord>
      <v-axis
        dataKey="value"
        [zIndex]="2"
        [line]="null"
        [subTickCount]="4"
        [grid]="null"
        [label]="axisLabel"
        [subTickLine]="axisSubTickLine"
        [tickLine]="axisTickLine"
      ></v-axis>
      <v-axis dataKey="1" [show]="false"></v-axis>
      <v-series
        gemo="point"
        position="value*1"
        shape="pointer"
        color="#8C8C8C"
        [active]="false"
      ></v-series>
      <v-guide type="arc" [zIndex]="0" [top]="false" [start]="arcGuideBgStart" [end]="arcGuideBgEnd" [style]="arcGuideBgStyle"></v-guide>
      <v-guide type="arc" [zIndex]="1" [start]="arcGuideLowStart" [end]="arcGuideLowEnd" [style]="arcGuideLowStyle"></v-guide>
      <v-guide type="arc" [zIndex]="1" [start]="arcGuideMidStart" [end]="arcGuideMidEnd" [style]="arcGuideMidStyle"></v-guide>
      <v-guide type="arc" [zIndex]="1" [start]="arcGuideHighStart" [end]="arcGuideHighEnd" [style]="arcGuideHighStyle"></v-guide>
      <v-guide
        type="html"
        [position]="htmlGuidePosition"
        [html]="htmlGuideHtml"
      ></v-guide>
    </v-chart>
  </div>
  `
})
class AppComponent implements OnDestroy {
  forceFit: boolean = true;
  height = 400;
  data = [
    { value: 5.6 }
  ];
  scale = scale;

  axisLabel = {
    offset: -16,
    textStyle: {
      fontSize: 18,
      textAlign: 'center',
      textBaseline: 'middle'
    }
  };
  axisSubTickLine = {
    length: -8,
    stroke: '#fff',
    strokeOpacity: 1,
  };
  axisTickLine = {
    length: -17,
    stroke: '#fff',
    strokeOpacity: 1,
  };

  arcGuideBgStart = [0, 0.945];
  arcGuideBgEnd = [9, 0.945];
  arcGuideBgStyle = {
    stroke: '#CBCBCB',
    lineWidth: 18,
  };

  arcGuideLowStart = [0, 0.945];
  arcGuideLowEnd = [Math.max(0, Math.min(3, this.data[0].value)), 0.945];
  arcGuideLowStyle = {
    stroke: color[0],
    lineWidth: 18,
  };
  arcGuideMidStart = [3, 0.945];
  arcGuideMidEnd = [Math.max(3, Math.min(6, this.data[0].value)), 0.945];
  arcGuideMidStyle = {
    stroke: color[1],
    lineWidth: 18,
  };
  arcGuideHighStart = [6, 0.945];
  arcGuideHighEnd = [Math.max(6, Math.min(9, this.data[0].value)), 0.945];
  arcGuideHighStyle = {
    stroke: color[2],
    lineWidth: 18,
  };

  htmlGuidePosition = ['50%', '95%'];
  htmlGuideHtml = `
    <div style="width: 300px;text-align: center;">
      <p style="font-size: 20px;color: #545454;margin: 0;">合格率</p>
      <p style="font-size: 36px;color: #545454;margin: 0;">${Math.ceil(this.data[0].value * 10)}%</p>
    </div>
  `;

  timer: any;
  trend: 'up' | 'down' = 'up';

  constructor() {
    this.timer = setTimeout(this.setData, 0);
  }

  setData = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    console.log('ng-timeout');

    const delta = Math.random();
    const prevVal = this.data[0].value;
    if (this.trend === 'up') {
      const nextVal = prevVal + delta;
      if (nextVal > 9) {
        this.trend = 'down';
      } else {
        this.data = [{ value: nextVal }];
        this.arcGuideLowEnd = [Math.max(0, Math.min(3, nextVal)), 0.945];
        this.arcGuideMidEnd = [Math.max(3, Math.min(6, nextVal)), 0.945];
        this.arcGuideHighEnd = [Math.max(6, Math.min(9, nextVal)), 0.945];
        this.htmlGuideHtml = `
          <div style="width: 300px;text-align: center;">
            <p style="font-size: 20px;color: #545454;margin: 0;">合格率</p>
            <p style="font-size: 36px;color: #545454;margin: 0;">${Math.ceil(nextVal * 10)}%</p>
          </div>
        `;
      }
    } else {
      const nextVal = prevVal - delta;
      if (nextVal < 0) {
        this.trend = 'up';
      } else {
        this.data = [{ value: nextVal }];
        this.arcGuideLowEnd = [Math.max(0, Math.min(3, nextVal)), 0.945];
        this.arcGuideMidEnd = [Math.max(3, Math.min(6, nextVal)), 0.945];
        this.arcGuideHighEnd = [Math.max(6, Math.min(9, nextVal)), 0.945];
        this.htmlGuideHtml = `
          <div style="width: 300px;text-align: center;">
            <p style="font-size: 20px;color: #545454;margin: 0;">合格率</p>
            <p style="font-size: 36px;color: #545454;margin: 0;">${Math.ceil(nextVal * 10)}%</p>
          </div>
        `;
      }
    }

    this.timer = setTimeout(this.setData, 1000);
  }

  ngOnDestroy() {
    console.log('od-ng');
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ViserModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export default class AppModule {}
