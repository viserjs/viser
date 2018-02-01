import { Chart, Tooltip, Legend, Axis, Plugin, Slider, FacetView, Facet, Line } from '../../../packages/viser-react/src/index';
import * as React from 'react';
import { sourceData, scale } from './data'
const DataSet = require('@antv/data-set');

const facetOpts = {
  views: (view, facet) => {
    const { colValue, data } = facet;
    let color;
    let alias;
    if (colValue === 'rain') {
      color = '#1890ff';
      alias = '降雨量(mm)';

    } else if (colValue === 'flow') {
      color = '#2FC25B';
      alias = '流量(m^3/s)';
    }

    return {
      data,
      scale: [{
        dataKey: colValue,
        alias,
      }],
      series: [{
        quickType: 'line',
        position: `time*${colValue}`,
        color,
      }]
    };
  }
};

export default class App extends React.Component {

  state = {
    start: '2009/7/20 0:00',
    end: '2009/7/25 0:00',
  }

  constructor(props) {
    super(props);
  }

  slideChange = (opts: any) => {
    this.setState({
      start: opts.startValue, end: opts.endValue,
    });
  }

  getDv() {
    const { start, end } = this.state;
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const ds = new DataSet({
      state: {
        start,
        end,
      }
    });
    const originDv = ds.createView();
    originDv.source(sourceData)
      .transform({
        type: 'fold',
        fields: [ 'rain', 'flow' ],
        key: 'type',
        value: 'value',
        retains: [ 'rain', 'flow', 'time' ]
      });


    const chartDv = ds.createView();
    chartDv.source(originDv)
      .transform({
        type: 'fold',
        fields: [ 'rain', 'flow' ],
        key: 'type',
        value: 'value',
        retains: [ 'rain', 'flow', 'time' ]
      })
      .transform({
        type: 'filter',
        callback(obj) {
          const time = new Date(obj.time).getTime(); // !注意：时间格式，建议转换为时间戳进行比较
          return time >= startTime && time <= endTime;
        }
      });
    return { originDv, chartDv };
  }

  render() {
    const {start, end} = this.state;
    const {originDv, chartDv} = this.getDv();

    const sliderOpts = {
      width: 'auto',
      height: 26,
      start, // 和状态量对应
      end,
      xAxis: 'time',
      yAxis: 'value',
      scales: {
        time: {
          type: 'time',
          tickCount: 10,
          mask: 'M/DD H:mm'
        }
      },
      data: originDv,
      backgroundChart: {
        type: 'line'
      },
      onChange: this.slideChange.bind(this)
    };
    return (
      <div>
        <Chart forceFit height={400} animate={false} padding={[ 20, 20, 0, 80]} data={chartDv} scale={scale}>
          <Axis />
          <Facet type="mirror" fields={['type']} showTitle={false} padding={[ 0, 0, 40, 0]} {...facetOpts} ></Facet>
        </Chart>
        <Plugin>
          <Slider {...sliderOpts}/>
        </Plugin>
      </div>
    );
  }
}
