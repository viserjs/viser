import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from '../../../packages/viser-ng/src/index';
import { data, scale1, scale2 } from './data';
const DataSet = require('@antv/data-set');
const { DataView } = DataSet;

const tooltipOpts = {
  showTitle: false,
  itemTpl: '<li data-index={index}>'
  + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
  + '{name}{value}</li>',
};

const candleOpts = {
  color: ['trend', val => {
    if (val === '上涨') {
      return '#f04864';
    }

    if (val === '下跌') {
      return '#2fc25b';
    }
  }],
  tooltip: ['time*start*end*max*min', (time, start, end, max, min) => {
    return {
      name: time,
      value: '<br><span style="padding-left: 16px">开盘价：' + start + '</span><br/>'
      + '<span style="padding-left: 16px">收盘价：' + end + '</span><br/>'
      + '<span style="padding-left: 16px">最高价：' + max + '</span><br/>'
      + '<span style="padding-left: 16px">最低价：' + min + '</span>'
    };
  }],
};

const axis1Opts = {
  label: {
    formatter: val => {
      return parseInt(String(val / 1000), 10) + 'k';
    }
  }
};

const barOpts = {
  color: ['trend',  val => {
    if (val === '上涨') {
      return '#f04864';
    }

    if (val === '下跌') {
      return '#2fc25b';
    }
  }],
  tooltip: ['time*volumn', (time, volumn) => {
    return {
      name: time,
      value: '<br/><span style="padding-left: 16px">成交量：' + volumn + '</span><br/>'
    };
  }]
};
@Component({
  selector: '#mount',
  template: `
  <div>
    <v-chart [forceFit]="forceFit" [height]="400" [animate]="false" [padding]="[ 10, 40, 40, 40 ]"
      [data]="dv" [scale]="scale1">
      <v-tooltip [showTitle]="tooltipOpts.showTitle" [itemTpl]="tooltipOpts.itemTpl"></v-tooltip>
      <v-axis></v-axis>
      <v-legend [offset]="20"></v-legend>
      <v-view [data]="dv" [end]="{x: 1, y: 0.5}" >
        <v-candle position="time*range" [color]="candleOpts.color" [tooltip]="candleOpts.tooltip"></v-candle>
      </v-view>
      <v-view [data]="dv" [scale]="scale2" [start]="{x: 0, y: 0.65}" >
        <v-axis dataKey="time" [tickLine]="null" [label]="null"></v-axis>
        <v-axis dataKey="volumn" [label]="axis1Opts.label"></v-axis>
        <v-bar position="time*volumn" [color]="barOpts.color" [tooltip]="barOpts.tooltip"></v-bar>
      </v-view>
    </v-chart>
    <v-plugin>
      <v-slider [width]="'auto'" [height]="26"
        [padding]="[ 20, 40, 20, 40 ]" [start]="start" [end]="end" [data]="data"
        [xAxis]="'time'" [yAxis]="'volumn'" [scales]="scales" [onChange]="this.slideChange"
      ></v-slider>
    </v-plugin>
  </div>
  `
})
class AppComponent {
  forceFit: boolean = true;
  height: number = 600;
  data = data;
  dv = [];
  scale1 = scale1;
  scale2 = scale2;
  start = '2015-07-07';
  end = '2015-07-28';
  tooltipOpts = tooltipOpts;
  candleOpts = candleOpts;
  axis1Opts = axis1Opts;
  barOpts = barOpts;
  scales = {
    time: {
      type: 'timeCat',
      nice: false,
    }
  };
  constructor() {
    this.dv = this.getData();
  }

  getData = () => {
    const { start, end } = this;
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
  }
  slideChange = (opts: any) => {
    this.start = opts.startText;
    this.end = opts.endText;
    this.dv = this.getData();
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
export default class AppModule { }
