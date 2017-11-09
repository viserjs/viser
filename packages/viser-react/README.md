# viser-react [![npm](https://img.shields.io/npm/v/viser-react.svg)](https://www.npmjs.com/package/viser-react) [![Dependency Status](https://david-dm.org/viserjs/viser-react.svg?path=packages/viser-react)](https://david-dm.org/viserjs/viser-react.svg?path=packages/viser-react)

> A toolkit fit for data vis engineer (react version).

## Install

```sh
$ npm install --save viser-react
```

## Usage

```jsx
import { Chart, SmoothLine, Point, Tooltip, Legend, Axis } from 'viser-react';
import * as ReactDOM from 'react-dom';
import * as React from 'react';

const data = [
  { month: 'Jan', Tokyo: 7.0, London: 3.9 },
  { month: 'Feb', Tokyo: 6.9, London: 4.2 },
  { month: 'Mar', Tokyo: 9.5, London: 5.7 },
  { month: 'Apr', Tokyo: 14.5, London: 8.5 },
  { month: 'May', Tokyo: 18.4, London: 11.9 },
  { month: 'Jun', Tokyo: 21.5, London: 15.2 },
  { month: 'Jul', Tokyo: 25.2, London: 17.0 },
  { month: 'Aug', Tokyo: 26.5, London: 16.6 },
  { month: 'Sep', Tokyo: 23.3, London: 14.2 },
  { month: 'Oct', Tokyo: 18.3, London: 10.3 },
  { month: 'Nov', Tokyo: 13.9, London: 6.6 },
  { month: 'Dec', Tokyo: 9.6, London: 4.8 }
];

const dataPre = {
  transform: [{
    type: 'fold',
    fields: ['Tokyo', 'London'],
    key: 'city',
    value: 'temperature',
  }]
};

const dataDef = [
  {
    key: 'month',
    mark: 'column',
    scale: {
      range: [0, 1],
    },
  }, {
    key: 'city',
    mark: 'color',
    scale: {},
  }, {
    key: 'temperature',
    mark: 'row',
    scale: {},
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Chart width={800} height={400} data={data} dataPre={dataPre} dataDef={dataDef}>
          <SmoothLine />
          <Point size={4} style={{ stroke: '#fff', lineWidth: 1 }} />
          <Tooltip crosshairs={{ type: 'line' }} />
          <Legend />
          <Axis />
        </Chart>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('mountNode'));
```
