import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, GlobalG6 as G6 } from '../../../packages/viser-graph-ng/src/index';

const data = {
  nodes: [
    {
      id: 'ellipse',
      label: 'Ellipse',
      x: 250,
      y: 150
    }
  ]
};

const graph = {
  data,
  type: 'graph',
  container: 'mount',
  width: 500,
  height: 500,
  pixelRatio: 2,
  renderer: 'svg',
  fitView: true,
  modes: {
    default: [ 'drag-canvas', 'drag-node' ]
  },
  defaultNode: {
    shape: 'ellipse',
    size: [ 180, 100 ],
    style: {
      fill: '#9EC9FF',
      stroke: '#5B8FF9',
      lineWidth: 3
    },
    labelCfg: {
      style: {
        fill: '#1890ff',
        fontSize: 18
      },
      position: 'bottom'
    },
    // 节点上左右上下四个方向上的链接circle配置
    linkPoints: {
      top: true,
      right: false,
      bottom: true,
      left: false,
      // circle的大小
      size: 5,
      lineWidth: 1,
      fill: '#fff',
      stroke: '#1890FF'
    },
    // 节点中icon配置
    icon: {
      // 是否显示icon，值为 false 则不渲染icon
      show: true,
      // icon的地址，字符串类型
      img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      width: 60,
      height: 60
    }
  },
  nodeStateStyles: {
    // 鼠标hover状态下的配置
    hover: {
      fillOpacity: 0.8
    },
    // 选中节点状态下的配置
    selected: {
      lineWidth: 5
    }
  }
};
const node = {
  events: {
    onMouseenter: (evt, graph) => {
      const { item } = evt;
      graph.setItemState(item, 'hover', true);
    },
    onMouseleave: (evt, graph) => {
      const { item } = evt;
      graph.setItemState(item, 'hover', false);
    },
    onClick: (evt, graph) => {
      const { item } = evt;
      graph.setItemState(item, 'selected', true);
    }
  }
}


@Component({
  selector: '#mount',
  template: `
  <div>
    <v-graph [width]="graph.width" [height]="graph.height" [modes]="graph.modes"
      [defaultNode]="graph.defaultNode" [nodeStateStyles]="graph.nodeStateStyles"
      [layout]="graph.layout"
      [data]="graph.data">
      <v-node [events]="node.events"></v-node>
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
