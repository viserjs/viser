import viser from '../../../packages/viser/src/index';

import { data, dataPre, dataDef } from './data';

viser({
  data: {
    name: 'root',
    children: [
      { name: '分类 1', value: 560 },
      { name: '分类 2', value: 500 },
      { name: '分类 3', value: 150 },
      { name: '分类 4', value: 140 },
      { name: '分类 5', value: 115 },
      { name: '分类 6', value: 95 },
      { name: '分类 7', value: 90 },
      { name: '分类 8', value: 75 },
      { name: '分类 9', value: 98 },
      { name: '分类 10', value: 60 },
      { name: '分类 11', value: 45 },
      { name: '分类 12', value: 40 },
      { name: '分类 13', value: 40 },
      { name: '分类 14', value: 35 },
      { name: '分类 15', value: 40 },
      { name: '分类 16', value: 40 },
      { name: '分类 17', value: 40 },
      { name: '分类 18', value: 30 },
      { name: '分类 19', value: 28 },
      { name: '分类 20', value: 16 }
    ]
  },
  // data: province.data,
  dataPre: {
    connector: 'hierarchy',
    transform: {
      type: 'hierarchy.treemap', field: 'value', tile: 'treemapResquarify', as: ['x', 'y'], nameKey: 'name', valueKey: 'value'
    },
  },
  dataDef: [
    {
      key: 'x',
      mark: 'column',
    },
    {
      key: 'y',
      mark: 'row',
    },
    {
      key: 'name',
      mark: 'color',
      scale: {},
    },
  ],
  tooltip: {
    title: 'hahah',
    offset: 0,
    crossHairs: {
      show: false,
    },
  },
  series: {
    position: 'x*y',
    gemo: 'polygon',
    tooltip: {
      dataKey: 'name*value'
    },
    style: {
      lineWidth: 1,
      stroke: '#fff',
    },
    label: {
      dataKey: 'name',
      textStyle: {
        textBaseline: 'middle'
      },
      formatter(val) {
        if (val !== 'root') {
          return val;
        }
      },
    }
  },
  chart: {
    type: 'commonChart',
    container: 'mount',
    forceFit: true,
    width: 800,
    height: 400,
    margin: [10, 10],
	},
});
