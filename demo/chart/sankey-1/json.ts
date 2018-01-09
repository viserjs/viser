import viser from '../../../packages/viser/src/index';
import { data, scale } from './data';
const DataSet = require('@antv/data-set');

const ds: any = new DataSet();
const dv = ds.createView().source(data, {
  type: 'graph',
  edges: d => d.links
});

dv.transform({
  type: 'diagram.sankey',
  nodeWidth: 0.015,
  nodePadding: 0.02,
});

viser({
  views: [{
    viewId: '2',
    scale,
    data: dv.edges,
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
    data: dv.nodes,
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
