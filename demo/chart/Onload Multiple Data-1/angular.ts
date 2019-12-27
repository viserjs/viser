import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, GlobalG6 as G6 } from '../../../packages/viser-graph-ng/src/index';

const data = {
  isRoot: true,
  id: 'Root',
  style: {
    fill: 'red'
  },
  children: [{
    id: 'SubTreeNode1',
    raw: {},
    children: [{
      id: 'SubTreeNode1.1'
    }, {
      id: 'SubTreeNode1.2',
      children: [{
        id: 'SubTreeNode1.2.1'
      }, {
        id: 'SubTreeNode1.2.2'
      }, {
        id: 'SubTreeNode1.2.3'
      }]
    }]
  }, {
    id: 'SubTreeNode2',
    children: [{
      id: 'SubTreeNode2.1'
    }]
  }, {
    id: 'SubTreeNode3',
    children: [{
      id: 'SubTreeNode3.1'
    }, {
      id: 'SubTreeNode3.2'
    }, {
      id: 'SubTreeNode3.3'
    }]
  }, {
    id: 'SubTreeNode4'
  }, {
    id: 'SubTreeNode5'
  }, {
    id: 'SubTreeNode6'
  }]
};

let i = 0;
let count = 0;

const graph = {
  data,
  type: 'tree',
  container: 'mount',
  width: 500,
  height: 500,
  pixelRatio: 2,
  renderer: 'svg',
  modes: {
    default: [ 'collapse-expand', 'drag-canvas' ]
  },
  fitView: true,
  layout: {
    type: 'compactBox',
    direction: 'LR',
    defalutPosition: [],
    getId(d) { return d.id; },
    getHeight() { return 16 },
    getWidth() { return 16 },
    getVGap() { return 50 },
    getHGap() { return 100 }
  },
  defaultNode: {
    size: 16,
    anchorPoints: [[0,0.5], [1,0.5]],
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9'
    },
  },
};

const node = {
  formatter: node => {
    return {
      size: 16,
      anchorPoints: [[0,0.5], [1,0.5]],
      style: {
        fill: '#DEE9FF',
        stroke: '#5B8FF9'
      },
      label: node.id,
      labelCfg: {
        position: node.children && node.children.length > 0 ? 'left' : 'right'
      }
    }
  },
  events: {
    onClick: (evt: any, graph: any) => {
      const { item } = evt
      const nodeId = item.get('id');
      const model = item.getModel()
      const children = model.children;
      if(!children || children.length === 0) {
        const childData = [
          { 
            id: `child-data-${count}`,
            shape: 'rect', 
            children: [
              {
                id: `x-${count}` 
              },
              {
                id: `y-${count}` 
              }
            ] 
          },
          { 
            id: `child-data1-${count}`,
            children: [
              {
                id: `x1-${count}` 
              },
              {
                id: `y1-${count}` 
              }
            ] 
          }
        ];

        const parentData = graph.findDataById(nodeId);
        if (!parentData.children) {
          parentData.children = [];
        }
        // 如果childData是一个数组，则直接赋值给parentData.children
        // 如果是一个对象，则使用parentData.children.push(obj)
        parentData.children = childData
        graph.changeData()
        count++
      }
    }
  }
}

const edge = {
  formatter: () => {
    i++;
    return {
      shape: 'cubic-horizontal',
      color: '#A3B1BF',
      label: i
    }
  },
}
@Component({
  selector: '#mount',
  template: `
  <div>
  <v-graph [width]="graph.width" [height]="graph.height" [modes]="graph.modes"
    [defaultNode]="graph.defaultNode" type="tree"
    [layout]="graph.layout"
    [data]="graph.data">
      <v-node [events]="node.events" [formatter]="node.formatter"></v-node>
      <v-edge [formatter]="edge.formatter"></v-edge>
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
