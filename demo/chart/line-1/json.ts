import viser from '../../../packages/viser/src/index';

import { data, dataDef, dataPre, scale } from './data'

viser({
  data,
  dataPre,
  dataDef,
  scale,
  axis: true,
  tooltip: true,
  series: [{
    quickType: 'line',
    style: {
      stroke: 'red',
      lineWidth: 1
    }
  }],
  chart: {
    container: 'mount',
    forceFit: true,
    height: 400,
  },
});
