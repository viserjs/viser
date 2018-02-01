import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from '../../../packages/viser-ng/src/index';
import { sourceData, scale } from './data';
const DataSet = require('@antv/data-set');
const { DataView } = DataSet;

const facetOpts = {
  views: (view, facet) => {
    const { colValue, data } = facet;
    let color;
    let alias;
    if (colValue === 'rain') {
      color = '#1890ff';
      alias = '降雨量(mm)';

    } else if (colValue === 'flow') {
      color = '#2FC25B';
      alias = '流量(m^3/s)';
    }

    return {
      data,
      scale: [{
        dataKey: colValue,
        alias,
      }],
      series: [{
        quickType: 'line',
        position: `time*${colValue}`,
        color,
      }]
    };
  }
};

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-chart [forceFit]="forceFit" [height]="400" [animate]="false" [padding]="[ 20, 20, 0, 80]"
      [data]="chartDv" [scale]="scale">
      <v-axis></v-axis>
      <v-facet type="mirror" [fields]="['type']" [showTitle]="false" [padding]="[ 0, 0, 40, 0]" [views]="facetOpts.views"></v-facet>
    </v-chart>
    <v-plugin>
      <v-slider width="auto" [height]="26"
        [start]="start" [end]="end" [data]="originDv"
        [xAxis]="'time'" [yAxis]="'value'" [scales]="scales"
        [backgroundChart]="{
          type: 'line'
        }"
        [onChange]="this.slideChange"
      ></v-slider>
    </v-plugin>
  </div>
  `
})

export class AppComponent {
  forceFit: boolean = true;
  height: number = 600;
  data = sourceData;
  scale = scale;
  originDv = [];
  chartDv = [];
  start =  '2009/7/20 0:00';
  end = '2009/7/25 0:00';
  facetOpts = facetOpts;
  scales = {
    time: {
      type: 'time',
      tickCount: 10,
      mask: 'M/DD H:mm'
    }
  };
  constructor() {
    const data = this.getData();
    this.originDv = data.originDv;
    this.chartDv = data.chartDv;
  }

  getData = () => {
    const { start,end } = this;
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const ds = new DataSet({
      state: {
        start,
        end,
      }
    });
    const originDv = ds.createView();
    originDv.source(sourceData)
      .transform({
        type: 'fold',
        fields: [ 'rain', 'flow' ],
        key: 'type',
        value: 'value',
        retains: [ 'rain', 'flow', 'time' ]
      });

    const chartDv = ds.createView();
    chartDv.source(originDv)
      .transform({
        type: 'fold',
        fields: [ 'rain', 'flow' ],
        key: 'type',
        value: 'value',
        retains: [ 'rain', 'flow', 'time' ]
      })
      .transform({
        type: 'filter',
        callback(obj) {
          const time = new Date(obj.time).getTime(); // !注意：时间格式，建议转换为时间戳进行比较
          return time >= startTime && time <= endTime;
        }
      });
    return { originDv, chartDv };
  }
  slideChange = (opts: any) => {
    this.start = opts.startValue;
    this.end = opts.endValue;
    const data = this.getData();
    this.originDv = data.originDv;
    this.chartDv = data.chartDv;
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
  bootstrap: [AppComponent]
})

export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
