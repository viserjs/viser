import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
// /Users/wuling/code/viser/demo/chart/bar-1/angular.ts
import { ViserModule } from '../ng';
import { data, dataDef, dataPre, scale } from './data'

@Component({
  selector: '#mount',
  template: `
  <Chart [width]="width" [height]="height" [data]="data" [dataDef]="dataDef">
    <Coord radius="1" innerRadius="0.6"></Coord>
    <Pie [color]="color" [label]="label"></Pie>
    <Tooltip></Tooltip>
    <Legend></Legend>
    <Axis></Axis>
  </Chart>
  `
})

export class AppComponent {
  data: any = [{
    area: '亚太地区',
    profit: 1485.54
  }, {
    area: '非洲及中东',
    profit: 330.12
  }, {
    area: '拉丁美洲',
    profit: 196.5
  }, {
    area: '中欧和东欧',
    profit: 141.48
  }, {
    area: '西欧',
    profit: 3631.32
  }, {
    area: '北美',
    profit: 2082.9
  }];
  width: number = 400;
  height: number = 400;
  color: ['#CB5050', '#A72023', '#9D1F22', '#70171A', '#461012'];
  label: boolean = true;
  dataDef = [{
    key: 'area',
    mark: ['column', 'color'],
    scale: {}
  }, {
    key: 'profit',
    mark: 'row',
    scale: {}
  }];
}

console.log(ViserModule, 'ViserModule');
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
