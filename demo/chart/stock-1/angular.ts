import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from '../../../packages/viser-ng/src/index';
import { data, scale } from './data';
const DataSet = require('@antv/data-set');
const { DataView } = DataSet;

const tooltipOpts = {
  showTitle: false,
  itemTpl: '<li data-index={index}>'
  + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
  + '{name}{value}</li>',
};

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-chart [forceFit]="forceFit" [height]="600" [animate]="false" [padding]="[ 10, 40, 40, 40 ]"
      [data]="dv" [scale]="scale">
      <v-tooltip [showTitle]="tooltipOpts.showTitle" [itemTpl]="tooltipOpts.itemTpl"></v-tooltip>
      <v-axis></v-axis>
      <v-legend [offset]="20"></v-legend>
      <v-line [position]="'time*max'"></v-line>
    </v-chart>
  </div>
  `
})

export class AppComponent {
  forceFit: boolean = true;
  height: number = 600;
  dv = [];
  scale = scale;
  start = '2015-07-07';
  end = '2015-07-28';
  tooltipOpts = tooltipOpts;
  scales = {
    time: {
      type: 'timeCat',
      nice: false,
    }
  };
  constructor() {
    this.dv = this.getData();
  }
  ngOnChanges() {
    console.log('ngOnChanges');
  }

  getData = () => {
    console.log('getData');
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
    console.log(this, opts);
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

export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
