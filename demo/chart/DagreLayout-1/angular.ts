import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, GlobalG6 as G6 } from '../../../packages/viser-graph-ng/src/index';

const data = {
  nodes: [{
    id: '1',
    type: 'alps',
    name: 'alps_file1',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  },
  {
    id: '2',
    type: 'alps',
    name: 'alps_file2',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  },
  {
    id: '3',
    type: 'alps',
    name: 'alps_file3',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  },
  {
    id: '4',
    type: 'sql',
    name: 'sql_file1',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  },
  {
    id: '5',
    type: 'sql',
    name: 'sql_file2',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  },
  {
    id: '6',
    type: 'feature_etl',
    name: 'feature_etl_1',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  },
  {
    id: '7',
    type: 'feature_etl',
    name: 'feature_etl_1',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  },
  {
    id: '8',
    type: 'feature_extractor',
    name: 'feature_extractor',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  }],
  edges: [{
    source: '1',
    target: '2'
  },
  {
    source: '1',
    target: '3'
  },
  {
    source: '2',
    target: '4'
  },
  {
    source: '3',
    target: '4'
  },
  {
    source: '4',
    target: '5'
  },
  {
    source: '5',
    target: '6'
  },
  {
    source: '6',
    target: '7'
  },
  {
    source: '6',
    target: '8'
  }]
};
G6.registerNode('sql', {
  drawShape(cfg, group) {
    const rect = group.addShape('rect', {
      attrs: {
        x: -75,
        y: -25,
        width: 150,
        height: 50,
        radius: 10,
        stroke: '#5B8FF9',
        fill: '#C6E5FF',
        lineWidth: 3
      }
    });
    if (cfg.name) {
      group.addShape('text', {
        attrs: {
          text: cfg.name,
          x: 0,
          y: 0,
          fill: '#00287E',
          fontSize: 14,
          textAlign: 'center',
          textBaseline: 'middle',
          fontWeight: 'bold'
        }
      });
    }
    return rect;
  }
},
'single-shape');
G6.Global.nodeStateStyle.selected = {
  stroke: '#d9d9d9',
  fill: '#5394ef'
};

const graph = {
  data,
  container: 'mount',
  width: 500,
  height: 500,
  layout: {
    type: 'dagre',
    nodesepFunc: d => {
      if (d.id === '3') {
        return 500;
      }
      return 50;
    },
    rankSep: 70
  },
  pixelRatio: 2,
  defaultNode: {
    shape: 'sql'
  },
  defaultEdge: {
    shape: 'polyline',
    style: {
      radius: 20,
      offset: 45,
      endArrow: true,
      lineWidth: 2,
      stroke: '#C2C8D5'
    }
  },
  modes: {
    default: [ 'drag-canvas', 'zoom-canvas', 'click-select', {
      type: 'tooltip',
      formatText(model) {
        const cfg = model.conf;
        const text = [];
        cfg.forEach(row => {
          text.push(row.label + ':' + row.value + '<br>');
        });
        return text.join('\n');
      },
      shouldUpdate: e => {
        if (e.target.type !== 'text') {
          return false;
        }
        return true;
      }
    }]
  },
  fitView: true,
};

@Component({
  selector: '#mount',
  template: `
  <div>
  <v-graph [width]="graph.width" [height]="graph.height" [modes]="graph.modes"
    [defaultNode]="graph.defaultNode"
    [layout]="graph.layout"
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
