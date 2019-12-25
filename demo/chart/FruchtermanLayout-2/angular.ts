import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, GlobalG6 as G6 } from '../../../packages/viser-graph-ng/src/index';
import { oriData } from './data'

const colors = [ '#BDD2FD', '#BDEFDB', '#C2C8D5', '#FBE5A2', '#F6C3B7', '#B6E3F5', '#D3C6EA', '#FFD8B8', '#AAD8D8', '#FFD6E7' ];
const strokes = [ '#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#E8684A', '#6DC8EC', '#9270CA', '#FF9D4D', '#269A99', '#FF99C3' ];

const clusterMap = new Map();
let clusterId = 0;
const data = {
  nodes: oriData.nodes.map(function(node, i) {
    if (node.cluster && clusterMap.get(node.cluster) === undefined) {
      clusterMap.set(node.cluster, clusterId);
      clusterId++;
    }
    const cid = clusterMap.get(node.cluster);
    return {...node, fill: colors[cid % colors.length], stroke: strokes[cid % strokes.length] };
  }),
  edges: oriData.edges
}
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
    type: 'fruchterman',
    gravity: 10,
    speed: 5,
    clustering: true
  },
  defaultNode: {
    size: 20,
    style: {
      lineWidth: 2
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

const node = {
  formatter: node => {
    return {
      style: {
        stroke: node.stroke,
        fill: node.fill
      }
    }
  },
}

@Component({
  selector: '#mount',
  template: `
  <div>
  <v-graph [width]="graph.width" [height]="graph.height" [modes]="graph.modes"
    [defaultNode]="graph.defaultNode"
    [layout]="graph.layout"
    [data]="graph.data" [defaultEdge]="graph.defaultEdge">
      <v-node [formatter]="node.formatter"></v-node>
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
