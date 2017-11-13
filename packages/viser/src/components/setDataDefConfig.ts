import * as _ from 'lodash';

function changeDataDef(dataDef) {
  const dataDefObj = {
    row: [],
    column: [],
    color: '',
    size: '',
    shape: '',
    opacity: '',
  };

  for (const item of dataDef) {
    if (!item.mark || !/column|row|color|shape|size|opacity/.test(item.mark)) {
      throw new Error('please set mark or correct mark (support column, row, color, shape, size, opacity) in dataDef.');
    }

    const mark = Array.isArray(item.mark) ? item.mark : [item.mark];

    if (mark.indexOf('row') >= 0) { dataDefObj.row.push(item.dataKey); }
    if (mark.indexOf('column') >= 0) { dataDefObj.column.push(item.dataKey); }
    if (mark.indexOf('color') >= 0) { dataDefObj.color = item.dataKey; }
    if (mark.indexOf('shape') >= 0) { dataDefObj.shape = item.dataKey; }
    if (mark.indexOf('size') >= 0) { dataDefObj.size = item.dataKey; }
    if (mark.indexOf('opacity') >= 0) { dataDefObj.opacity = item.dataKey; }
  }

  if (!dataDefObj.row.length) {
    throw new Error('please set at least 1 row dataKey in dataDef.');
  }

  if (!dataDefObj.column.length) {
    throw new Error('please set at least 1 column dataKey in dataDef.');
  }

  return dataDefObj;
}

export const process = (config) => {
  const { dataDef, dataPre } = config;

  if (!dataDef || _.isPlainObject(dataDef)) { return config; }

  const arrDataDef = Array.isArray(dataDef) ? dataDef : [dataDef];
  const objDataDef = changeDataDef(arrDataDef);
  config.dataDef = objDataDef;

  return config;
};
