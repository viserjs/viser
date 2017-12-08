import * as _ from 'lodash';
import IDataPreConfig from '../typed/IDataPre';

const DataSet = require('@antv/data-set');

function handleToNumber(row: any, def: any) {
  const fields = Array.isArray(def.fields) ? def.fields : [def.fields];

  for (const item of fields) {
    row[item] = parseFloat(row[item]);
  }

  return row;
}

// exchage column merge to arry
// [
//   { x: 1, y: 1, z: 1 },
//   { x: 2, y: 2, z: 2 },
// ]
// merge x, y to
// [
//   { xy: [1, 1], z: 1 }
//   { xy: [2, 2], z: 2 }
// ]
function handleMergeFields(row: any, item: any) {
  const fields = item.fields;

  if (!Array.isArray(fields) || fields.length === 0) {
    throw new Error(`The merge fields of DataPre must be greater than 0.`);
  }

  const newItem = [];
  for (const field of fields) {
    newItem.push(row[field]);
  }

  row[item.as] = newItem;

  return row;
}

// exchage column to row
// fields appointed the key of exchange
// {
//   x: [1, 2, 3],
//   y: [1, 2, 3],
// }
// to
// [
//   { x: 1, y: 1 }
//   { x: 2, y: 2 }
//   { x: 3, y: 3 }
// ]
function processExchangeColumnToRowOne(data: any, item: any) {
  const itemArr = Array.isArray(item.fields) ? item.fields : [item.fields];
  const finalData: any = [];

  for (const res in data) {
    if (data.hasOwnProperty(res) && itemArr.indexOf(res) >= 0) {
      for (let i = 0; i < data[res].length; i++) {
        if (!finalData[i]) { finalData[i] = {}; }
        if (data[res][i]) { finalData[i][res] = data[res][i]; }
      }
    }
  }

  return finalData;
}

// exchage column to row
// fields appointed the key of exchange
// [
//   ['x', 1, 2, 3],
//   ['y', 1, 2, 3],
// ]
// to
// [
//   { x: 1, y: 1 }
//   { x: 2, y: 2 }
//   { x: 3, y: 3 }
// ]
function processExchangeColumnToRowTwo(data: any, item: any) {
  const itemArr = Array.isArray(item.fields) ? item.fields : [item.fields];
  const finalData: any = [];

  for (const res of data) {
    const key = res[0];

    if (itemArr.indexOf(key) >= 0) {
      for (let i = 1; i < res.length; i++) {
        if (!finalData[i - 1]) { finalData[i - 1] = {}; }
        if (res[i]) { finalData[i - 1][key] = res[i]; }
      }
    }
  }

  return finalData;
}

// exchage column to row
// fields appointed the key of exchange
// [
//   [1, 2, 3],
//   [1, 2, 3],
// ]
// to
// [
//   { x: 1, y: 1 }
//   { x: 2, y: 2 }
//   { x: 3, y: 3 }
// ]
function processExchangeColumnToRowThree(data: any, item: any) {
  const itemArr = Array.isArray(item.fields) ? item.fields : [item.fields];
  const finalData: any = [];
  let i = 0;

  for (const res of data) {
    const key = itemArr[i];

    for (let i = 0; i < res.length; i++) {
      if (!finalData[i]) { finalData[i] = {}; }
      if (res[i]) { finalData[i][key] = res[i]; }
    }
    i++;
  }

  return finalData;
}

function processCommonTransform(dv: any, item: any) {
  if (item.type === 'toNumber') {
    dv = dv.transform({
      type: 'map',
      callback(row: any) {
        return handleToNumber(row, item);
      }
    });
  } else if (item.type === 'merge') {
    dv = dv.transform({
      type: 'map',
      callback(row: any) {
        return handleMergeFields(row, item);
      }
    });
  } else if (item.type === 'geo.centroid' || item.type === 'geo.region') {
    // there use special dataId 'geo'
    // dv = dv.transform({
    //   geoDataView: item.['geo'],
    //   ...item,
    // });
  } else {
    dv = dv.transform(item);
  }

  return dv;
}

function createSource(data: any, dataPre: IDataPreConfig) {
  let ds = new DataSet();
  let dv;

  if (!_.get(dataPre, 'connector')) {
    dv = ds.createView().source(data);
  } else {
    dv = ds.createView().source(data, dataPre.connector);
  }

  return dv;
}

export const getProcessedData = (data: any, dataPre: IDataPreConfig) => {
  if (_.isEmpty(data)) { return []; }

  if (_.isEmpty(dataPre) || _.isEmpty(dataPre.transform)) {
    return createSource(data, dataPre);
  }

  dataPre.transform = Array.isArray(dataPre.transform) ? dataPre.transform : [dataPre.transform];
  let transform = dataPre.transform as any;

  // basic exchange row and colmun
  if (transform && transform.length) {
    const exchangeType = transform[0].exchangeType;
    if (exchangeType === 'type-1') {
      data = processExchangeColumnToRowOne(data, transform[0]);
    } else if (exchangeType === 'type-2') {
      data = processExchangeColumnToRowTwo(data, transform[0]);
    } else if (exchangeType === 'type-3') {
      data = processExchangeColumnToRowThree(data, transform[0]);
    }
  }

  let dv = createSource(data, dataPre);

  let ds;
  for (const item of transform) {
    if (item.exchangeType) { continue; }
    ds = processCommonTransform(dv, item);
  }

  return ds;
};

export const getDataContent = (data: any, dataView: string = 'rows') => {
  if (_.isArray(dataView) && dataView.length >= 2) {
    const type = dataView[0];

    if (_.isFunction(dataView[1])) {
      if (type === 'nodes') {
        return dataView[1](data.getAllNodes());
      } else if (type === 'edges') {
        return dataView[1](data.getAllLinks());
      }
    }
  }

  return data[dataView];
}
