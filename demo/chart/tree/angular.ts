import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule } from '../../../packages/viser-graph-ng/src/index';
const data = {
  roots: [{
    label: 'root',
    id:1,
    children: [{
      label: 'child1',
      children: [
        {
          label: 'child\n1.1'
        }
      ]
    }, {
      label: 'child2'
    }]
  }]
};

const graph = {
  width: 500,
  height: 500,
  fitView: 'cc',
  fitViewPadding: true,
  animate: true,
  type: 'tree',
  data,
  onClick: function(ev, graph) {
    console.log('click', ev, graph);
  }
};
const zoom = {
  min: 1,
  max: 10,
};

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-graph [width]="graph.width" [height]="graph.height"
      [fitView]="graph.fitView" [fitViewPadding]="graph.fitViewPadding"
      [animate]="graph.animate" [type]="graph.type"
      [data]="data" [onClick]="graph.onClick">
      <v-zoom [max]="zoom.max" [min]="zoom.min"></v-zoom>
    </v-graph>
  </div>
  `
})

class AppComponent {
  data = data;
  graph = graph;
  zoom = zoom;
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
