import viser from '../../../packages/viser/src/index';
import { data, dataPre, scale } from './data';

viser({
  data,
  dataPre,
  scale,
  views: [{
    viewId: '34',
    dataView: 'edges',
    axis: false,
    coord: {
      type: 'polar',
      direction: 'yReverse',
    },
    series: [{
      quickType: 'edge',
      position: 'x*y',
      color: 'source',
      shape: 'arc',
      opacity: 0.5,
      tooltip: 'source*target*value',
    }],
  }, {
    viewId: '23',
    dataView: 'nodes',
    axis: false,
    coord: {
      type: 'polar',
      direction: 'yReverse',
    },
    series: [{
      quickType: 'polygon',
      position: 'x*y',
      color: 'id',
      label: ['name', {
        labelEmit: true,
        textStyle: {
          fill: '#8c8c8c'
        },
      }]
    }],
  }],
  chart: {
    id: 'mount',
    forceFit: true,
    height: 600,
  },
});
