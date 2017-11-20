import viser from '../../../packages/viser/src/index';

import { data, dataDef } from './data';


viser({
  data,
  dataDef,
  // scale,
  legend: true,
  tooltip: {
    show: true,
  },
  axis: [{
    dataKey: 'name',
    show: true,
    tickLine: null,
    grid: {
      align: 'center',
      lineStyle: {
        lineWidth: 1,
        lineDash: null,
        stroke: '#f0f0f0'
      }
    }
  }, {
    dataKey: 'day',
    show: true,
    title: null,
    grid: {
      align: 'center',
      lineStyle: {
        lineWidth: 1,
        lineDash: null,
        stroke: '#f0f0f0'
      },
      showFirstLine: true
    }
  }],
  series: [{
    position: ['name', 'key'],
    size: 20,
    // quickType: 'polygon',
    color: ['#BAE7FF', '#1890FF', '#0050B3'],
    label: {
      dataKey: 'sales',
      show: true,
      offset: -2,
      textStyle: {
        fill: '#fff',
        fontWeight: 'bold',
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)'
      }
    },
    style: {
      lineWidth: 1,
      stroke: '#fff'
    }
  }],
  chart: {
    type: 'commonChart',
    container: 'mount',
    width: 800,
    height: 400,
    margin: [10, 10],
  },
});
