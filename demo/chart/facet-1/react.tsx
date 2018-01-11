import { Chart, Facet, Coord, View, Tooltip, Legend, Axis, Point, FacetView } from '../../../packages/viser-react/src/index';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { sourcedata } from './data'
const DataSet = require('@antv/data-set');
const { DataView } = DataSet;

const scale = [{
  dataKey: 'mean',
  sync: true
}, {
  dataKey: 'cut',
  sync: true,
}];

class App extends React.Component {
  render() {
    const views = (view, facet) => {
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
          quickType: 'bar',
          position: 'cut*mean',
          color: 'cut',
        }
      }
    }
    return (
      <div>
        <Chart forceFit={true} height={600} data={sourcedata} scale={scale}>
          <Tooltip />
          <Legend />
          <Coord type="polar" />
          <Facet type="circle" fields={['clarity']} views={views} />
        </Chart>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('mount'));
