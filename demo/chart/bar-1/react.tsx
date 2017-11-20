import { Chart, Tooltip, Axis, StackBar, LiteChart } from '../../../packages/viser-react/src/index';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { data, dataMapping, dataPre, scale } from './data'

class App extends React.Component {
  state = {
    height: 400,
    lineWidth: 1
  }

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.setState({
      height: 600,
      lineWidth: 10,
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click</button>
        <Chart forceFit height={this.state.height} data={data} dataPre={dataPre} dataMapping={dataMapping} scale={scale}>
          <Tooltip />
          <Axis />
          <StackBar style={{ stroke: '#fff', lineWidth: this.state.lineWidth }} />
        </Chart>
        {/* <LiteChart height={400} data={data} dataPre={dataPre} dataMapping={dataMapping} forceFit stackBar /> */}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('mount'));
