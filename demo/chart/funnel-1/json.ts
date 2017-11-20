import viser from '../../../packages/viser/src/index';

import { data, dataMapping } from './data';


viser({
  data,
  dataMapping,
  coord: {
    type: 'rect',
    direction: 'LT',
  },
  legend: true,
  tooltip: {
    title: 'hahah',
    crossHairs: {
      show: false,
    },
  },
  series: [{
    position: ['name', 'value'],
    quickType: 'funnel',
  }],
  chart: {
    type: 'commonChart',
    container: 'mount',
    width: 400,
    height: 400,
  },
});
