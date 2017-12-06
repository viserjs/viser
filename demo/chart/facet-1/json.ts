import viser from '../../../packages/viser/src/index';
import { chartData, scale } from './data';

viser({
  data: chartData,
  tooltip: true,
  axis: true,
  scale: scale,
  facet: {
    type: 'rect',
    fields: ['cut', 'clarity'],
    views: {
      series: {
        position: 'carat*price',
        color: 'cut',
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
