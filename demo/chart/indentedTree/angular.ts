import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, registerNode, registerEdge, Layouts } from '../../../packages/viser-graph-ng/src/index';
import {data} from './data'

registerNode('treeNode', {
  anchor: [[0, 0.5], [0.5, 1]]
});
registerEdge('VH', {
  getPath: function getPath(item) {
    var points = item.getPoints();
    var start = points[0];
    var end = points[points.length - 1];
    return [['M', start.x, start.y], ['L', start.x, end.y], ['L', end.x, end.y]];
  }
});

var layout = new Layouts.IndentedTree({
  direction: 'LR', // 方向（LR/RL/H）
  indent: 30, // 缩进量
  getVGap: function getVGap() /* d */ {
    // 竖向间距
    return 4;
  }
});

const graph = {
  container: 'mount',
  width: 500,
  height: 500,
  fitView: 'autoZoom',
  fitViewPadding: true,
  animate: true,
  type: 'tree',
  layout: layout,
  data: {
    roots: [data]
  },
  onAfterchange: function(ev, graph) {
    graph.getNodes().forEach(function(node) {
      var model = node.getModel();
      var label = node.getLabel();
      var keyShape = node.getKeyShape();
      var children = node.getChildren();
      var parent = node.getParent();
      var box = keyShape.getBBox();
      var labelBox = label.getBBox();
      var dx = (box.maxX - box.minX + labelBox.maxX - labelBox.minX) / 2 + 8;
      var dy = 0;
      label.translate(dx, dy);
    });
    graph.draw();
  }
};

const node = {
  shape: 'treeNode',
  size: 16,
  label: function(obj) {
    return obj.name;
  },
};
const edge = {
  shape: 'VH'
};

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-graph [width]="graph.width" [height]="graph.height"
      [fitView]="graph.fitView" [fitViewPadding]="graph.fitViewPadding"
      [animate]="graph.animate" [type]="graph.type"
      [layout]="graph.layout"
      [data]="graph.data" [onAfterchange]="graph.onAfterchange">
      <v-node [shape]="node.shape" [size]="node.size" [label]="node.label"></v-node>
      <v-edge [shape]="edge.shape"></v-edge>
    </v-graph>
  </div>
  `
})

class AppComponent {
  graph = graph;
  node = node;
  edge = edge;
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
