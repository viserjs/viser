import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, GlobalG6 as G6 } from '../../../packages/viser-graph-ng/src/index';

const data = {
  nodes: [
    {
      id: 'node1',
      label: 'node1-group1',
      groupId: 'group1',
      x: 100,
      y: 100
    },
    {
      id: 'node2',
      label: 'node2-group2',
      groupId: 'group1',
      x: 150,
      y: 200
    },
    {
      id: 'node3',
      label: 'node3-group2',
      groupId: 'group2',
      x: 300,
      y: 200
    },
    {
      id: 'node10',
      label: 'node10-p2',
      groupId: 'p2',
      x: 300,
      y: 310
    }
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2'
    },
    {
      source: 'node2',
      target: 'node3'
    },
    {
      source: 'node1',
      target: 'node3'
    },
    {
      source: 'node6',
      target: 'node1'
    }
  ],
  groups: [
    {
      id: 'group1',
      title: {
        text: '我的群组1',
        stroke: '#444'
      }
    },
    {
      id: 'group2',
      title: {
        text: '群组2',
        stroke: '#444'
      },
      parentId: 'p2'
    },
    {
      id: 'p2',
      title: '群组3'
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
  defaultNode: {
    shape: 'circle',
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9'
    }
  },
  defaultEdge: {
    color: '#e2e2e2'
  },
  modes: {
    default: [ 'drag-canvas', 'drag-group', 'drag-node-with-group', 'collapse-expand-group' ]
  },
  groupType: 'rect'
};

@Component({
  selector: '#mount',
  template: `
  <div>
  <v-graph [width]="graph.width" [height]="graph.height" [modes]="graph.modes"
    [defaultNode]="graph.defaultNode"
    [groupType]="graph.groupType"
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
