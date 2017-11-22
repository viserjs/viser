import * as _ from 'lodash';
import IDataPreConfig from '../typed/IDataPre';

const DataSet = require('@antv/data-set');

const GEO_DATA: any = {};

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
    throw new Error(`The candle fields of DataPre must be greater than 0.`);
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

// store the geo data to GEO_DATA
function processGeoJsonConnector(ds: any, data: any, dataPre: any) {
  const { source, geoKey } = dataPre;

  const dv = ds.createView()
  .source(data, { type: 'GeoJSON' });

  let transform = dataPre.transform;

  for (const item of dataPre.transform) {
    ds = dv.transform(transform);
  }

  if (geoKey) {
    GEO_DATA[geoKey] = dv;
  } else {
    throw new Error('please set geoKey in transform config.');
  }

  return dv;
}

function processHierarchyConnector(ds: any, data: any, dataPre: any) {
  const transform = dataPre.transform[0];

  const dv = ds.createView()
  .source(data, { type: 'hierarchy' })
  .transform({
    field: 'value',
    type: 'hierarchy.treemap',
    tile: 'treemapResquarify',
    as: ['x', 'y'],
    ...transform,
  });

  const res = dv.getAllNodes().map((node: any) => {
    if (transform.nameKey) {
      node.name = node.data[transform.nameKey];
    }
    if (transform.valueKey) {
      node.value = node.data[transform.valueKey];
    }
    return node;
  });

  return res;
}

function processGraphConnector(ds: any, data: any, dataPre: any) {
  const { source } = dataPre;
  const transform = dataPre.transform[0];

  if (source) {
    if (source.edgesKey) {
      source.edges = (d: any) => d[source.edgesKey];
    }
    if (source.nodesKey) {
      source.nodes = (d: any) => d[source.nodesKey];
    }
  }

  if (transform) {
    if (transform.sourceWeightKey) {
      transform.sourceWeight = (d: any) => d[source.sourceWeightKey];
    }

    if (transform.targetWeightKey) {
      transform.targetWeightKey = (d: any) => d[transform.targetWeightKey];
    }
  }

  const dv = ds.createView()
  .source(data, {
    type: 'graph',
    ...source,
  })
  .transform(transform);

  return dv;
}

function processCommonConnector(dv: any, item: any) {
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
    dv = dv.transform({
      geoDataView: GEO_DATA[item.useGeoView],
      ...item,
    });
  } else {
    dv = dv.transform(item);
  }

  return dv;
}

export const preprocessing = (data: any, dataPre: IDataPreConfig) => {
  if (_.isEmpty(data)) { return []; }
  if (_.isEmpty(dataPre)) { return data; }

  let ds;
  if (dataPre.useDataView) {
    ds = new DataSet.DataView();
  } else {
    ds = new DataSet();
  }

  let transform = dataPre.transform as any;

  transform  = Array.isArray(transform) ? transform : [transform];

  if (dataPre.connector === 'hierarchy') {
    return processHierarchyConnector(ds, data, dataPre);
  } else if (dataPre.connector === 'graph') {
    return processGraphConnector(ds, data, dataPre);
  } else if (dataPre.connector === 'GeoJSON') {
    return processGeoJsonConnector(ds, data, dataPre);
  }

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

  let dv;
  if (dataPre.useDataView) {
    dv = ds.source(data);
  } else {
    dv = ds.createView().source(data);
  }

  for (const item of transform) {
    ds = processCommonConnector(dv, item);
  }

  return ds.rows;
};
