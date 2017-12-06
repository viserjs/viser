import { Chart, Tooltip, Edge, View, Polygon, Coord } from '../../../packages/viser-react/src/index';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { data, dataPre, scale } from './data';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const label = [
      'name', {
        labelEmit: true,
        textStyle: {
          fill: '#8c8c8c'
        },
      }
    ];

    return (
      <Chart forceFit height={600} data={data} dataPre={dataPre} scale={scale}>
        <View viewId='2' dataView='edges'>
          <Coord type="polar" direction="yReverse" />
          <Edge position='x*y' color='source' shape='arc' opacity={0.5} tooltip={'source*target*value'} />
        </View>
        <View viewId='3' dataView='nodes'>
          <Coord type="polar" direction="yReverse" />
          <Polygon position='x*y' color='id' label={label} />
        </View>
      </Chart>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('mount'));
