import { Chart, Tooltip, Axis, Legend, Coord, Series, Line } from '../../../packages/viser-react/src/index';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { data, dataDef, dataPre, scale } from './data'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const axisGridStyle1 = {
      hideFirstLine: false,
      lineStyle: {
        lineDash: null,
      }
    };
    const axisGridStyle2 = {
      alternateColor: "rgba(0, 0, 0, 0.04)",
      lineStyle: {
        lineDash: null,
      },
      type: "polygon"
    };
    return (
      <div>
        <Chart width={400} height={300} data={data} dataPre={dataPre} dataDef={dataDef} scale={scale}>
          <Coord type="polar"/>
          <Series geom={'line'} position={['item', 'score']} size={2}></Series>
          <Series geom={'line'} position={['item', 'score']} size={2}></Series>
          <Series geom={'point'} position={['item', 'score']} style={{lineWidth: 1, fillOpacity: 1}} shape={'circle'}></Series>
          <Tooltip />
          <Legend dataKey={'user'} marker={'circle'}/>
          <Axis dataKey={'item'} show={true} grid={axisGridStyle1}/>
          <Axis dataKey={'score'} show={true} grid={axisGridStyle2}/>
        </Chart>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('mount'));
