import { Chart, Facet, Coord, View, Tooltip, Legend, Axis, Point, FacetView } from '../../../packages/viser-react/src/index';
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

export default class App extends React.Component {
  state = {
    data: [],
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: sourcedata
      });
    }, 500);
  }
  render() {
    return (
      <div>
        <Chart forceFit={true} height={600} data={this.state.data} scale={scale}>
          <Tooltip />
          <Legend />
          <Coord type="polar" />
          <Facet type="circle" fields={['clarity']} views={views} />
        </Chart>
      </div>
    );
  }
}
