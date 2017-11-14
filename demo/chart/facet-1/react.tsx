import { Chart, Facet, View, Tooltip, Legend, Axis, Point, FacetView } from '../../../packages/viser-react/src/index';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import * as data from './data';

const chartData = data.default;

const dataDef = [
  {
    dataKey: 'carat',
    mark: 'column',
  }, {
    dataKey: 'price',
    mark: 'row',
  }, {
    dataKey: 'cut',
    mark: 'color',
  }
];

const scale = [{
  dataKey: 'carat',
  sync: true
}, {
  dataKey: 'price',
  sync: true,
  tickCount: 3
}, {
  dataKey: 'cut',
  sync: true,
}];

class App extends React.Component {
  render() {
    return (
      <div>
        <Chart forceFit={true} height={600} data={chartData} dataDef={dataDef} scale={scale}>
          <Facet type="rect" fields={['cut', 'clarity']}>
            <FacetView>
              <Axis />
              <Tooltip />
              <Point opacity={0.3} size={3} />
            </FacetView>
          </Facet>
        </Chart>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('mount'));
