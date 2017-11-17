"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
function changeDataDef(dataDef) {
    var dataDefObj = {
        row: [],
        column: [],
        color: '',
        size: '',
        shape: '',
        opacity: '',
    };
    for (var _i = 0, dataDef_1 = dataDef; _i < dataDef_1.length; _i++) {
        var item = dataDef_1[_i];
        if (!item.mark || !/column|row|color|shape|size|opacity/.test(item.mark)) {
            throw new Error('please set mark or correct mark (support column, row, color, shape, size, opacity) in dataDef.');
        }
        var mark = Array.isArray(item.mark) ? item.mark : [item.mark];
        if (mark.indexOf('row') >= 0) {
            dataDefObj.row.push(item.dataKey);
        }
        if (mark.indexOf('column') >= 0) {
            dataDefObj.column.push(item.dataKey);
        }
        if (mark.indexOf('color') >= 0) {
            dataDefObj.color = item.dataKey;
        }
        if (mark.indexOf('shape') >= 0) {
            dataDefObj.shape = item.dataKey;
        }
        if (mark.indexOf('size') >= 0) {
            dataDefObj.size = item.dataKey;
        }
        if (mark.indexOf('opacity') >= 0) {
            dataDefObj.opacity = item.dataKey;
        }
    }
    if (!dataDefObj.row.length) {
        throw new Error('please set at least 1 row dataKey in dataDef.');
    }
    if (!dataDefObj.column.length) {
        throw new Error('please set at least 1 column dataKey in dataDef.');
    }
    return dataDefObj;
}
exports.process = function (config) {
    var dataDef = config.dataDef, dataPre = config.dataPre;
    if (!dataDef || _.isPlainObject(dataDef)) {
        return config;
    }
    var arrDataDef = Array.isArray(dataDef) ? dataDef : [dataDef];
    var objDataDef = changeDataDef(arrDataDef);
    config.dataDef = objDataDef;
    return config;
};
//# sourceMappingURL=setDataDefConfig.js.map