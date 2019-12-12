import * as React from 'react';
import { Graph, Node } from '../../../packages/viser-graph-react/src/index';
import { oriData } from './data'

const data = {
  nodes: oriData.nodes.map(function(node, i) {
    return {...node, size: Math.random() * 30 + 5 };
  }),
  edges: oriData.edges.map(function(edge, i) {
    return {...edge, id:'edge' + i };
  })
}
const graph = {
  data,
  container: 'mount',
  type: 'graph',
  width: 500,
  height: 500,
  renderer: 'svg',
  fitView: false,
  layout: {
    type: 'force',
    preventOverlap: true
  },
  defaultNode: {
    color: '#5B8FF9',
    style: {
      lineWidth: 2,
      fill: '#C6E5FF'
    }
  },
  defaultEdge: {
    size: 1,
    color: '#e2e2e2'
  },
};

const node = {
  formatter: node => {
    return {
      size: node.size,
    }
  },
  events: {
    onDragstart: (e, graph) => {
      graph.layout()
      refreshDragedNodePosition(e);
    },
    onDrag: (e) => {
      refreshDragedNodePosition(e);
    },
    onDragend: (e) => {
      e.item.get('model').fx = null;
      e.item.get('model').fy = null;
    },
  }
}

const refreshDragedNodePosition = (e) => {
  const model = e.item.get('model');
  model.fx = e.x;
  model.fy = e.y;
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
        </Graph>
      </div>
    );
  }
}
