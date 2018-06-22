import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, registerNode, registerEdge, Layouts, Util } from '../../../packages/viser-graph-ng/src';

var getTreeData = function getTreeData(x1, y1, angle, depth, nodes, edges) {
  var nodes = nodes && arguments[4] !== undefined ? arguments[4] : [];
  var edges = edges && arguments[5] !== undefined ? arguments[5] : [];

  var deg_to_rad = Math.PI / 180;
  if (depth !== 0) {
    var x2 = x1 + Math.cos(angle * deg_to_rad) * depth * 10.0;
    var y2 = y1 + Math.sin(angle * deg_to_rad) * depth * 10.0;
    var id1 = Util.guid();
    var id2 = Util.guid();
    nodes.push({
      id: id1,
      x: x1,
      y: y1
    });
    nodes.push({
      id: id2,
      x: x2,
      y: y2
    });
    edges.push({
      source: id1,
      target: id2
    });
    getTreeData(x2, y2, angle - 30, depth - 1, nodes, edges);
    getTreeData(x2, y2, angle + 30, depth - 1, nodes, edges);
  }
  return {
    nodes: nodes,
    edges: edges
  };
};
var data = getTreeData(0, 0, -90, 9, null, null);

const graph = {
  container: 'mount',
  width: 500,
  height: 500,
  fitView: 'autoZoom',
  fitViewPadding: true,
  animate: true,
  type: 'graph',
  data,
};

const node = {
  size: 2
};

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-graph [width]="graph.width" [height]="graph.height"
      [fitView]="graph.fitView" [fitViewPadding]="graph.fitViewPadding"
      [animate]="graph.animate" [type]="graph.type"
      [data]="graph.data" >
      <v-node [size]="node.size" ></v-node>
    </v-graph>
  </div>
  `
})

class AppComponent {
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
