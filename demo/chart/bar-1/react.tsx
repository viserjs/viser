import { Chart, Tooltip, Axis, StackBar, LiteChart, Guide } from '../../../packages/viser-react/src/index';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { data, dataPre, scale } from './data'

export const repaintData = [
  { country: 'Europe', year: '1750', value: 2163 },
  { country: 'Europe', year: '1800', value: 2203 },
  { country: 'Europe', year: '1850', value: 2276 },
  { country: 'Europe', year: '1900', value: 2408 },
  { country: 'Europe', year: '1950', value: 2547 },
  { country: 'Europe', year: '1999', value: 2729 },
  { country: 'Europe', year: '2050', value: 2628 },
  { country: 'Europe', year: '2100', value: 2828 },
  { country: 'Asia', year: '1750', value: 2502 },
  { country: 'Asia', year: '1800', value: 2635 },
  { country: 'Asia', year: '1850', value: 2809 },
  { country: 'Asia', year: '1900', value: 2947 },
  { country: 'Asia', year: '1950', value: 21402 },
  { country: 'Asia', year: '1999', value: 23634 },
  { country: 'Asia', year: '2050', value: 25268 },
  { country: 'Asia', year: '2100', value: 27268 }
];

class App extends React.Component {
  state = {
    height: 400,
    lineWidth: 1,
    data,
  }

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.setState({
      height: 600,
      lineWidth: 10,
      data: repaintData,
    })
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <button onClick={this.handleClick}>Click</button>
        <Chart forceFit height={this.state.height} data={data} dataPre={dataPre} scale={scale}>
          <Tooltip />
          <Axis />
          <StackBar position='year*percent' color='country' style={{ stroke: '#fff', lineWidth: this.state.lineWidth }} />
          <Guide
            type="html"
            position={['50%', '0%']}
            html={`
              <div style="width: 300px;text-align: center;">
                <p style="font-size: 12px;color: #545454;margin: 0;">${Math.random() * 10}%</p>
              </div>
            `}
          />
        </Chart>
        {/* <LiteChart height={400} data={data} dataPre={dataPre} dataMapping={dataMapping} forceFit stackBar /> */}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('mount'));
