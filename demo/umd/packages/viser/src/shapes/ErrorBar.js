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
var ShapeRegister_1 = require("../utils/ShapeRegister");
var DEFAULT_ERRORBAR_SHAPE = 'errorbar';
function renderBarPath(points) {
    return [
        ['M', points[1].x, points[1].y],
        ['L', points[2].x, points[2].y],
        ['Z'],
        ['M', (points[1].x + points[2].x) / 2, (points[1].y + points[2].y) / 2],
        ['L', (points[0].x + points[3].x) / 2, (points[0].y + points[3].y) / 2],
        ['Z'],
        ['M', points[0].x, points[0].y],
        ['L', points[3].x, points[3].y],
        ['Z'],
    ];
}
exports.registerShape = function (config) {
    var barWidth = 1;
    var hasPoint = false;
    ShapeRegister_1.default.regist('schema', DEFAULT_ERRORBAR_SHAPE, {
        getPoints: function (_a) {
            var x = _a.x, y = _a.y, y0 = _a.y0, size = _a.size;
            return [
                { x: x - (size / 2) * barWidth, y: y[0] },
                { x: x - (size / 2) * barWidth, y: y[2] },
                { x: x + (size / 2) * barWidth, y: y[2] },
                { x: x + (size / 2) * barWidth, y: y[0] },
                { x: x, y: y[1] },
                { x: x - (size / 2) * barWidth, y: y[1] },
            ];
        },
        drawShape: function (cfg, group) {
            var newGroup = group;
            var points = cfg.points;
            newGroup.addShape('path', {
                attrs: __assign({ stroke: cfg.color, strokeOpacity: cfg.opacity || 1, lineWidth: cfg.style.lineWidth || 1, fill: cfg.color, opacity: cfg.opacity || 1, path: this.parsePath(renderBarPath(points)) }, cfg.style)
            });
            if (hasPoint) {
                newGroup.addShape('circle', {
                    attrs: __assign({ stroke: cfg.color, strokeOpacity: cfg.opacity || 1, lineWidth: cfg.style.lineWidth || 1, fill: cfg.color, opacity: cfg.opacity || 1, x: this.parsePoint(points[4]).x, y: this.parsePoint(points[4]).y, r: cfg.style.lineWidth + 0.5 || 1.5 }, cfg.style)
                });
            }
            return newGroup;
        }
    });
};
//# sourceMappingURL=ErrorBar.js.map