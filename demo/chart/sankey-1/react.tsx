import { Chart, Tooltip, Axis, StackBar, Sankey, View, Polygon } from '../../../packages/viser-react/src/index';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { data, scale } from './data'
const DataSet = require('@antv/data-set');

const ds: any = new DataSet();
const dv = ds.createView().source(data, {
  type: 'graph',
  edges: d => d.links
});

dv.transform({
  type: 'diagram.sankey',
  nodeWidth: 0.015,
  nodePadding: 0.02,
});

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const label = [
      'name', {
        textStyle: {
          fill: 'black',
          textAlign: 'left'
        },
        offset: 0,
      }
    ];

    return (
      <Chart forceFit height={600}>
        <View viewId='2' data={dv.edges} scale={scale}>
          <Sankey position='x*y' style={{ curvature: 0.5 }} color='#333' opacity={0.1} tooltip='value' />
        </View>
        <View viewId='3' data={dv.nodes} scale={scale}>
          <Polygon position="x*y" color="name" style={{ stroke: '#ccc' }} label={label} />
        </View>
      </Chart>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('mount'));
