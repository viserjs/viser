"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var G2 = require('@antv/g2');
exports.default = {
    regist: function (geoName, shapeName, _a) {
        var getPoints = _a.getPoints, drawShape = _a.drawShape;
        G2.Shape.registerShape(geoName, shapeName, { getPoints: getPoints, drawShape: drawShape });
    },
};
//# sourceMappingURL=ShapeRegister.js.map