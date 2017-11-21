import viser from '../../../packages/viser/src/index';
import { data, dataMapping, dataPre, scale } from './data'

viser({
  data: data,
  dataPre: {
    transform: [
    // {
    //   exchangeType: 'type-3',
    //   fields: ['country', 'year', 'value'],
    // },
    {
      type: 'percent',
      field: 'value',
      dimension: 'country',
      groupBy: ['year'],
      as: 'percent'
    }]
  },
  dataMapping: dataMapping,
  scale: scale,
  axis: true,
  tooltip: true,
  series: [{
    quickType: 'stackBar',
    style: {
      stroke: '#fff',
      lineWidth: 1
    }
  }],
  chart: {
    container: 'mount',
    forceFit: true,
    height: 400,
  },
});
