import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, GlobalG6 as G6 } from '../../../packages/viser-graph-ng/src/index';

const data = {
  nodes: [{
    id: '0',
    x: 150,
    y: 50
  }, {
    id: '1',
    x: 350,
    y: 250
  }],
  edges: [
// 内置弧线
    {
      id: 'edge0',
      source: '0',
      target: '1',
      label: 'curveOffset = 20',
      curveOffset: 20
    },
// 配置内置折线的弯折弧度、端点最小距离
    {
      id: 'edge1',
      source: '0',
      target: '1',
      label: 'curveOffset = 50',
      curveOffset: 50
    },
// // 带有 controlPoints，则按照给定控制点弯折
    {
      id: 'edge2',
      source: '0',
      target: '1',
      label: 'curveOffset = -50',
      curveOffset: -50
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
  linkCenter: true,
  modes: {
    default: [ 'drag-node' ]
  },
  defaultNode: {
    size: 45,
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9'
    }
  },
  defaultEdge: {
    shape: 'arc',
    style: {
      stroke: '#F6BD16'
    },
    labelCfg: {
      autoRotate: true,
      refY: -10
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
