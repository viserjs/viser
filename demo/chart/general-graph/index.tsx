import * as React from 'react';
import { Graph, Node, Edge } from '../../../packages/viser-graph-react/src/index';

const data = {
  isRoot: true,
  id: 'Root',
  style: {
    fill: 'red'
  },
  children: [
    {
      id: 'SubTreeNode1',
      raw: {},
      children: [
        {
          id: 'SubTreeNode1.1'
        },
        {
          id: 'SubTreeNode1.2',
          children: [
            {
              id: 'SubTreeNode1.2.1'
            },
            {
              id: 'SubTreeNode1.2.2'
            },
            {
              id: 'SubTreeNode1.2.3'
            }
          ]
        }
      ]
    },
    {
      id: 'SubTreeNode2',
      children: [
        {
          id: 'SubTreeNode2.1'
        }
      ]
    }, {
      id: 'SubTreeNode3',
      children: [
        {
          id: 'SubTreeNode3.1'
        },
        {
          id: 'SubTreeNode3.2'
        },
        {
          id: 'SubTreeNode3.3'
        }
      ]
    }, {
      id: 'SubTreeNode4'
    }, {
      id: 'SubTreeNode5'
    }, {
      id: 'SubTreeNode6'
    }
  ]
};

let i = 0;
let count = 0;
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
    size: 16,
    anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]],
  },
  layout: {
    type: 'compactBox',
    direction: 'LR',
    defalutPosition: [],
    getId(d) { return d.id; },
    getHeight() { return 16 },
    getWidth() { return 16 },
    getVGap() { return 50 },
    getHGap() { return 100 }
  }
};
const node = {
  formatter: node => {
    return {
      size: 16,
      style: {
        fill: '#40a9ff',
        stroke: '#096dd9'
      },
      label: node.id,
      labelCfg: {
        position: node.children && node.children.length > 0 ? 'left' : 'right'
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

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Graph {...graph}>
          <Node {...node}/>
          <Edge {...edge}/>
        </Graph>
      </div>
    );
  }
}
