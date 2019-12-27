import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, GlobalG6 as G6 } from '../../../packages/viser-graph-ng/src/index';

const data = {
  nodes: [{
    id: '0',
    x: 150,
    y: 150
  }, {
    id: '1',
    x: 350,
    y: 150
  }],
  edges: [
  // 内置 loop
    {
      source: '0',
      target: '0'
    },
    {
      source: '1',
      target: '1'
    }
  ]
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
    shape: 'loop',
    style: {
      stroke: '#F6BD16',
      endArrow: {
        path: 'M 10,0 L -10,-10 L -10,10 Z',
        d: 10
      }
    },
    // 更多关于 loop 的配置请参考http://antv.alipay.com/zh/docs/manual/middle/elements/edges/loop/#%E8%87%AA%E7%8E%AF%E7%89%B9%E6%AE%8A%E9%85%8D%E7%BD%AE-loopcfg
    loopCfg: {
      position: 'top'
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
