import viser from '../../../packages/viser/src/index';

import { data, dataDef, dataPre, scale } from './data'

viser({
  data,
  dataPre,
  dataDef,
  scale,
  tooltip: true,
  legend: {
    dataKey: 'user',
    marker: 'circle',
    offset: 30,
  },
  series: [{
    position: ['item', 'score'],
    gemo: 'line',
    size: 2,
  }, {
    position: ['item', 'score'],
    gemo: 'line',
    size: 2,
  }, {
    position: ['item', 'score'],
    gemo: 'point',
    shape: 'circle',
    style: {
      // stroke: '#fff',
      lineWidth: 1,
      fillOpacity: 1,
    },
  }],
  axis: [{
    dataKey: 'item',
    show: true,
    line: null,
    tickLine: null,
    grid: {
      lineStyle: {
        lineDash: null
      },
      hideFirstLine: false
    },
  }, {
    dataKey: 'score',
    show: true,
    tickLine: null,
    grid: {
      type: 'polygon',
      lineStyle: {
        lineDash: null
      },
      alternateColor: 'rgba(0, 0, 0, 0.04)',
    },
  }],
  coord: {
    type: 'polar'
  },
  chart: {
    container: 'mount',
    forceFit: true,
    height: 400,
  },
});
