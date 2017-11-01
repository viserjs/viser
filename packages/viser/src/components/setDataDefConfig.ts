import * as _ from 'lodash';

function changeDataDef(dataDef) {
  const dataDefObj = {
    row: [],
    column: [],
    color: '',
    size: '',
    shape: '',
    opacity: '',
    scale: {},
  };

  for (const item of dataDef) {
    if (!item.mark || !/column|row|color|shape|size|opacity/.test(item.mark)) {
      throw new Error('please set mark or correct mark (support column, row, color, shape, size, opacity) in dataDef.');
    }

    const mark = Array.isArray(item.mark) ? item.mark : [item.mark];

    if (mark.indexOf('row') >= 0) { dataDefObj.row.push(item.key); }
    if (mark.indexOf('column') >= 0) { dataDefObj.column.push(item.key); }
    if (mark.indexOf('color') >= 0) { dataDefObj.color = item.key; }
    if (mark.indexOf('shape') >= 0) { dataDefObj.shape = item.key; }
    if (mark.indexOf('size') >= 0) { dataDefObj.size = item.key; }
    if (mark.indexOf('opacity') >= 0) { dataDefObj.opacity = item.key; }

    if (item.scale && !_.isEmpty(item.scale)) {
      dataDefObj.scale[item.key] = item.scale;
    }
  }

  if (!dataDefObj.row.length) {
    throw new Error('please set at least 1 row key in dataDef.');
  }

  if (!dataDefObj.column.length) {
    throw new Error('please set at least 1 column key in dataDef.');
  }

  return dataDefObj;
}

export const process = (config) => {
  const { dataDef, data, dataPre } = config;

  if (!dataDef) { throw new Error('please set dataDef option firstly.'); }

  const arrDataDef = Array.isArray(dataDef) ? dataDef : [dataDef];
  const objDataDef = changeDataDef(arrDataDef);

  return objDataDef;
};
