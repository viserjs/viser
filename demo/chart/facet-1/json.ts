import viser from '../../../packages/viser/src/index';
import { chartData, dataMapping, scale } from './data';

viser({
  data: chartData,
  tooltip: true,
  dataMapping: dataMapping,
  scale: scale,
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
