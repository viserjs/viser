import viser from '../../../packages/viser/src/index';
import { data, scale } from './data'
const DataSet = require('@antv/data-set');

const ds: any = new DataSet();
const dv = ds.createView().source(data);

dv.transform({
  type: 'percent',
  field: 'value',
  dimension: 'country',
  groupBy: ['year'],
  as: 'percent'
});

viser({
  data: dv.rows,
  scale: scale,
  axis: true,
  tooltip: true,
  legend: {
    dataKey: 'country',
    onItemMouseEnter: (ev) => {
      // console.log(5, ev);
    }
  },
  series: [{
    quickType: 'stackBar',
    style: {
      stroke: '#fff',
      lineWidth: 1
    },
    position: 'year*percent',
    color: 'country',
    onMouseenter: (ev) => {
      // console.log(3, ev);
    },
  }],
  guide: [{
    type: 'line',
    top: true,
    quickType: 'normal',
    data: 'median',
    lineStyle: {
      stroke: '#ff6a00', // 线的颜色
      lineWidth: 2 // 线的宽度
    },
    text: {
      content: '水平线',
      position: 'start',
      autoRotate: false,
      style: {
        fill: '#ff6a00',
      }
    },
    onMouseenter: (ev) => {
      // console.log(2, ev);
    },
  }, {
    type: 'line',
    top: true,
    quickType: 'parallel',
    data: 'median',
    lineStyle: {
      stroke: '#ff6a00',
      lineWidth: 2
    },
    text: {
      content: '水平线',
      position: 'start',
      autoRotate: false,
      style: {
        fill: '#ff6a00',
      }
    },
    onMouseenter: (ev) => {
      // console.log(2, ev);
    },
  }],
  brush: {
    type: 'X',
    onBrushstart(chart) {
      chart.hideTooltip();
    },
    onBrushmove(chart) {
      chart.hideTooltip();
    }
  },
  chart: {
    container: 'mount',
    forceFit: true,
    height: 400,
    onDblClick: (ev) => {
      // console.log(1, ev)
    }
  },
});
