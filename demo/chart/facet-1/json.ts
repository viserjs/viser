import viser from '../../../packages/viser/src/index';
import { chartData } from './data'

viser({
  data: chartData,
  tooltip: true,
  dataMapping: [{
    dataKey: 'carat',
    mark: 'column',
  }, {
    dataKey: 'price',
    mark: 'row',
  }, {
    dataKey: 'cut',
    mark: 'color',
  }],
  scale: [{
    dataKey: 'carat',
    sync: true
  }, {
    dataKey: 'price',
    sync: true,
    tickCount: 3
  }, {
    dataKey: 'cut',
    sync: true,
  }],
  facet: {
    type: 'rect',
    fields: ['cut', 'clarity'],
    views: {
      axis: true,
      tooltip: true,
      series: {
        quickType: 'point',
        opacity: 0.3,
        size: 3,
      }
    }
  },
  chart: {
    container: 'mount',
    forceFit: true,
    height: 600,
  },
});
