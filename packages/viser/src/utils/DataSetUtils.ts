import * as DataSet from '@antv/data-set';
import * as _ from 'lodash';

const GEO_DATA = {};

function handleToNumber(row, def) {
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
function handleMergeFields(row, item, num) {
  const fields = item.fields;

  if (!Array.isArray(fields) || fields.length !== num) {
    throw new Error(`The candle fields of DataPre must be equals ${num}.`);
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
function processExchangeColumnToRow(data, item) {
  const itemArr = Array.isArray(item.fields) ? item.fields : [item.fields];
  const finalData = [];

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

// store the geo data to GEO_DATA
function processGeoJsonConnector(ds, data, dataPre) {
  const { source, geoKey } = dataPre;

  const dv = ds.createView()
  .source(data, { type: 'GeoJSON' });

  let transform = dataPre.transform;
  transform = Array.isArray(transform) ? transform : [transform];

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

function processHierarchyConnector(ds, data, item) {
  const dv = ds.createView()
  .source(data, { type: 'hierarchy' })
  .transform({
    field: 'value',
    type: 'hierarchy.treemap',
    tile: 'treemapResquarify',
    as: ['x', 'y'],
    ...item,
  });

  const res = dv.getAllNodes().map(node => {
    if (item.nameKey) {
      node.name = node.data[item.nameKey];
    }
    if (item.valueKey) {
      node.value = node.data[item.valueKey];
    }
    return node;
  });

  return res;
}

function processGraphConnector(ds, data, dataPre) {
  const { source, transform } = dataPre;

  if (source) {
    if (source.edgesKey) {
      source.edges = d => d[source.edgesKey];
    }
    if (source.nodesKey) {
      source.nodes = d => d[source.nodesKey];
    }
  }

  if (transform) {
    if (transform.sourceWeightKey) {
      transform.sourceWeight = d => d[source.sourceWeightKey];
    }

    if (transform.targetWeightKey) {
      transform.targetWeightKey = d => d[transform.targetWeightKey];
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

function processCommonConnector(dv, item) {
  if (item.quickType === 'toNumber') {
    dv = dv.transform({
      type: 'map',
      callback(row) {
        return handleToNumber(row, item);
      }
    });
  } else if (item.quickType === 'merge') {
    dv = dv.transform({
      type: 'map',
      callback(row) {
        return handleMergeFields(row, item, item.fields.length);
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

export const preprocessing = (config) => {
  const { dataPre } = config;
  let data = config.data;
  let ds = new DataSet();

  if (_.isEmpty(data)) { return; }

  if (_.isEmpty(dataPre) || (!dataPre.connector && !dataPre.transform)) {
    return ds.createView().source(data);
  }

  if (dataPre.connector === 'hierarchy') {
    return processHierarchyConnector(ds, data, dataPre.transform);
  } else if (dataPre.connector === 'graph') {
    return processGraphConnector(ds, data, dataPre);
  } else if (dataPre.connector === 'GeoJSON') {
    return processGeoJsonConnector(ds, data, dataPre);
  }

  if (dataPre.transform && dataPre.transform.length &&
      dataPre.transform[0].quickType === 'exchange') {
    data = processExchangeColumnToRow(data, dataPre.transform[0]);
  }

  const dv = ds.createView().source(data);

  for (const item of dataPre.transform) {
    ds = processCommonConnector(dv, item);
  }

  return ds.rows;
};
