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
var PolarUtils_1 = require("../utils/PolarUtils");
function setPolarCoord(chart, coord) {
    var newCoord = {};
    if (coord.radius && (coord.radius < 0 || coord.radius > 1) ||
        coord.innerRadius && (coord.innerRadius < 0 || coord.innerRadius > 1)) {
        throw new Error('please set correct radius or innerRadius');
    }
    if (coord.radius) {
        newCoord = __assign({}, newCoord, { radius: coord.radius });
    }
    if (coord.innerRadius) {
        newCoord = __assign({}, newCoord, { innerRadius: coord.innerRadius });
    }
    if (coord.startAngle || coord.endAngle) {
        if (!coord.startAngle || (coord.startAngle && (coord.startAngle < -360 || coord.startAngle > 360)) ||
            !coord.endAngle || (coord.endAngle && (coord.endAngle < -360 || coord.endAngle > 360))) {
            throw new Error('please set correct starAngle and endAngle');
        }
        newCoord = __assign({}, newCoord, { startAngle: PolarUtils_1.degreeToRadian(coord.startAngle), endAngle: PolarUtils_1.degreeToRadian(coord.endAngle) });
    }
    var polarCoord = chart.coord(coord.type, __assign({}, newCoord));
    switch (coord.direction) {
        case 'rotate':
            polarCoord.transpose();
            break;
        case 'xReverse':
            polarCoord.reflect('x');
            break;
        case 'yReverse':
            polarCoord.reflect('y');
            break;
        case 'reverse':
            polarCoord.reflect();
            break;
        default:
            break;
    }
    return polarCoord;
}
function setRectCoord(chart, coord) {
    if (!coord.direction) {
        return chart.coord('rect');
    }
    switch (coord.direction) {
        case 'BL':
            chart.coord('rect');
            break;
        case 'BR':
            chart.coord('rect').scale(-1, 1);
            break;
        case 'LT':
            chart.coord('rect').transpose().scale(1, -1);
            break;
        case 'LB':
            chart.coord('rect').transpose();
            break;
        case 'RB':
            chart.coord('rect').transpose().reflect();
            break;
        case 'RT':
            chart.coord('rect').transpose().reflect().scale(-1, 1);
            break;
        case 'TL':
            chart.coord('rect').reflect();
            break;
        case 'TR':
            chart.coord('rect').reflect().scale(-1, 1);
            break;
        default:
            chart.coord('rect');
            break;
    }
    return chart;
}
exports.process = function (chart, coord) {
    if (!coord || !coord.type) {
        return chart.coord('rect');
    }
    var type = coord.type;
    if (type === 'polar' || type === 'theta') {
        return setPolarCoord(chart, coord);
    }
    if (type === 'rect') {
        return setRectCoord(chart, coord);
    }
    return chart.coord(type);
};
//# sourceMappingURL=setCoordConfig.js.map