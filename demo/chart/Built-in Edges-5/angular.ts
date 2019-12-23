import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, GlobalG6 as G6 } from '../../../packages/viser-graph-ng/src/index';

const data = {
  nodes: [{
    id: 'node5',
    x: 150,
    y: 200,
    label: '5',
    anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]]
  }, {
    id: 'node6',
    x: 300,
    y: 150,
    label: '6',
    anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]]
  }, {
    id: 'node7',
    x: 300,
    y: 250,
    label: '7',
    anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]]
  }],
  edges: [{
    source: 'node5',
    target: 'node6',
    shape: 'cubic-horizontal'
  }, {
    source: 'node5',
    target: 'node7',
    shape: 'cubic-horizontal'
  }]
};

const graph = {
  data,
  type: 'graph',
  container: 'mount',
  width: 500,
  height: 500,
  pixelRatio: 2,
  renderer: 'svg',
  fitView: true,
  modes: {
    default: [ 'drag-node' ]
  },
  defaultNode: {
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9'
    }
  },
  defaultEdge: {
    shape: 'cubic-horizontal',
    style: {
      stroke: '#F6BD16'
    }
  },
};


@Component({
  selector: '#mount',
  template: `
  <div>
    <v-graph [width]="graph.width" [height]="graph.height" [modes]="graph.modes"
      [defaultNode]="graph.defaultNode" [defaultEdge]="graph.defaultEdge"
      [layout]="graph.layout"
      [data]="graph.data">
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
