import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, GlobalG6 as G6 } from '../../../packages/viser-graph-ng/src/index';

G6.registerNode('stacked-bar-node', {
  draw(cfg, group) {
    /*
      G：
      Fan
      x: 扇形圆心的 x 坐标
      y: 扇形圆心的 y 坐标
      rs: 内圈半径
      re: 外圈半径
      startAngle: 起点弧度
      endAngle: 终点弧度
      clockwise: 为true时顺时针渲染，为false时逆时针渲染
    */
    const baseR = 30;
    let nowAngle = 0;
    const everyIncAngle = 2 * Math.PI * (360 / 5 / 5) / 360;
    cfg.details.forEach(cat => {
      cat.values.forEach(item => {
        const baseNbr = Math.ceil(item / 10);
        const baseIncR = 7;
        let nowStartR = baseR;
        const last = item % 10;
        const endAngle = nowAngle + everyIncAngle;
        for (let i = 0; i < baseNbr; i++) {
          group.addShape('fan', {
            attrs: {
              x: 0,
              y: 0,
              rs: nowStartR,
              re: nowStartR + baseIncR,
              startAngle: nowAngle,
              endAngle,
              clockwise: false,
              stroke: 'darkgray',
              fill: cat.color
            }
          });
          nowStartR = nowStartR + baseIncR + 2;
          if (i === baseNbr - 1 && last !== 0) {
            group.addShape('fan', {
              attrs: {
                x: 0,
                y: 0,
                rs: nowStartR,
                re: nowStartR + baseIncR * last / 10,
                startAngle: nowAngle,
                endAngle,
                clockwise: false,
                stroke: 'darkgray',
                fill: cat.color
              }
            });
          }
        }
        nowAngle = endAngle;
      });
    });

    group.addShape('circle', {
          // attrs: style
      attrs: {
        x: 0, // 居中
        y: 0,
        r: baseR,
        fill: cfg.centerColor,
        stroke: 'darkgray'
      }
    });
    if (cfg.label) {
      group.addShape('text', {
            // attrs: style
        attrs: {
          x: 0, // 居中
          y: 0,
          textAlign: 'center',
          textBaseline: 'middle',
          text: cfg.label,
          fill: 'white',
          fontStyle: 'bold'
        }
      });
    }
    return group;
  }
});

const data = {
  nodes: [
    {
      id: 'nodeF',
      x: 150,
      y: 150,
      label: 'StackedBar1',
      shape: 'stacked-bar-node',
      anchorPoints: [
          [ 0, 0.5 ], [ 1, 0.5 ]
      ],
      details: [
        { cat: 'pv', values: [ 20, 30, 40, 30, 30 ], color: '#5B8FF9' },
        { cat: 'dal', values: [ 40, 30, 20, 30, 50 ], color: '#5AD8A6' },
        { cat: 'uv', values: [ 40, 30, 30, 40, 40 ], color: '#5D7092' },
        { cat: 'sal', values: [ 20, 30, 50, 20, 20 ], color: '#F6BD16' },
        { cat: 'cal', values: [ 10, 10, 20, 20, 20 ], color: '#E8684A' }
      ],
      centerColor: '#5b8ff9'
    }, {
      id: 'nodeF2',
      x: 500,
      y: 150,
      label: 'StackedBar2',
      shape: 'stacked-bar-node',
      anchorPoints: [
          [ 0, 0.5 ], [ 1, 0.5 ]
      ],
      details: [
        { cat: 'pv', values: [ 10, 10, 80, 20, 10 ], color: '#5ad8a6' },
        { cat: 'dal', values: [ 20, 30, 10, 50, 40 ], color: '#ff99c3' },
        { cat: 'uv', values: [ 10, 50, 30, 20, 30 ], color: '#6dc8ec' },
        { cat: 'sal', values: [ 70, 30, 20, 20, 20 ], color: '#269a99' },
        { cat: 'cal', values: [ 50, 10, 20, 70, 30 ], color: '#9270CA' }
      ],
      centerColor: '#5b8ff9'
    }
  ],
  edges: [
    {
      source: 'nodeF',
      target: 'nodeF2'
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
};

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-graph [width]="graph.width" [height]="graph.height" [data]="graph.data">
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
