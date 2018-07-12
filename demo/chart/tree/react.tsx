import { Graph, Zoom } from '../../../packages/viser-graph-react/src';
import * as React from 'react';

const data = {
  roots: [{
    label: 'root',
    id:1,
    children: [{
      label: 'child1',
      children: [
        {
          label: 'child\n1.1'
        }
      ]
    }, {
      label: 'child2'
    }]
  }]
};

const graph = {
  width: 500,
  height: 500,
  fitView: 'cc',
  fitViewPadding: true,
  animate: true,
  type: 'tree',
  data,
  onClick: function(ev, graph) {
    console.log('click', ev, graph);
  }
};
const zoom = {
  min: 1,
  max: 10,
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Graph {...graph}>
          <Zoom {...zoom}/>
        </Graph>
      </div>
    );
  }
}
