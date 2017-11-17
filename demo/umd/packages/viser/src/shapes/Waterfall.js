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
var G2 = require('@antv/g2');
var DEFAULT_WATERFALL_SHAPE = 'waterfall';
function getRectPath(points) {
    var path = [];
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        if (point) {
            var action = i === 0 ? 'M' : 'L';
            path.push([action, point.x, point.y]);
        }
    }
    var first = points[0];
    path.push(['L', first.x, first.y]);
    path.push(['z']);
    return path;
}
function getFillAttrs(cfg) {
    var defaultAttrs = G2.Global.shape.interval;
    var attrs = G2.Util.mix({}, defaultAttrs, {
        fill: cfg.color,
        stroke: cfg.color,
        fillOpacity: cfg.opacity,
    }, cfg.style);
    return attrs;
}
exports.registerShape = function (config) {
    ShapeRegister_1.default.regist('interval', DEFAULT_WATERFALL_SHAPE, {
        drawShape: function (cfg, group) {
            var attrs = getFillAttrs(cfg);
            var rectPath = getRectPath(cfg.points);
            rectPath = this.parsePath(rectPath);
            var interval = group.addShape('path', {
                attrs: G2.Util.mix(attrs, {
                    path: rectPath,
                }),
            });
            if (cfg.nextPoints) {
                var linkPath = [
                    ['M', cfg.points[2].x, cfg.points[2].y],
                    ['L', cfg.nextPoints[0].x, cfg.nextPoints[0].y],
                ];
                if (cfg.nextPoints[0].y === 0) {
                    linkPath[1] = ['L', cfg.nextPoints[1].x, cfg.nextPoints[1].y];
                }
                linkPath = this.parsePath(linkPath);
                group.addShape('path', {
                    attrs: __assign({ path: linkPath, stroke: 'rgba(0, 0, 0, 0.45)', lineDash: [4, 2] }, cfg.style)
                });
            }
            return interval;
        }
    });
};
//# sourceMappingURL=Waterfall.js.map