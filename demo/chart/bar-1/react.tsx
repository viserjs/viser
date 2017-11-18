import { Chart, Tooltip, Axis, StackBar, StackBarChart } from '../../../packages/viser-react/src/index';
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
        {/* <Chart forceFit height={400} data={data} dataPre={dataPre} dataMapping={dataMapping} scale={scale}>
          <Tooltip />
          <Axis />
          <StackBar style={{ stroke: '#fff', lineWidth: 1 }} />
        </Chart> */}
        <StackBarChart height={400} data={data} dataPre={dataPre} dataMapping={dataMapping} forceFit scale={scale} tooltip axis legend />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('mount'));
