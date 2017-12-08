import { Chart, Tooltip, Axis, StackBar, Sankey, View, Polygon } from '../../../packages/viser-react/src/index';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { data, dataPre, scale } from './data'

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
      <Chart forceFit height={600} data={data} dataPre={dataPre}>
        <View viewId='2' dataView='edges' scale={scale}>
          <Sankey position='x*y' style={{ curvature: 0.5 }} color='#333' opacity={0.1} tooltip='value' />
        </View>
        <View viewId='3' dataView='nodes' scale={scale}>
          <Polygon position="x*y" color="name" style={{ stroke: '#ccc' }} label={label} />
        </View>
      </Chart>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('mount'));
