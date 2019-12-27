import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, GlobalG6 as G6 } from '../../../packages/viser-graph-ng/src/index';
import { data } from './data';

const graph = {
  data,
  container: 'mount',
  type: 'graph',
  width: 500,
  height: 500,
  pixelRatio: 1.0,
  renderer: 'canvas',
  fitView: false,
  modes: {
    default: [ 'drag-canvas', 'drag-node' ]
  },
  layout: {
    type: 'concentric',
    maxLevelDiff: 0.5,
    sortBy: 'degree'
  },
  animate: true,
  defaultNode: {
    size: 5,
    style: {
      fill: '#C6E5FF',
      stroke: '#5B8FF9'
    }
  },
  defaultEdge: {
    size: 1,
    color: '#e2e2e2',
  },
};

@Component({
  selector: '#mount',
  template: `
  <div>
  <v-graph [width]="graph.width" [height]="graph.height" [modes]="graph.modes"
    [defaultNode]="graph.defaultNode"
    [layout]="graph.layout"
    [data]="graph.data" [defaultEdge]="graph.defaultEdge">
    </v-graph>
  </div>
  `
})

class AppComponent {
  data = data;
  graph = graph;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ViserGraphModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export default class AppModule {}
