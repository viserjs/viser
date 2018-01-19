import viser from '../../../packages/viser/src/index';
import { data, scale } from './data'
const DataSet = require('@antv/data-set');

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
      console.log('dv change', ds.state.end , ds.state.start);
      console.log(chart && chart.config.data === ds);
      return date <= ds.state.end && date >= ds.state.start;
    }
  })
  .transform({
    type: 'map',
    callback: obj => {
      console.log('dv', dv);
      obj.trend = (obj.start <= obj.end) ? '上涨' : '下跌';
      obj.range = [ obj.start, obj.end, obj.max, obj.min ];
      return obj;
    }
  });

const chart = viser({
  data: dv,
  scale,
  axis: true,
  tooltip: {
    showTitle: false,
    itemTpl: '<li data-index={index}>'
    + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
    + '{name}{value}</li>',
  },
  legend: {
    offset: 20,
  },
  series: [{
    quickType: 'line',
    position: 'time*max',
  }],
  chart: {
    container: 'mount',
    forceFit: true,
    height: 400,
    animate: false,
    padding: [ 10, 40, 40, 40 ],
  },
  slider: {
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
    onChange: ({startText, endText}) => {
      ds.setState('start', startText);
      ds.setState('end', endText);
      console.log(startText, endText, ds.state.start, ds.state.end);
    }
  },
});
