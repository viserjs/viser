import { Graph, Zoom } from '../../../packages/viser-graph-react/src';
import * as React from 'react';

const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 200
  },{
    id: 'node2',
    x: 300,
    y: 200
  }],
  edges: [{
    id: 'edge1',
    target: 'node2',
    source: 'node1'
  }]
};

var lastPoint = void 0;

export default class App extends React.Component {
  state = {
    data,
    currentZoom: 2,
  };

  graph;

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.setState({
      data: {
        nodes: [{
          id: 'node4',
          x: 100,
          y: 200
        },{
          id: 'node5',
          x: 300,
          y: 200
        },{
          id: 'node6',
          x: 400,
          y: 200
        }],
        edges: [{
          id: 'edge5',
          target: 'node4',
          source: 'node5'
        }]
      },
      currentZoom: 1
    });
  }

  render() {
    const { data, currentZoom } = this.state;
    return (
      <div>
        <button onClick={this.handleClick}>Click</button>
        <Graph width={500} height={500}
          fitView='cc'
          fitViewPadding={true}
          animate={true}
          type='graph'
          data={data}
          test={1}
          ref={(graph) => {
            this.graph = graph;
          }}
          onClick={(ev, graph) =>{
            console.log('click', ev, graph);
          }}
          onDragstart={(ev: any, graph: any) => {
            graph.css({
              cursor: '-webkit-grabbing'
            });
          }}
          onDrag={(ev:any, graph: any) => {
            if (lastPoint) {
              graph.translate(ev.domX - lastPoint.x, ev.domY - lastPoint.y);
            }
            lastPoint = {
              x: ev.domX,
              y: ev.domY
            };
          }}
          onDragend={(ev:any, graph: any) => {
            lastPoint = undefined;
            graph.css({
              cursor: '-webkit-grab'
            });
          }}>
          <Zoom min={1} max={10} current={currentZoom}/>
        </Graph>
      </div>
    );
  }
}
