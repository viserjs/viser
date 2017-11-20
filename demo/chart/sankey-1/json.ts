import viser from '../../../packages/viser/src/index';

import { data, dataDef, dataPre } from './data';
viser({
  data,
  dataPre,
  dataDef,
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
    viewId: 1,
    dataView: 'nodes',
    dataDef: [
      {
        key: 'x',
        mark: 'column',
        scale: {
          sync: true
        }
      },
      {
        key: 'y',
        mark: 'row',
        scale: {
          sync: true
        }
      },
      {
        key: 'name',
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
      },
    }]
  }],
  chart: {
    id: 'mount',
    width: 800,
    forceFit: true,
    height: 600,
  },
});
