import viser from '../../../packages/viser/src/index';

import { data, dataDef, dataPre, scale } from './data'

viser({
  data,
  dataPre,
  dataDef,
  scale,
  axis: true,
  tooltip: true,
  legend: true,
  series: [{
    quickType: 'area',
  }],
  chart: {
    container: 'mount',
    forceFit: true,
    height: 400,
  },
});
