# viser-vue [![npm](https://img.shields.io/npm/v/viser-vue.svg)](https://www.npmjs.com/package/viser-vue) [![Dependency Status](https://david-dm.org/viserjs/viser-vue.svg?path=packages/viser-vue)](https://david-dm.org/viserjs/viser-vue.svg?path=packages/viser-vue)

> A toolkit fit for data vis engineer (vue version).

## Install

```sh
$ npm install --save viser-vue
```

## Usage

```vue
<template>
  <div>
    <v-chart :force-fit="true" :height="height" :data="data" :data-pre="dataPre" :data-mapping="dataMapping" :scale="scale">
      <v-tooltip />
      <v-axis />
      <v-stack-bar :v-style="stackBarStyle" />
    </v-chart>
  </div>
</template>

<script>
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

const dataMapping = [
  {
    key: 'month',
    mark: 'column',
  }, {
    key: 'city',
    mark: 'color',
  }, {
    key: 'temperature',
    mark: 'row',
  },
];

const scale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.2%',
}];

export default {
  data() {
    return {
      data,
      dataMapping,
      dataPre,
      scale,
      height: 400,
      stackBarStyle: {
        stroke: "#fff",
        lineWidth: 1
      }
    };
  }
};
</script>

<style scoped>

</style>
```
