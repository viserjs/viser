import viser from '../../../packages/viser/src/index';

import { data, dataMapping, dataPre } from './data';

export default viser({
  data,
  dataPre,
  dataMapping,
  coord: {
    type: 'polar',
    direction: 'rotate',
    startAngle: -90,
    endAngle: 180,
  },
  series: [{
    position: ['city', 'pv'],
    quickType: 'bar',
    color: 'blue',
    style: {
      background: '#ddd',
    }
  }],
  chart: {
    type: 'commonChart',
    width: 800,
    height: 500,
    margin: [10, 10],
    container: 'mount',
  },
});
