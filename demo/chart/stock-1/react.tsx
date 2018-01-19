import { Chart, Tooltip, Legend, Axis, Line, Slider } from '../../../packages/viser-react/src/index';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { data, scale } from './data'
const DataSet = require('@antv/data-set');

const tooltipOpts = {
  showTitle: false,
  itemTpl: '<li data-index={index}>'
  + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
  + '{name}{value}</li>',
};

class App extends React.Component {
  dv: any;
  ds: any;

  state = {
    ds: null,
    dv: null,
  }

  constructor(props) {
    super(props);

    const ds = new DataSet({
      state: {
        start: '2015-07-07',
        end: '2015-07-28'
      }
    });
    const dv = ds.createView();
    dv.source(data)
      .transform({
        type: 'filter',
        callback: obj => {
          const date = obj.time;
          console.log('dv change');
          return date <= ds.state.end && date >= ds.state.start;
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

    this.state = { ds, dv};
  }

  sliderChange = ({startText, endText}) => {
    const { ds, dv} = this.state;
    ds.setState('start', startText);
    ds.setState('end', endText);
    console.log(startText, endText, ds.state.start, ds.state.end);
  };
  render() {
    const { ds, dv} = this.state;
    console.log('rerender');
    const sliderOpts = {
      container: 'slider', // DOM id
      width: 'auto',
      height: 26,
      padding: [ 20, 40, 20, 40 ],
      start: ds.state.start, // 和状态量对应
      end: ds.state.end,
      data, // 源数据
      xAxis: 'time', // 背景图的横轴对应字段，同时为数据筛选的字段
      yAxis: 'volumn', // 背景图的纵轴对应字段，同时为数据筛选的字段
      scales: {
        time: {
          type: 'timeCat',
          nice: false,
        }
      },
    };
    return (
      <div>
        <Chart forceFit height={400} animate={false} padding={[ 10, 40, 40, 40 ]} data={dv} scale={scale}>
          <Tooltip {...tooltipOpts}/>
          <Axis />
          <Legend offset={20}/>
          <Line position='time*max' />
          <Slider {...sliderOpts} onChange={this.sliderChange}/>
        </Chart>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('mount'));
