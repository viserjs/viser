import { Chart, Tooltip, Edge, View, Polygon, Coord } from '../../../packages/viser-react/src/index';
import * as React from 'react';
import { data, scale } from './data';
const DataSet = require('@antv/data-set');

const ds: any = new DataSet();
const dv = ds.createView().source(data, {
  type: 'graph',
  edges: d => d.links
});

dv.transform({
  type: 'diagram.arc',
  sourceWeight: e => e.sourceWeight,
  targetWeight: e => e.targetWeight,
  weight: true,
  marginRatio: 0.3
});

export default class App extends React.Component {
  state = {
    label: [
      'name', {
        labelEmit: true,
        textStyle: {
          fill: '#8c8c8c'
        },
      }
    ],
  }

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.setState({
      label: [
        'name', {
          labelEmit: true,
          textStyle: {
            fill: 'red'
          },
        }
      ],
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click</button>
        <Chart forceFit height={600} scale={scale}>
          <View viewId='2' data={dv.edges}>
            <Coord type="polar" direction="yReverse" rotate={90}/>
            <Edge position='x*y' color='source' shape='arc' opacity={0.5} tooltip={'source*target*value'} />
          </View>
          <View viewId='3' data={dv.nodes}>
            <Coord type="polar" direction="yReverse" rotate={90}/>
            <Polygon position='x*y' color='id' label={this.state.label} />
          </View>
        </Chart>
      </div>
    );
  }
}
