import viser from '../../../packages/viser/src/index';
import { sourcedata } from './data';
const DataSet = require('@antv/data-set');
const { DataView } = DataSet;

const scale = [{
  dataKey: 'mean',
  sync: true
}, {
  dataKey: 'cut',
  sync: true,
}];

viser({
  data: sourcedata,
  tooltip: true,
  legend: true,
  coord: {
    type: "polar"
  },
  scale: scale,
  facet: {
    type: "circle",
    fields: ['clarity'],
    views: (view, facet) => {
      const data = facet.data;
      const dv = new DataView();
      dv.source(data).transform({
        type: 'aggregate',
        fields: [ 'price' ],
        operations: [ 'mean' ],
        as: [ 'mean' ],
        groupBy: [ 'cut' ]
      });

      return {
        data: dv,
        series: {
          quickType: 'interval',
          position: 'cut*mean',
          color: 'cut',
        }
      }
    }
  },
  chart: {
    container: 'mount',
    forceFit: true,
    height: 600,
  },
});
