import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, GlobalG6 as G6 } from '../../../packages/viser-graph-ng/src/index';
import { data } from './data'

const graph = {
  data,
  container: 'mount',
  type: 'graph',
  width: 500,
  height: 500,
  renderer: 'svg',
  fitView: false,
  animate: true,
  layout: {
    type: 'radial',
    unitRadius: 70,
    preventOverlap: true,
    strictRadial: false
  },
  defaultNode: {
    size: 20,
    style: {
      lineWidth: 2,
      fill: '#C6E5FF',
      stroke: '#5B8FF9'
    }
  },
  defaultEdge: {
    size: 1,
    color: '#e2e2e2',
    style: {
      endArrow: {
        path: 'M 4,0 L -4,-4 L -4,4 Z',
        d: 4
      }
    }
  },
  modes: {
    default: [ 'drag-canvas', 'drag-node' ]
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
