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
    style: {
      fill: '#C6E5FF',
      stroke: '#5B8FF9'
    }
  },
  defaultEdge: {
    style: {
      stroke: '#A3B1BF'
    }
  },
  layout: {
    type: 'compactBox',
    direction: 'RL',
    radial: true,
    getId(d) { return d.id; },
    getHeight() { return 26 },
    getWidth() { return 26 },
    getVGap() { return 20 },
    getHGap() { return 30 }
  }
};
const node = {
  formatter: node => {
    return {
      size: 26,
      style: {
        fill: '#C6E5FF',
        stroke: '#5B8FF9'
      },
      label: node.id,
    }
  }
}

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-graph type="tree" [width]="graph.width" [height]="graph.height" [modes]="graph.modes"
      [defaultNode]="graph.defaultNode" [defaultEdge]="graph.defaultEdge"
      [layout]="graph.layout"
      [data]="graph.data">
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
