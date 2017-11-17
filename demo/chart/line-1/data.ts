export const data = [
  { country: 'Europe', year: '1750', value: 163 },
  { country: 'Europe', year: '1800', value: 203 },
  { country: 'Europe', year: '1850', value: 276 },
  { country: 'Europe', year: '1900', value: 408 },
  { country: 'Europe', year: '1950', value: 547 },
  { country: 'Europe', year: '1999', value: 729 },
  { country: 'Europe', year: '2050', value: 628 },
  { country: 'Europe', year: '2100', value: 828 },
  { country: 'Asia', year: '1750', value: 502 },
  { country: 'Asia', year: '1800', value: 635 },
  { country: 'Asia', year: '1850', value: 809 },
  { country: 'Asia', year: '1900', value: 947 },
  { country: 'Asia', year: '1950', value: 1402 },
  { country: 'Asia', year: '1999', value: 3634 },
  { country: 'Asia', year: '2050', value: 5268 },
  { country: 'Asia', year: '2100', value: 7268 }
];

export const dataPre = {
  transform: {
    type: 'percent',
    field: 'value',
    dimension: 'country',
    groupBy: ['year'],
    as: 'percent'
  }
};

export const dataDef = [{
  dataKey: 'year',
  mark: 'column',
}, {
  dataKey: 'percent',
  mark: 'row',
}, {
  dataKey: 'country',
  mark: 'color',
}];

export const scale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.2%',
}];
