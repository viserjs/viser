import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, GlobalG6 as G6 } from '../../../packages/viser-graph-ng/src/index';

const data = {
  nodes: [
    {
      id: 'rect',
      label: 'rect',
      x: 250,
      y: 150
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
    default: [ 'drag-canvas', 'drag-node' ]
  },
  defaultNode: {
    shape: 'rect',
    size: [ 160, 80 ],
    style: {
      fill: '#9EC9FF',
      stroke: '#5B8FF9',
      lineWidth: 3
    },
    labelCfg: {
      style: {
        fill: '#fff',
        fontSize: 18
      }
    },
    linkPoints: {
      top: true,
      bottom: true,
      left: true,
      right: true,
      size: 5,
      fill: '#fff',
      lineWidth: 1,
      stroke: '#1890FF'
    }
  },
  nodeStateStyles: {
    // 鼠标hover状态下的配置
    hover: {
      fillOpacity: 0.8
    },
    // 选中节点状态下的配置
    selected: {
      lineWidth: 5
    }
  }
};
const node = {
  events: {
    onMouseenter: (evt, graph) => {
      const { item } = evt;
      graph.setItemState(item, 'hover', true);
    },
    onMouseleave: (evt, graph) => {
      const { item } = evt;
      graph.setItemState(item, 'hover', false);
    },
    onClick: (evt, graph) => {
      const { item } = evt;
      graph.setItemState(item, 'selected', true);
    }
  }
}


@Component({
  selector: '#mount',
  template: `
  <div>
    <v-graph [width]="graph.width" [height]="graph.height" [modes]="graph.modes"
      [defaultNode]="graph.defaultNode" [nodeStateStyles]="graph.nodeStateStyles"
      [layout]="graph.layout"
      [data]="graph.data">
      <v-node [events]="node.events"></v-node>
    </v-graph>
  </div>
  `
})

class AppComponent {
  data = data;
  graph = graph;
  node = node;
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
