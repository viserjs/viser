# viser-ng [![npm](https://img.shields.io/npm/v/viser-ng.svg)](https://www.npmjs.com/package/viser-ng) [![Dependency Status](https://david-dm.org/viserjs/viser-ng.svg?path=packages/viser-ng)](https://david-dm.org/viserjs/viser-ng.svg?path=packages/viser-ng)

> A toolkit fit for data vis engineer (angular version).

## Install

```sh
$ npm install --save viser-ng
```

## Usage

```ts
import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from 'viser-ng';

const data = [
  { month: 'Jan', Tokyo: 7.0, London: 3.9 },
  { month: 'Feb', Tokyo: 6.9, London: 4.2 },
  { month: 'Mar', Tokyo: 9.5, London: 5.7 },
  { month: 'Apr', Tokyo: 14.5, London: 8.5 },
  { month: 'May', Tokyo: 18.4, London: 11.9 },
  { month: 'Jun', Tokyo: 21.5, London: 15.2 },
  { month: 'Jul', Tokyo: 25.2, London: 17.0 },
  { month: 'Aug', Tokyo: 26.5, London: 16.6 },
  { month: 'Sep', Tokyo: 23.3, London: 14.2 },
  { month: 'Oct', Tokyo: 18.3, London: 10.3 },
  { month: 'Nov', Tokyo: 13.9, London: 6.6 },
  { month: 'Dec', Tokyo: 9.6, London: 4.8 }
];

const dataPre = {
  transform: [{
    type: 'fold',
    fields: ['Tokyo', 'London'],
    key: 'city',
    value: 'temperature',
  }]
};

const dataMapping = [
  {
    key: 'month',
    mark: 'column',
  }, {
    key: 'city',
    mark: 'color',
  }, {
    key: 'temperature',
    mark: 'row',
  },
];

const scale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.2%',
}];

@Component({
  selector: '#mount',
  template: `
  <div>
    <Chart [forceFit]="forceFit" [height]="height" [data]="data" [dataPre]="dataPre" [dataMapping]="dataMapping" [scale]="scale">
      <Tooltip></Tooltip>
      <Axis></Axis>
      <StackBar [ngStyle]="{ stroke: '#fff', lineWidth: 1 }" ></StackBar>
    </Chart>
    <LiteChart stackBar="true" [height]="height" [data]="data" [dataMapping]="dataMapping" [forceFit]="forceFit"></LiteChart>
  </div>
  `
})

class AppComponent {
  forceFit: boolean = true;
  height: number = 400;
  data = data;
  dataPre = dataPre;
  dataMapping = dataMapping;
  scale = scale;
  fields = ['cut', 'clarity'];
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
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
```
