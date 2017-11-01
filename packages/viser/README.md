# viser [![npm](https://img.shields.io/npm/v/viser.svg)](https://www.npmjs.com/package/viser) [![Dependency Status](https://david-dm.org/viserjs/viser.svg?path=packages/viser)](https://david-dm.org/viserjs/viser.svg?path=packages/viser)

> A toolkit fit for data vis engineer.

## Install

```sh
$ npm install --save viser
```

## Usage

```jsx
import viser from 'viser';

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

viser({
  data,
  dataPre,
  dataDef,
  axis: [{
    show: true,
    dataKey: 'temperature',
    label: {
      formatter: val => (val + '°C'),
    }
  }],
  legend: true,
  tooltip: {
    crosshairs: {
      type: 'line'
    }
  },
  series: [{
    quickType: 'smoothLine',
    size: 2,
  }, {
    quickType: 'point',
    size: 4,
    style: {
      stroke: '#fff',
      lineWidth: 1,
    },
  }],
  chart: {
    container: 'mountNode',
    width: 800,
    height: 400,
  },
});
```
