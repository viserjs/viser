import viser from '../../../packages/viser/src/index';

import { data, dataMapping, dataPre, scale } from './data'

viser({
  data,
  dataPre,
  dataMapping,
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
