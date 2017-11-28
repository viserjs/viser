import { Chart, Tooltip, Axis, StackBar, Sankey, View, Polygon } from '../../../packages/viser-react/src/index';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { data, dataMapping, dataPre, scale } from './data'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const label = {
      dataKey: 'name',
      textStyle: {
        fill: 'black',
        textAlign: 'left'
      },
      offset: 0,
    };

    return (
      <Chart forceFit height={600} dataView='edges' data={data} dataPre={dataPre} dataMapping={dataMapping} scale={scale}>
        <Sankey style={{ curvature: 0.5 }} color='#333' opacity={0.1} tooltip='value' />
        <View viewId='3' dataView='nodes' dataMapping={{ column: 'x', row: 'y', color: 'name' }}>
          <Polygon style={{ stroke: '#ccc' }} label={label} />
        </View>
      </Chart>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('mount'));
