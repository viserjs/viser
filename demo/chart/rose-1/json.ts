import viser from '../../../packages/viser/src/index';

import { data, dataMapping, dataPre } from './data';


viser({
  data,
  dataMapping,
  dataPre,
  coord: {
    type: 'polar',
    radius: 0.8,
  },
  tooltip: {
    offset: 0,
    crossHairs: {
      show: false,
    },
  },
  legend: true,
  series: [{
    position: ['area', 'profit'],
    gemo: 'interval',
    fill: ['#CB5050', '#A72023', '#9D1F22', '#70171A', '#461012'],
    label: true,
  }],
  chart: {
    type: 'commonChart',
    container: 'mount',
    width: 400,
    height: 400,
  },
});
