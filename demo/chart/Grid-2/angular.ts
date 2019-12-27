import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, GlobalG6 as G6 } from '../../../packages/viser-graph-ng/src/index';

const data = {
  nodes: [{
    id: '0',
    label: '0'
  }, {
    id: '1',
    label: '1'
  }, {
    id: '2',
    label: '2'
  }, {
    id: '3',
    label: '3'
  }, {
    id: '4',
    label: '4'
  }, {
    id: '5',
    label: '5'
  }, {
    id: '6',
    label: '6'
  }, {
    id: '7',
    label: '7'
  }, {
    id: '8',
    label: '8'
  }, {
    id: '9',
    label: '9'
  }, {
    id: '10',
    label: '10'
  }, {
    id: '11',
    label: '11'
  }, {
    id: '12',
    label: '12'
  }, {
    id: '13',
    label: '13'
  }, {
    id: '14',
    label: '14'
  }, {
    id: '15',
    label: '15'
  }, {
    id: '16',
    label: '16'
  }, {
    id: '17',
    label: '17'
  }, {
    id: '18',
    label: '18'
  }, {
    id: '19',
    label: '19'
  }, {
    id: '20',
    label: '20'
  }, {
    id: '21',
    label: '21'
  }, {
    id: '22',
    label: '22'
  }, {
    id: '23',
    label: '23'
  }, {
    id: '24',
    label: '24'
  }, {
    id: '25',
    label: '25'
  }, {
    id: '26',
    label: '26'
  }, {
    id: '27',
    label: '27'
  }, {
    id: '28',
    label: '28'
  }, {
    id: '29',
    label: '29'
  }, {
    id: '30',
    label: '30'
  }, {
    id: '31',
    label: '31'
  }, {
    id: '32',
    label: '32'
  }, {
    id: '33',
    label: '33'
  }],
  edges: [{
    source: '0',
    target: '1'
  }, {
    source: '0',
    target: '2'
  }, {
    source: '0',
    target: '3'
  }, {
    source: '0',
    target: '4'
  }, {
    source: '0',
    target: '5'
  }, {
    source: '0',
    target: '7'
  }, {
    source: '0',
    target: '8'
  }, {
    source: '0',
    target: '9'
  }, {
    source: '0',
    target: '10'
  }, {
    source: '0',
    target: '11'
  }, {
    source: '0',
    target: '13'
  }, {
    source: '0',
    target: '14'
  }, {
    source: '0',
    target: '15'
  }, {
    source: '0',
    target: '16'
  }, {
    source: '2',
    target: '3'
  }, {
    source: '4',
    target: '5'
  }, {
    source: '4',
    target: '6'
  }, {
    source: '5',
    target: '6'
  }, {
    source: '7',
    target: '13'
  }, {
    source: '8',
    target: '14'
  }, {
    source: '9',
    target: '10'
  }, {
    source: '10',
    target: '22'
  }, {
    source: '10',
    target: '14'
  }, {
    source: '10',
    target: '12'
  }, {
    source: '10',
    target: '24'
  }, {
    source: '10',
    target: '21'
  }, {
    source: '10',
    target: '20'
  }, {
    source: '11',
    target: '24'
  }, {
    source: '11',
    target: '22'
  }, {
    source: '11',
    target: '14'
  }, {
    source: '12',
    target: '13'
  }, {
    source: '16',
    target: '17'
  }, {
    source: '16',
    target: '18'
  }, {
    source: '16',
    target: '21'
  }, {
    source: '16',
    target: '22'
  }, {
    source: '17',
    target: '18'
  }, {
    source: '17',
    target: '20'
  }, {
    source: '18',
    target: '19'
  }, {
    source: '19',
    target: '20'
  }, {
    source: '19',
    target: '33'
  }, {
    source: '19',
    target: '22'
  }, {
    source: '19',
    target: '23'
  }, {
    source: '20',
    target: '21'
  }, {
    source: '21',
    target: '22'
  }, {
    source: '22',
    target: '24'
  }, {
    source: '22',
    target: '25'
  }, {
    source: '22',
    target: '26'
  }, {
    source: '22',
    target: '23'
  }, {
    source: '22',
    target: '28'
  }, {
    source: '22',
    target: '30'
  }, {
    source: '22',
    target: '31'
  }, {
    source: '22',
    target: '32'
  }, {
    source: '22',
    target: '33'
  }, {
    source: '23',
    target: '28'
  }, {
    source: '23',
    target: '27'
  }, {
    source: '23',
    target: '29'
  }, {
    source: '23',
    target: '30'
  }, {
    source: '23',
    target: '31'
  }, {
    source: '23',
    target: '33'
  }, {
    source: '32',
    target: '33'
  }]
};
const graph = {
  data,
  container: 'mount',
  type: 'graph',
  width: 500,
  height: 500,
  pixelRatio: 2,
  renderer: 'svg',
  fitView: false,
  animate: true,
  modes: {
    default: [ 'zoom-canvas', 'drag-canvas', 'drag-node' ]
  },
  layout: {
    type: 'grid',
  },
  defaultNode: {
    size: 20,
  },
  defaultEdge: {
    size: 1,
    color: '#e2e2e2'
  },
};

const colors = [ '#BDD2FD', '#BDEFDB', '#C2C8D5', '#FBE5A2', '#F6C3B7', '#B6E3F5', '#D3C6EA', '#FFD8B8', '#AAD8D8', '#FFD6E7' ];
const strokes = [ '#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#E8684A', '#6DC8EC', '#9270CA', '#FF9D4D', '#269A99', '#FF99C3' ];
const node = {
  formatter: node => {
    return {
      size: 20,
      cluster: node.id,
      style: {
        fill: colors[node.id % colors.length],
        stroke: strokes[node.id % strokes.length]
      },
    }
  }
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
