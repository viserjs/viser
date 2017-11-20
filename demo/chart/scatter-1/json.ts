import viser from '../../../packages/viser/src/index';

import { data, dataMapping } from './data'

viser({
  data,
  dataMapping,
  tooltip: true,
  legend: {
    dataKey: 'gender',
    marker: 'circle',
  },
  series: [{
    position: ['height', 'weight'],
    quickType: 'point',
  }],
  axis: [{
    dataKey: 'weight',
    show: true,
    position: 'left',
  }, {
    dataKey: 'height',
    show: true,
    position: 'bottom',
  }],
  chart: {
    container: 'mount',
    forceFit: true,
    height: 400,
  },
});
