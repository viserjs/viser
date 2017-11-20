import viser from '../../../packages/viser/src/index';

import { data, dataMapping, dataPre } from './data';
viser({
  data,
  dataPre,
  dataMapping,
  dataView: 'edges',
  series: [{
    position: 'x*y',
    gemo: 'edge',
    shape: 'sankey',
    style: {
      curvature: 0.5,
    },
    color: '#333',
    opacity: 0.1,
    tooltip: 'value',
  }],
  views: [{
    viewId: 3,
    dataView: 'nodes',
    dataMapping: [
      {
        dataKey: 'x',
        mark: 'column',
      },
      {
        dataKey: 'y',
        mark: 'row',
      },
      {
        dataKey: 'name',
        mark: 'color',
      },
    ],
    series: [{
      position: 'x*y',
      gemo: 'polygon',
      style: {
        stroke: '#ccc'
      },
      label: {
        show: true,
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
    width: 800,
    forceFit: true,
    height: 600,
  },
});
