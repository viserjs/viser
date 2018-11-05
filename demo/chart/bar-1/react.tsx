import { Chart, Tooltip, Axis, StackBar, LiteChart, Guide } from '../../../packages/viser-react/src/index';
import * as React from 'react';
import { data, scale } from './data'
const DataSet = require('@antv/data-set');

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

const ds = new DataSet();

export default class App extends React.Component {
  dv: any;
  ds: any;

  state = {
    height: 400,
    lineWidth: 1,
    data,
  }

  constructor(props) {
    super(props);

    // const dv = ds.createView().source(data);
    // dv.transform({
    //   type: 'percent',
    //   field: 'value',
    //   dimension: 'country',
    //   groupBy: ['year'],
    //   as: 'percent'
    // });

    // this.state.data = dv.rows;
  }

  handleClick = () => {
    const dv = ds.createView().source(repaintData);
    dv.transform({
      type: 'percent',
      field: 'value',
      dimension: 'country',
      groupBy: ['year'],
      as: 'percent'
    });

    this.setState({
      height: 600,
      lineWidth: 10,
      data: dv.rows,
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click</button>
        <Chart forceFit height={this.state.height} padding={[80, 80]}
          data={this.state.data} scale={scale} renderer={'svg'}>
          <Tooltip
            onShow={() => {
              // console.log('show');
            }}
            onHide={() => {
              // console.log('hide');
            }}
            onChange={() => {
              // console.log('change');
            }}
          />
          <Axis dataKey='year' label={{
            density: 0.2,
            formatter: ',.0f',
            // formatter: (val: any, item: any, i: number) => {
            //   return val;
            // }
          }}/>
          <StackBar position='year*value' color='country'
            style={{ stroke: '#fff', lineWidth: this.state.lineWidth }}
            label={['value', {
              density: 0.3,
              // formatter: (val: any, item: any, i: number) => {
              //   return '￥' + val;
              // }
              formatter: '$'
            }]}
          />
        </Chart>
        {/* <LiteChart height={400} data={dv.rows} forceFit stackBar /> */}
      </div>
    );
  }
}
