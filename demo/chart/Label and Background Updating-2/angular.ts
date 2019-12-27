import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, GlobalG6 as G6 } from '../../../packages/viser-graph-ng/src/index';

const img = new Image();
img.src = 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg';

  // 点击图片节点，切换背景图片
const img2 = new Image();
img2.src = 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wAmHQJbNVdwAAAAAAAAAAABkARQnAQ';
const data = {
  nodes: [{
    x: 150,
    y: 100,
    shape: 'circleNode',
    label: 'circle',
    id: 'node1',
    labelCfg: {
      position: 'center'
    }
  }, {
    x: 350,
    y: 100,
    shape: 'image',
    id: 'node2',
    img: img.src,
    size: [ 120, 60 ],
    label: '头像',
    style: {
      cursor: 'pointer'
    },
    labelCfg: {
      position: 'bottom'
    }
  }],
  edges: [{
    source: 'node1',
    target: 'node2',
    label: 'line',
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
  defaultNode: {
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9'
    }
  },
  defaultEdge: {
    color: '#e2e2e2'
  },
  modes: {
    default: [ 'drag-node', {
      type: 'drag-node'
    }]
  }
};
const node = {
  events: { 
    onClick: (evt, graph) => {
      const target = evt.target;
      const type = target.get('type');
      const hasChangeBg = target.get('hasChangeBg');
      if (type === 'image') {
        if (!hasChangeBg) {
          // 点击图片节点时，切换背景图片
          target.attr('img', img2);
          target.attr('imgSrc', 'http://seopic.699pic.com/photo/50055/5642.jpg_wh1200.jpg');
          target.set('hasChangeBg', true);
        } else {
          target.attr('img', img);
          target.attr('imgSrc', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566553535233&di=b0b17eeea7bd7356a6f42ebfd48e9441&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F64%2F29%2F01300543361379145388299988437_s.jpg');
          target.set('hasChangeBg', false);
        }
        graph.paint();
      }
    }
  }
}

@Component({
  selector: '#mount',
  template: `
  <div>
  <v-graph [width]="graph.width" [height]="graph.height" [modes]="graph.modes"
    [defaultNode]="graph.defaultNode"
    [data]="graph.data" [defaultEdge]="graph.defaultEdge">
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
