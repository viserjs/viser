import { ViserGraph } from '../../../packages/viser-graph/src/index';

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

new ViserGraph({
  data,
  graph: {
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
    layout: {
      type: 'dendrogram',
      direction: 'LR',
      nodeSep: 30,
      rankSep: 100
    }
  },
  node: {
    formatter: node => {
      return {
        size: 26,
        anchorPoints: [[0,0.5], [1,0.5]],
        style: {
          fill: '#C6E5FF',
          stroke: '#5B8FF9'
        },
        label: node.id,
        labelCfg: {
          position: node.children && node.children.length > 0 ? 'left' : 'right',
          offset: 5
        }
      }
    },
  },
  edge: {
    formatter: () => {
      return {
        shape: 'cubic-horizontal',
        color: '#A3B1BF',
      }
    },
  },
}).render();