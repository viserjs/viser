import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, GlobalG6 as G6 } from '../../../packages/viser-graph-ng/src/index';

const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 100,
    label: 'hover 前的\n节点文本 node1'
  }, {
    id: 'node2',
    x: 400,
    y: 100,
    label: 'hover 前的\n节点文本 node2'
  }],
  edges: [{
    source: 'node1',
    target: 'node2',
    label: 'hover 前的边文本',
    labelCfg: {
      refY: 10
    }
  }]
};
const graph = {
  data,
  container: 'mount',
  type: 'graph',
  width: 500,
  height: 500,
  renderer: 'svg',
  defaultEdge: {
    color: '#e2e2e2',
    lineAppendWidth: 3
  },
  defaultNode: {
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9'
    }
  },
  nodeStateStyles: {
    hover: {
      lineWidth: 5,
      fillOpacity: 1
    }
  },
  edgeStateStyles: {
    hover: {
      lineWidth: 3
    }
  }
};

const node = {
  events: {
    onMouseenter: (evt, graph) => {
      const node = evt.item;
      const model = node.getModel();
      model.oriLabel = model.label;
      graph.setItemState(node, 'hover', true);
      graph.updateItem(node, {
        label: 'hover 后 ' + model.id,
        labelCfg: {
          style: {
            fill: '#003a8c'
          }
        }
      });
    },
    onMouseleave: (evt, graph) => {
      const node = evt.item;
      const model = node.getModel();
      graph.setItemState(node, 'hover', false);
      graph.updateItem(node, {
        label: model.oriLabel,
        labelCfg: {
          style: {
            fill: '#555'
          }
        }
      });
    },
  }
}

const edge = {
  events: {
    onMouseenter: (evt, graph) => {
      const edge = evt.item;
      const model = edge.getModel();
      model.oriLabel = model.label;
      graph.setItemState(edge, 'hover', true);
      graph.updateItem(edge, {
        label: 'hover 后',
        labelCfg: {
          style: {
            fill: '#003a8c'
          }
        }
      });
    },
    onMouseleave: (evt, graph) => {
      const edge = evt.item;
      graph.setItemState(edge, 'hover', false);
      graph.updateItem(edge, {
        label: 'hover 前的边文本',
        labelCfg: {
          style: {
            fill: '#555'
          }
        }
      });
    },
  }
}

@Component({
  selector: '#mount',
  template: `
  <div>
  <v-graph [width]="graph.width" [height]="graph.height" [modes]="graph.modes"
    [defaultNode]="graph.defaultNode" [nodeStateStyles]="graph.nodeStateStyles"
    [layout]="graph.layout" [edgeStateStyles]="graph.edgeStateStyles"
    [data]="graph.data" [defaultEdge]="graph.defaultEdge">
      <v-node [events]="node.events"></v-node>
      <v-edge [events]="edge.events"></v-edge>
    </v-graph>
  </div>
  `
})

class AppComponent {
  data = data;
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
