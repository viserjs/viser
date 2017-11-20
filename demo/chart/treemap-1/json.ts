import viser from '../../../packages/viser/src/index';

import { data, dataPre, dataMapping } from './data';

viser({
  data,
  dataPre,
  dataMapping,
  tooltip: {
    title: 'hahah',
    offset: 0,
    crossHairs: {
      show: false,
    },
  },
  series: {
    position: 'x*y',
    gemo: 'polygon',
    tooltip: {
      dataKey: 'name*value'
    },
    style: {
      lineWidth: 1,
      stroke: '#fff',
    },
    label: {
      dataKey: 'name',
      textStyle: {
        textBaseline: 'middle'
      },
      formatter(val) {
        if (val !== 'root') {
          return val;
        }
      },
    }
  },
  chart: {
    type: 'commonChart',
    container: 'mount',
    forceFit: true,
    width: 800,
    height: 400,
    margin: [10, 10],
	},
});
