import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule } from '../../../packages/viser-graph-ng/src';
const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 200
  },{
    id: 'node2',
    x: 300,
    y: 200
  }],
  edges: [{
    id: 'edge1',
    target: 'node2',
    source: 'node1'
  }]
};

var lastPoint = void 0;
const graph = {
  width: 500,
  height: 500,
  fitView: 'cc',
  fitViewPadding: true,
  animate: true,
  type: 'graph',
  data,
  onClick: function(ev, graph) {
    console.log('click', ev, graph);
  },
  onDragstart: (ev, graph) => {
    graph.css({
      cursor: '-webkit-grabbing'
    });
  },
  onDrag: (ev, graph) => {
    if (lastPoint) {
      graph.translate(ev.domX - lastPoint.x, ev.domY - lastPoint.y);
    }
    lastPoint = {
      x: ev.domX,
      y: ev.domY
    };
  },
  onDragend:(ev, graph) => {
    lastPoint = undefined;
    graph.css({
      cursor: '-webkit-grab'
    });
  }
};
const zoom = {
  min: 1,
  max: 10,
  current: 2,
};

@Component({
  selector: '#mount',
  template: `
  <div>
    <button (click)="change()">click</button>
    <v-graph [width]="graph.width" [height]="graph.height"
      [fitView]="graph.fitView" [fitViewPadding]="graph.fitViewPadding"
      [animate]="graph.animate" [type]="graph.type"
      [data]="data" [onClick]="graph.onClick"
      [onDragstart]="graph.onDragstart" [onDrag]="graph.onDrag" [onDragend]="graph.onDragend">
      <v-zoom [max]="zoom.max" [min]="zoom.min" [current]="zoom.current"></v-zoom>
    </v-graph>
  </div>
  `
})

class AppComponent {
  data = data;
  graph = graph;
  zoom = zoom;

  change() {
    this.data = Object.assign({}, {
      nodes: [{
        id: 'node4',
        x: 100,
        y: 200
      },{
        id: 'node5',
        x: 300,
        y: 200
      },{
        id: 'node6',
        x: 400,
        y: 200
      }],
      edges: [{
        id: 'edge5',
        target: 'node4',
        source: 'node5'
      }]
    });
    this.zoom = Object.assign({}, {
      min: 1,
      max: 10,
      current: 1,
    });
  }
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
