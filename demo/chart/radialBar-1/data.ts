export const data = [
  { city: '上海', pv: 0.1 },
  { city: '浙江', pv: 0.8 },
  { city: '江苏', pv: 0.4 },
  { city: '江西', pv: 0.5 },
];

export const dataPre = {
  transform: [
    { type: 'sort-by', field: 'pv' }
  ],
};

export const dataMapping = [
  {
    dataKey: 'city',
    mark: 'column',
  }, {
    dataKey: 'pv',
    mark: 'row',
  }
];

