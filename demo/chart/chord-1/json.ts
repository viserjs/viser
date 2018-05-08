import viser from '../../../packages/viser/src/index';
import { data, scale } from './data';
const DataSet = require('@antv/data-set');

const ds: any = new DataSet();
const dv = ds.createView().source(data, {
  type: 'graph',
  edges: d => d.links
});

dv.transform({
  type: 'diagram.arc',
  sourceWeight: e => e.sourceWeight,
  targetWeight: e => e.targetWeight,
  weight: true,
  marginRatio: 0.3
});

viser({
  data,
  scale,
  views: [{
    viewId: '34',
    data: dv.edges,
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
    data: dv.nodes,
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
    container: 'mount',
    forceFit: true,
    height: 600,
  },
});
