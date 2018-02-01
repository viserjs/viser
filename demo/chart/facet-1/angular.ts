import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from '../../../packages/viser-ng/src/index';
import { sourcedata } from './data'
const DataSet = require('@antv/data-set');
const { DataView } = DataSet;

const scale = [{
  dataKey: 'mean',
  sync: true
}, {
  dataKey: 'cut',
  sync: true,
}];

const views = (view, facet) => {
  const data = facet.data;
  const dv = new DataView();
  dv.source(data).transform({
    type: 'aggregate',
    fields: [ 'price' ],
    operations: [ 'mean' ],
    as: [ 'mean' ],
    groupBy: [ 'cut' ]
  });

  return {
    data: dv,
    series: {
      quickType: 'bar',
      position: 'cut*mean',
      color: 'cut',
    }
  }
}

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-chart [forceFit]="forceFit" [height]="600" [data]="chartData" [scale]="scale">
      <v-tooltip></v-tooltip>
      <v-legend></v-legend>
      <v-coord type="polar"></v-coord>
      <v-facet type="circle" [fields]="fields" [views]="views"></v-facet>
    </v-chart>
  </div>
  `
})
class AppComponent {
  forceFit: boolean = true;
  height: number = 600;
  chartData = sourcedata;
  scale = scale;
  opacity = 0.3;
  size = 3;
  fields = ['clarity'];
  views = views;
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

export default class AppModule {}
