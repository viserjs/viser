import { Chart, Tooltip, Axis, StackBar } from '../../../packages/viser-react/src/index';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { data, dataDef, dataPre, scale } from './data'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Chart forceFit height={400} data={data} dataPre={dataPre} dataDef={dataDef} scale={scale}>
          <Tooltip />
          <Axis />
          <StackBar style={{ stroke: '#fff', lineWidth: 1 }} />
        </Chart>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('mount'));
