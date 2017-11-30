import viser from '../../../packages/viser/src/index';
import { data, dataMapping, dataPre, scale } from './data';

viser({
  data,
  dataPre,
  views: [{
    viewId: '34',
    dataMapping,
    scale,
    dataView: 'edges',
    series: [{
      quickType: 'sankey',
      style: {
        curvature: 0.5,
      },
      color: '#333',
      opacity: 0.1,
      tooltip: 'value',
    }],
  }, {
    viewId: '23',
    dataView: 'nodes',
    dataMapping: {
      column: 'x',
      row: 'y',
      color: 'name',
    },
    scale,
    series: [{
      quickType: 'polygon',
      style: {
        stroke: '#ccc'
      },
      label: {
        dataKey: 'name',
        textStyle: {
          fill: 'black',
          textAlign: 'left'
        },
        offset: 0,
      }
    }],
  }],
  chart: {
    id: 'mount',
    forceFit: true,
    height: 600,
  },
});
