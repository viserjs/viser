import viser from '../../../packages/viser/src/index';

import { data, dataDef } from './data';

viser({
  chart: {
    id: 'mount',
    width: 300,
    height: 300,
    type: 'commonChart',
  },
  data,
  dataDef,
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
});
