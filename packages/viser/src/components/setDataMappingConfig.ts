import * as _ from 'lodash';

function changeDataMapping(dataMapping) {
  const dataMappingObj = {
    row: [],
    column: [],
    color: '',
    size: '',
    shape: '',
    opacity: '',
  };

  for (const item of dataMapping) {
    if (!item.mark || !/column|row|color|shape|size|opacity/.test(item.mark)) {
      throw new Error('please set mark or correct mark (support column, row, color, shape, size, opacity) in dataMapping.');
    }

    const mark = Array.isArray(item.mark) ? item.mark : [item.mark];

    if (mark.indexOf('row') >= 0) { dataMappingObj.row.push(item.dataKey); }
    if (mark.indexOf('column') >= 0) { dataMappingObj.column.push(item.dataKey); }
    if (mark.indexOf('color') >= 0) { dataMappingObj.color = item.dataKey; }
    if (mark.indexOf('shape') >= 0) { dataMappingObj.shape = item.dataKey; }
    if (mark.indexOf('size') >= 0) { dataMappingObj.size = item.dataKey; }
    if (mark.indexOf('opacity') >= 0) { dataMappingObj.opacity = item.dataKey; }
  }

  if (!dataMappingObj.row.length) {
    throw new Error('please set at least 1 row dataKey in dataMapping.');
  }

  if (!dataMappingObj.column.length) {
    throw new Error('please set at least 1 column dataKey in dataMapping.');
  }

  return dataMappingObj;
}

export const process = (config) => {
  const { dataMapping, dataPre } = config;

  if (!dataMapping || _.isPlainObject(dataMapping)) { return config; }

  const arrDataMapping = Array.isArray(dataMapping) ? dataMapping : [dataMapping];
  const objDataMapping = changeDataMapping(arrDataMapping);
  config.dataMapping = objDataMapping;

  return config;
};
