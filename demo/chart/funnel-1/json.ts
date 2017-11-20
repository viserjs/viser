import viser from '../../../packages/viser/src/index';

import { data, dataDef } from './data';


viser({
  data,
  dataDef,
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
