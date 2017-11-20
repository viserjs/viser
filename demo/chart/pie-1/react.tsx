import { Chart, Tooltip, Axis, Legend, Coord, Pie } from '../../../packages/viser-react/src/index';
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
        <Chart width={400} height={300} data={data} dataMapping={dataMapping}>
          <Coord radius={1} innerRadius={0.6} />
          <Pie label={true} />
          <Tooltip />
          <Legend />
          <Axis />
        </Chart>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('mount'));
