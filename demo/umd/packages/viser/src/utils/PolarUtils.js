"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.degreeToRadian = function (angle) {
    return angle * Math.PI / 180;
};
exports.radianToDegree = function (angleInRadian) {
    return angleInRadian * 180 / Math.PI;
};
exports.polarToCartesian = function (cx, cy, radius, angle) {
    var radian = exports.degreeToRadian(angle);
    return {
        x: cx + Math.cos(radian) * radius,
        y: cy + Math.sin(radian) * radius,
    };
};
//# sourceMappingURL=PolarUtils.js.map