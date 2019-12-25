import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, GlobalG6 as G6 } from '../../../packages/viser-graph-ng/src/index';

G6.registerNode('my-rect', {
  getAnchorPoints: function getAnchorPoints() {
    return [[ 0.5, 0 ], [ 0.5, 1 ]];
  }
}, 'rect');

const data = {
  nodes: [{
    id: 'node0',
    x: 200,
    y: 10,
    size: 20
  }, {
    id: 'node1',
    x: 200,
    y: 50,
    label: '1222',
    shape: 'my-rect'
  }, {
    id: 'node2',
    x: 150,
    y: 150,
    shape: 'my-rect'
  }, {
    id: 'node3',
    x: 250,
    y: 150,
    shape: 'my-rect'
  }, {
    id: 'node4',
    x: 200,
    y: 250,
    shape: 'my-rect'
  }],
  edges: [{
    source: 'node0',
    target: 'node1'
  }, {
    source: 'node1',
    target: 'node2'
  }, {
    source: 'node1',
    target: 'node3'
  }, {
    source: 'node2',
    target: 'node4'
  }, {
    source: 'node3',
    target: 'node4'
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
    shape: 'cubic-vertical',
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
