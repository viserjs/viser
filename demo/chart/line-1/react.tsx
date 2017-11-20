import { Chart, Tooltip, Axis, Line } from '../../../packages/viser-react/src/index';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { data, dataMapping, dataPre, scale } from './data'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Chart forceFit height={400} data={data} dataPre={dataPre} dataMapping={dataMapping} scale={scale}>
          <Tooltip />
          <Axis />
          <Line style={{ stroke: 'red', lineWidth: 1 }} />
        </Chart>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('mount'));
