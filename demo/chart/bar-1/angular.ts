import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from '../../../packages/viser-ng/src/index';
import { data, scale } from './data'
const DataSet = require('@antv/data-set');

const ds: any = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'percent',
  field: 'value',
  dimension: 'country',
  groupBy: ['year'],
  as: 'percent'
});

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-chart [forceFit]="forceFit" [height]="height" [data]="data" [dataPre]="dataPre" [scale]="scale">
      <v-tooltip></v-tooltip>
      <v-axis></v-axis>
      <v-stack-bar position='year*percent' color='country' [style]="{ stroke: '#fff', lineWidth: 1 }" ></v-stack-bar>
    </v-chart>
  </div>
  `
})
class AppComponent {
  forceFit: boolean= true;
  height: number = 400;
  data = dv.rows;
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
