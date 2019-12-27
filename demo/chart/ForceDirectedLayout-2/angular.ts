import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, GlobalG6 as G6 } from '../../../packages/viser-graph-ng/src/index';
import { oriData } from './data'

const data = {
  nodes: oriData.nodes.map(function(node, i) {
    return {...node, size: Math.random() * 30 + 5 };
  }),
  edges: oriData.edges.map(function(edge, i) {
    return {...edge, id:'edge' + i };
  })
}
const graph = {
  data,
  container: 'mount',
  type: 'graph',
  width: 500,
  height: 500,
  renderer: 'svg',
  fitView: false,
  layout: {
    type: 'force',
    preventOverlap: true
  },
  defaultNode: {
    color: '#5B8FF9',
    style: {
      lineWidth: 2,
      fill: '#C6E5FF'
    }
  },
  defaultEdge: {
    size: 1,
    color: '#e2e2e2'
  },
};

const node = {
  formatter: node => {
    return {
      size: node.size,
    }
  },
  events: {
    onDragstart: (e, graph) => {
      graph.layout()
      refreshDragedNodePosition(e);
    },
    onDrag: (e) => {
      refreshDragedNodePosition(e);
    },
    onDragend: (e) => {
      e.item.get('model').fx = null;
      e.item.get('model').fy = null;
    },
  }
}

const refreshDragedNodePosition = (e) => {
  const model = e.item.get('model');
  model.fx = e.x;
  model.fy = e.y;
}

@Component({
  selector: '#mount',
  template: `
  <div>
  <v-graph [width]="graph.width" [height]="graph.height"
    [defaultNode]="graph.defaultNode"
    [layout]="graph.layout"
    [data]="graph.data" [defaultEdge]="graph.defaultEdge">
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
