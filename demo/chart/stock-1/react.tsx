import { Chart, Tooltip, Legend, Axis, Line, Plugin, Slider, View, Candle, Bar } from '../../../packages/viser-react/src/index';
import * as React from 'react';
import { data, scale1, scale2 } from './data'
const DataSet = require('@antv/data-set');

const tooltipOpts = {
  showTitle: false,
  itemTpl: '<li data-index={index}>'
  + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
  + '{name}{value}</li>',
};

export default class App extends React.Component {

  state = {
    start: '2015-07-07',
    end: '2015-07-28',
  }

  constructor(props) {
    super(props);
  }

  slideChange = (opts: any) => {
    this.setState({
      start: opts.startText, end: opts.endText,
    });
  }

  getData() {
    const { start, end } = this.state;
    const ds = new DataSet({
      state: {
        start,
        end,
      }
    });
    const dv = ds.createView();
    dv.source(data)
      .transform({
        type: 'filter',
        callback: obj => {
          const date = obj.time;
          return date <= end && date >= start;
        }
      })
      .transform({
        type: 'map',
        callback: obj => {
          obj.trend = (obj.start <= obj.end) ? '上涨' : '下跌';
          obj.range = [ obj.start, obj.end, obj.max, obj.min ];
          return obj;
        }
      });
    return dv;
  }

  render() {
    const {start, end} = this.state;
    const dv = this.getData();

    const sliderOpts = {
      width: 'auto',
      height: 26,
      padding: [ 20, 40, 20, 40 ],
      start: start, // 和状态量对应
      end: end,
      data, // 源数据
      xAxis: 'time', // 背景图的横轴对应字段，同时为数据筛选的字段
      yAxis: 'volumn', // 背景图的纵轴对应字段，同时为数据筛选的字段
      scales: {
        time: {
          type: 'timeCat',
          nice: false,
        }
      },
      onChange: this.slideChange.bind(this)
    };
    return (
      <div>
        <Chart forceFit height={400} animate={false} padding={[ 10, 40, 40, 40 ]} data={dv} scale={scale1}>
          <Tooltip {...tooltipOpts}/>
          <Axis />
          <Legend offset={20}/>
          <View data={dv} end={{x: 1, y: 0.5}}>
            <Candle position='time*range' color={['trend', val => {
              if (val === '上涨') {
                return '#f04864';
              }

              if (val === '下跌') {
                return '#2fc25b';
              }
            }]} tooltip={['time*start*end*max*min', (time, start, end, max, min) => {
              return {
                name: time,
                value: '<br><span style="padding-left: 16px">开盘价：' + start + '</span><br/>'
                + '<span style="padding-left: 16px">收盘价：' + end + '</span><br/>'
                + '<span style="padding-left: 16px">最高价：' + max + '</span><br/>'
                + '<span style="padding-left: 16px">最低价：' + min + '</span>'
              };
            }]}/>
          </View>
          <View data={dv} scale={scale2} start={{x: 0, y: 0.65}}>
            <Axis dataKey='time' tickLine={null} label={null}/>
            <Axis dataKey='volumn' label={{
              formatter: function(val: any) {
                return parseInt(String(val / 1000), 10) + 'k';
              }
            }} />
            <Bar position='time*volumn' color={['trend',  val => {
              if (val === '上涨') {
                return '#f04864';
              }

              if (val === '下跌') {
                return '#2fc25b';
              }
            }]} tooltip={['time*volumn', (time, volumn) => {
              return {
                name: time,
                value: '<br/><span style="padding-left: 16px">成交量：' + volumn + '</span><br/>'
              };
            }]}/>
          </View>
        </Chart>
        <Plugin>
          <Slider {...sliderOpts}/>
        </Plugin>
      </div>
    );
  }
}
