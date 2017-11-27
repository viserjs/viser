import viser from '../../../packages/viser/src/index';

import { data, dataMapping } from './data';

viser({
  data,
  dataMapping,
  coord: {
    // type: 'theta',
    radius: 1, // 外半径
    innerRadius: 0.6, // 内半径
  },
  legend: true,
  tooltip: {
    title: 'hahah',
    offset: 0,
    crossHairs: {
      show: false,
    },
  },
  series: [{
    position: 'profit',
    quickType: 'pie',
    label: true,
  }],
  chart: {
    id: 'mount',
    width: 300,
    height: 300,
    type: 'commonChart',
  },
});
