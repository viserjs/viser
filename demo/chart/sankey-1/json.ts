import viser from '../../../packages/viser/src/index';
import { data, dataPre, scale } from './data';

viser({
  data,
  dataPre,
  views: [{
    viewId: '34',
    scale,
    dataView: 'edges',
    series: [{
      quickType: 'sankey',
      position: 'x*y',
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
    scale,
    series: [{
      quickType: 'polygon',
      position: 'x*y',
      color: 'name',
      style: {
        stroke: '#ccc'
      },
      label: [
       'name',
       {
        textStyle: {
          fill: 'black',
          textAlign: 'left'
        },
        offset: 0,
      }]
    }],
  }],
  chart: {
    id: 'mount',
    forceFit: true,
    height: 600,
  },
});
