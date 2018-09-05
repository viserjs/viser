import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from '../../../packages/viser-ng/src/index';
import { data, scale } from './data';
const DataSet = require('@antv/data-set');

const ds = new DataSet();
const dv = ds.createView().source(data, {
  type: 'graph',
  edges: d => d.links
});

dv.transform({
  type: 'diagram.arc',
  sourceWeight: e => e.sourceWeight,
  targetWeight: e => e.targetWeight,
  weight: true,
  marginRatio: 0.3
});

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-chart [forceFit]="forceFit" [height]="height" [data]="data" [scale]="scale">
      <v-view viewId="2" [data]="edgesData">
        <v-coord type="polar" direction="yReverse" [rotate]="90"></v-coord>
        <v-edge position="x*y" color="source" shape="arc" opacity="0.5" tooltip="source*target*value"></v-edge>
      </v-view>
      <v-view viewId="3" [data]="nodesData">
        <v-coord type="polar" direction="yReverse" [rotate]="90"></v-coord>
        <v-polygon position="x*y" color="id" [label]="label" ></v-polygon>
      </v-view>
    </v-chart>
  </div>
  `
})
class AppComponent {
  forceFit: boolean= true;
  height: number = 600;
  edgesData = dv.edges;
  nodesData = dv.nodes;
  scale = scale;
  label = [
    'name', {
      labelEmit: true,
      textStyle: {
        fill: '#8c8c8c'
      },
    }
  ];
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
