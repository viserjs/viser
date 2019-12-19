import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, GlobalG6 as G6 } from '../../../packages/viser-graph-ng/src/index';

const data = {
  id: "Modeling Methods",
  children: [
    {
      id: "Classification",
      children: [
        { id: "Logistic regression" },
        { id: "Linear discriminant analysis" },
        { id: "Rules" },
        { id: "Decision trees" },
        { id: "Naive Bayes" },
        { id: "K nearest neighbor" },
        { id: "Probabilistic neural network" },
        { id: "Support vector machine" }
      ]
    },
    {
      id: "Consensus",
      children: [
        {
          id: "Models diversity",
          children: [
            { id: "Different initializations" },
            { id: "Different parameter choices" },
            { id: "Different architectures" },
            { id: "Different modeling methods" },
            { id: "Different training sets" },
            { id: "Different feature sets" }
          ]
        },
        {
          id: "Methods",
          children: [
            { id: "Classifier selection" },
            { id: "Classifier fusion" }
          ]
        },
        {
          id: "Common",
          children: [
            { id: "Bagging" },
            { id: "Boosting" },
            { id: "AdaBoost" }
          ]
        }
      ]
    },
    {
      id: "Regression",
      children: [
        { id: "Multiple linear regression" },
        { id: "Partial least squares" },
        { id: "Multi-layer feedforward neural network" },
        { id: "General regression neural network" },
        { id: "Support vector regression" }
      ]
    }
  ]
};

const graph = {
  data,
  container: 'mount',
  type: 'tree',
  width: 500,
  height: 500,
  pixelRatio: 2,
  renderer: 'svg',
  fitView: true,
  modes: {
    default: ['collapse-expand', 'drag-canvas']
  },
  defaultNode: {
    size: 26,
    anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]],
  },
  layout: {
    type: 'mindmap',
    direction: 'H',
    getId(d) { return d.id; },
    getHeight() { return 16 },
    getWidth() { return 16 },
    getVGap() { return 10 },
    getHGap() { return 100 },
    getSide() { return 'right' }
  }
};
const node = {
  formatter: node => {
    let centerX = 0;
    if (node.id === 'Modeling Methods') {
      centerX = node.x;
    }
    return {
      size: 26,
      style: {
        fill: '#C6E5FF',
        stroke: '#5B8FF9'
      },
      label: node.id,
      labelCfg: {
        position: node.children && node.children.length > 0 ? 'left' : node.x > centerX ? 'right' : 'left',
          offset: 5
      }
    }
  }
}
const edge = {
  formatter: () => {
    return {
      shape: 'cubic-horizontal',
      color: '#A3B1BF',
    }
  },
}


@Component({
  selector: '#mount',
  template: `
  <div>
    <v-graph type="tree" [width]="graph.width" [height]="graph.height" [modes]="graph.modes"
      [defaultNode]="graph.defaultNode"
      [layout]="graph.layout"
      [data]="graph.data">
      <v-node [formatter]="node.formatter"></v-node>
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
