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
var setCustomFormatter = require("./setCustomFormatter");
var _ = require("lodash");
function validateAxis(dataDef, oriAxis) {
    if (oriAxis === true) {
        return true;
    }
    var axis = Array.isArray(oriAxis) ? oriAxis : [oriAxis];
    var seriesKey = [];
    var newAxis = [];
    for (var _i = 0, _a = dataDef.column; _i < _a.length; _i++) {
        var citem = _a[_i];
        seriesKey.push(citem);
    }
    for (var _b = 0, _c = dataDef.row; _b < _c.length; _b++) {
        var ritem = _c[_b];
        seriesKey.push(ritem);
    }
    for (var _d = 0, axis_1 = axis; _d < axis_1.length; _d++) {
        var item = axis_1[_d];
        if (item && item.dataKey && seriesKey.indexOf(item.dataKey) >= 0) {
            newAxis.push(item);
        }
    }
    return newAxis;
}
function setRotatePolarAxis(chart, config) {
    var coord = config.coord, data = config.data, dataDef = config.dataDef, axis = config.axis;
    var colsKey = dataDef.column[0];
    var axisTick = dataDef.scale[colsKey];
    if (!axisTick || !_.get(axisTick, 'tick.rotate')) {
        return;
    }
    var tickStyle = {};
    if (axisTick.tick.rotate === 'parallel') {
        tickStyle = {
            rotate: coord.startAngle,
            textAlign: 'center',
        };
    }
    else if (axisTick.tick.rotate === 'normal') {
        tickStyle = {
            rotate: coord.startAngle + 90,
            textAlign: 'right',
        };
    }
    var offsetX = _.get(axisTick, 'tick.offsetX') ? { offsetX: axisTick.tick.offsetX } : null;
    var offsetY = _.get(axisTick, 'tick.offsetY') ? { offsetY: axisTick.tick.offsetY } : null;
    data.forEach(function (res, i) {
        chart.guide().text(__assign({ position: [i, 0], content: data[i][colsKey], style: __assign({ axisTick: axisTick }, tickStyle) }, offsetX, offsetY));
    });
}
function generateAxisNameOptions(config) {
    var axisPos = config.position;
    var namePos = config.name.position;
    var title = config.name.value ? config.name.value :
        (config.name.formatter ? config.name.formatter() : '');
    var labelViewPos = ['0%', '0%'];
    if (axisPos === 'bottom' && namePos === 'left') {
        labelViewPos = ['0%', '100%'];
    }
    else if (axisPos === 'bottom' && namePos === 'middle') {
        labelViewPos = ['50%', '100%'];
    }
    else if (axisPos === 'bottom' && namePos === 'right') {
        labelViewPos = ['100%', '100%'];
    }
    else if (axisPos === 'left' && namePos === 'top') {
        labelViewPos = ['0%', '0%'];
    }
    else if (axisPos === 'left' && namePos === 'middle') {
        labelViewPos = ['0%', '50%'];
    }
    else if (axisPos === 'left' && namePos === 'bottom') {
        labelViewPos = ['0%', '100%'];
    }
    else if (axisPos === 'right' && namePos === 'top') {
        labelViewPos = ['100%', '0%'];
    }
    else if (axisPos === 'right' && namePos === 'middle') {
        labelViewPos = ['100%', '50%'];
    }
    else if (axisPos === 'right' && namePos === 'bottom') {
        labelViewPos = ['100%', '100%'];
    }
    else if (axisPos === 'top' && namePos === 'left') {
        labelViewPos = ['0%', '0%'];
    }
    else if (axisPos === 'top' && namePos === 'middle') {
        labelViewPos = ['50%', '0%'];
    }
    else if (axisPos === 'top' && namePos === 'right') {
        labelViewPos = ['100%', '0%'];
    }
    return {
        top: true,
        position: labelViewPos,
        content: title,
        style: config.label,
    };
}
exports.process = function (chart, config) {
    var coord = config.coord, axis = config.axis, series = config.series, dataDef = config.dataDef;
    if (config.axis) {
        config.axis = validateAxis(config.dataDef, config.axis);
    }
    else {
        config.axis = false;
    }
    var isArr = Array.isArray(axis);
    if (!axis || (isArr && axis.length === 0)) {
        return chart.axis(false);
    }
    if (axis === true) {
        return chart.axis();
    }
    if (coord && coord.type === 'polar' && coord.direction === 'rotate') {
        setRotatePolarAxis(chart, config);
    }
    var newAxis = [];
    for (var _i = 0, axis_2 = axis; _i < axis_2.length; _i++) {
        var res = axis_2[_i];
        if (res.show === false) {
            return chart.axis(res.dataKey, false);
        }
        if (res.label) {
            res.label = setCustomFormatter.supportD3Formatter(res.label);
        }
        var options = _.omit(res, ['show', 'dataKey']);
        chart.axis(res.dataKey, options);
        if (res.name) {
            chart.guide().text(generateAxisNameOptions(res));
        }
    }
    return chart;
};
//# sourceMappingURL=setAxisConfig.js.map