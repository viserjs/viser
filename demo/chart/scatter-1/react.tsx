import { Chart, Tooltip, Axis, Legend, Point, Series } from '../../../packages/viser-react/src/index';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { data, dataMapping } from './data'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Chart forceFit height={400} data={data} dataMapping={dataMapping}>
          <Tooltip />
          <Axis dataKey={'weight'} show={true} position={'left'}/>
          <Axis dataKey={'height'} show={true} position={'bottom'}/>
          <Legend dataKey={'gender'} marker={'circle'}/>
          <Series geom={'point'} postion={['height', 'weight']} quickType={'point'} shape={'circle'}></Series>
        </Chart>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('mount'));
