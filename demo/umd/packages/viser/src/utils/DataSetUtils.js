"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var DataSet = require('@antv/data-set');
var GEO_DATA = {};
function handleToNumber(row, def) {
    var fields = Array.isArray(def.fields) ? def.fields : [def.fields];
    for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
        var item = fields_1[_i];
        row[item] = parseFloat(row[item]);
    }
    return row;
}
function handleMergeFields(row, item) {
    var fields = item.fields;
    if (!Array.isArray(fields) || fields.length === 0) {
        throw new Error("The candle fields of DataPre must be greater than 0.");
    }
    var newItem = [];
    for (var _i = 0, fields_2 = fields; _i < fields_2.length; _i++) {
        var field = fields_2[_i];
        newItem.push(row[field]);
    }
    row[item.as] = newItem;
    return row;
}
function processExchangeColumnToRow(data, item) {
    var itemArr = Array.isArray(item.fields) ? item.fields : [item.fields];
    var finalData = [];
    for (var res in data) {
        if (data.hasOwnProperty(res) && itemArr.indexOf(res) >= 0) {
            for (var i = 0; i < data[res].length; i++) {
                if (!finalData[i]) {
                    finalData[i] = {};
                }
                if (data[res][i]) {
                    finalData[i][res] = data[res][i];
                }
            }
        }
    }
    return finalData;
}
function processGeoJsonConnector(ds, data, dataPre) {
    var source = dataPre.source, geoKey = dataPre.geoKey;
    var dv = ds.createView()
        .source(data, { type: 'GeoJSON' });
    var transform = dataPre.transform;
    for (var _i = 0, _a = dataPre.transform; _i < _a.length; _i++) {
        var item = _a[_i];
        ds = dv.transform(transform);
    }
    if (geoKey) {
        GEO_DATA[geoKey] = dv;
    }
    else {
        throw new Error('please set geoKey in transform config.');
    }
    return dv;
}
function processHierarchyConnector(ds, data, dataPre) {
    var transform = dataPre.transform[0];
    var dv = ds.createView()
        .source(data, { type: 'hierarchy' })
        .transform(__assign({ field: 'value', type: 'hierarchy.treemap', tile: 'treemapResquarify', as: ['x', 'y'] }, transform));
    var res = dv.getAllNodes().map(function (node) {
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
function processGraphConnector(ds, data, dataPre) {
    var source = dataPre.source;
    var transform = dataPre.transform[0];
    if (source) {
        if (source.edgesKey) {
            source.edges = function (d) { return d[source.edgesKey]; };
        }
        if (source.nodesKey) {
            source.nodes = function (d) { return d[source.nodesKey]; };
        }
    }
    if (transform) {
        if (transform.sourceWeightKey) {
            transform.sourceWeight = function (d) { return d[source.sourceWeightKey]; };
        }
        if (transform.targetWeightKey) {
            transform.targetWeightKey = function (d) { return d[transform.targetWeightKey]; };
        }
    }
    var dv = ds.createView()
        .source(data, __assign({ type: 'graph' }, source))
        .transform(transform);
    return dv;
}
function processCommonConnector(dv, item) {
    if (item.quickType === 'toNumber') {
        dv = dv.transform({
            type: 'map',
            callback: function (row) {
                return handleToNumber(row, item);
            }
        });
    }
    else if (item.quickType === 'merge') {
        dv = dv.transform({
            type: 'map',
            callback: function (row) {
                return handleMergeFields(row, item);
            }
        });
    }
    else if (item.type === 'geo.centroid' || item.type === 'geo.region') {
        dv = dv.transform(__assign({ geoDataView: GEO_DATA[item.useGeoView] }, item));
    }
    else {
        dv = dv.transform(item);
    }
    return dv;
}
exports.preprocessing = function (data, dataPre) {
    if (_.isEmpty(data)) {
        return [];
    }
    if (_.isEmpty(dataPre)) {
        return data;
    }
    var ds;
    if (dataPre.useDataView) {
        ds = new DataSet.DataView();
    }
    else {
        ds = new DataSet();
    }
    var transform = dataPre.transform;
    dataPre.transform = Array.isArray(transform) ? transform : [transform];
    if (dataPre.connector === 'hierarchy') {
        return processHierarchyConnector(ds, data, dataPre);
    }
    else if (dataPre.connector === 'graph') {
        return processGraphConnector(ds, data, dataPre);
    }
    else if (dataPre.connector === 'GeoJSON') {
        return processGeoJsonConnector(ds, data, dataPre);
    }
    if (dataPre.transform && dataPre.transform.length &&
        dataPre.transform[0].quickType === 'exchange') {
        data = processExchangeColumnToRow(data, dataPre.transform[0]);
    }
    var dv;
    if (dataPre.useDataView) {
        dv = ds.source(data);
    }
    else {
        dv = ds.createView().source(data);
    }
    for (var _i = 0, _a = dataPre.transform; _i < _a.length; _i++) {
        var item = _a[_i];
        ds = processCommonConnector(dv, item);
    }
    return ds.rows;
};
//# sourceMappingURL=DataSetUtils.js.map