import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, registerNode, registerEdge, Layouts } from '../../../packages/viser-graph-ng/src/index';
import {data} from './data'

// 注册脑图节点
registerNode('mindNode', {
  anchor: [[0, 0.5], [1, 0.5]]
});
// 注册脑图边
registerEdge('mindEdge', {
  getPath: function getPath(item) {
    var points = item.getPoints();
    var start = points[0];
    var end = points[points.length - 1];
    var hgap = Math.abs(end.x - start.x);
    if (end.x > start.x) {
      return [['M', start.x, start.y], ['C', start.x + hgap / 4, start.y, end.x - hgap / 2, end.y, end.x, end.y]];
    }
    return [['M', start.x, start.y], ['C', start.x - hgap / 4, start.y, end.x + hgap / 2, end.y, end.x, end.y]];
  }
});

var layout = new Layouts.Mindmap({
  direction: 'H', // 方向（LR/RL/H/TB/BT/V）
  getHGap: function getHGap() /* d */ {
    // 横向间距
    return 100;
  },
  getVGap: function getVGap() /* d */ {
    // 竖向间距
    return 10;
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
      var parent = node.getParent();
      var box = keyShape.getBBox();
      var labelBox = label.getBBox();
      var dx = (box.maxX - box.minX + labelBox.maxX - labelBox.minX) / 2 + 8;
      var dy = (box.maxY - box.minY) / 2 + 8;
      if (parent) {
        var parentModel = parent.getModel();
        if (parentModel.x > model.x) {
          dx = -dx;
        }
        dy = 0;
      } else {
        dx = 0;
      }
      label.translate(dx, dy);
    });
    graph.draw();
  }
};

const node = {
  size: 8,
  shape: 'mindNode',
  label: function label(model) {
    return {
      text: model.name,
      stroke: '#fff',
      lineWidth: 3
    };
  },
};

const edge = {
  shape: 'mindEdge'
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
