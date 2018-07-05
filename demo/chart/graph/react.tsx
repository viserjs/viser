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
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Graph width={500} height={500}
          fitView='cc'
          fitViewPadding={true}
          animate={true}
          type='graph'
          data={data}
          test={1}
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
          <Zoom min={1} max={10} current={2}/>
        </Graph>
      </div>
    );
  }
}
