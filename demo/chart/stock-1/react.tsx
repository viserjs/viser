import { Chart, Tooltip, Legend, Axis, Line, Plugin, Slider } from '../../../packages/viser-react/src/index';
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
        <Chart forceFit height={400} animate={false} padding={[ 10, 40, 40, 40 ]} data={dv} scale={scale}>
          <Tooltip {...tooltipOpts}/>
          <Axis />
          <Legend offset={20}/>
          <Line position='time*max' />
        </Chart>
        <Plugin>
          <Slider {...sliderOpts}/>
        </Plugin>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('mount'));
