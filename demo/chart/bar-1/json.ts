import viser from '../../../packages/viser/src/index';
import { data, scale } from './data'
const DataSet = require('@antv/data-set');

const ds = new DataSet();
const dv = ds.createView('test')
  .source(data)
  .transform({
    as: [ 'count' ],
    groupBy: [ 'release' ],
    operations: [ 'count' ],
    type: 'aggregate'
  });

viser({
  data: dv,
  scale: scale,
  axis: true,
  tooltip: true,
  series: [{
    quickType: 'interval',
    position: 'release*count',
    color: '#e50000',
  }],
  brush: {
    type: 'X',
    onBrushstart(ev, chart) {
      chart.hideTooltip();
    },
    onBrushmove(ev, chart) {
      chart.hideTooltip();
    }
  },
  chart: {
    container: 'mount',
    forceFit: true,
    height: 400,
    onPlotdblclick: (ev: any, chart: any) => {
      chart.get('options').filters = {};
      chart.repaint();
    }
  },
});
