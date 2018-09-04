import viser from '../../../packages/viser/src/index';
import { data, scale } from './data'
const DataSet = require('@antv/data-set');

const ds = new DataSet();
const dv = ds.createView()
  .source(data)
  .transform({
    type: 'percent',
    field: 'value',
    dimension: 'country',
    groupBy: ['year'],
    as: 'percent'
  });

viser({
  data: dv.rows,
  scale: scale,
  axis: true,
  tooltip: true,
  legend: {
    dataKey: 'country',
    position: 'top-left',
    onItemMouseEnter: (ev) => {
      console.log(5, ev);
    }
  },
  series: [{
    quickType: 'stackBar',
    style: {
      stroke: '#fff',
      lineWidth: 1
    },
    position: 'year*percent',
    color: 'country',
    onMouseEnter: (ev) => {
      console.log(3, ev);
    },
  }],
  brush: {
    type: 'X',
    onBrushStart(ev, chart) {
      chart.hideTooltip();
    },
    onBrushMove(ev, chart) {
      chart.hideTooltip();
    }
  },
  chart: {
    container: 'mount',
    forceFit: true,
    height: 400,
    padding: [100, 80, 80, 80],
    renderer: 'svg',
    onPlotdblclick: (ev: any, chart: any) => {
      chart.get('options').filters = {};
      chart.repaint();
    }
  },
});
