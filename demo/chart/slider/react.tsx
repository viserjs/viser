import {  Axis, Chart, Guide, Line, Plugin, Slider, Tooltip  } from '../../../packages/viser-react/src/index';
import * as React from 'react';

const DataSet = require('@antv/data-set');

import { data } from './data';

export default class App extends React.Component {
  state = {
    data: [],
    ticks: [],
    colors: [],
    scale: [],
    start: '2000-06-05',
    end: '2000-12-29',

    height: 30,
  };

  onChange = _ref => {
    const startValue = _ref.startValue,
      endValue = _ref.endValue;
    return this.setState({
      start: startValue,
      end: endValue,
    });
  };
  getData = () => {
    const { data, start, end } = this.state;
    const ds = new DataSet({
      state: {
        start: new Date(start).getTime(),
        end: new Date(end).getTime(),
      },
    });
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'filter',
      callback: function callback(obj) {
        var time = new Date(obj.date).getTime(); // !注意：时间格式，建议转换为时间戳进行比较
        return time >= ds.state.start && time <= ds.state.end;
      },
    });
    return dv;
  };
  componentDidMount() {
    // $.getJSON('/assets/data/peking-aqi.json', data => {
      const ticks = [0, 50, 100, 150, 200, 300, 500];
      const colors = [
        '#5AC405',
        '#F9C709',
        '#FD942C',
        '#e4440D',
        '#810043',
        '#45001B',
      ];
      this.setState({
        data: data,
        ticks,
        colors,
        scale: [
          {
            dataKey: 'date',
            type: 'time',
            mask: 'YYYY-MM-DD',
            tickCount: 4,
            alias: '日期',
            nice: false,
          },
          {
            dataKey: 'aqi',
            min: 0,
            ticks: ticks,
            alias: 'AQI(空气质量指数)',
          },
        ],
      });
    // });

    setTimeout(() => {
      this.setState({
        height: 50,
        start: '2000-11-05',
      });
    }, 2000);
  }
  render() {
    const { data, ticks, colors, scale, start, end, height } = this.state;
    const dv = this.getData();
    console.log('plugin', height);
    return (
      <div>
        <div id="mountNode">
          <h4 style={{ textAlign: 'center', marginBottom: 5 }}>
            北京市 2010-2015 年 AQI 指数
          </h4>
          {data.length !== 0 && (
            <Chart
              forceFit={true}
              height={400}
              padding={[20, 20, 40, 80]}
              data={dv}
              scale={scale}
            >
              <Tooltip />
              <Axis />
              <Line position="date*aqi" opacity={0.75} />
              {ticks.map((tick, i) => {
                const nextTick = ticks[i + 1];
                if (nextTick) {
                  return (
                    <Guide
                      type="region"
                      start={['min', tick]}
                      end={['max', nextTick]}
                      style={{ fill: colors[i], fillOpacity: 0.4 }}
                    />
                  );
                }
              })}
            </Chart>
          )}
        </div>
        <div id="slider">
          {data.length !== 0 && (
            <Plugin>
              <Slider
                width="auto"
                container="viser-slider-1"
                height={height}
                start={start} // 和状态量对应
                end={end}
                xAxis="date"
                yAxis="aqi"
                scales={{
                  time: {
                    type: 'time',
                    tickCount: 10,
                    mask: 'YYYY-MM-DD',
                  },
                }}
                data={data}
                backgroundChart={{ type: 'line' }}
                onChange={this.onChange.bind(this)}
              />
            </Plugin>
          )}
        </div>
      </div>
    );
  }
}
