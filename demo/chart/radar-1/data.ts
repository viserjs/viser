export const data = [
  { item: 'Design', a: 70, b: 30 },
  { item: 'Development', a: 60, b: 70 },
  { item: 'Marketing', a: 50, b: 60 },
  { item: 'Users', a: 40, b: 50 },
  { item: 'Test', a: 60, b: 70 },
  { item: 'Language', a: 70, b: 50 },
  { item: 'Technology', a: 50, b: 40 },
  { item: 'Support', a: 30, b: 40 },
  { item: 'Sales', a: 60, b: 40 },
  { item: 'UX', a: 50, b: 60 }
];

export const dataPre = {
  transform: [{
    type: 'fold',
    fields: [ 'a', 'b' ],
    key: 'user',
    value: 'score',
  }]
};

export const dataDef = [
  {
    dataKey: 'item',
    mark: 'column',
  }, {
    dataKey: 'user',
    mark: 'color',
  }, {
    dataKey: 'score',
    mark: 'row',
  }
];
export const scale = [{
  dataKey: 'score',
  min: 0,
}];
