"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShapeRegister_1 = require("../utils/ShapeRegister");
var DEFAULT_RADIALBAR_SHAPE = 'radialBar';
function getPath(points) {
    var path = [['M', points[0].x, points[0].y]];
    for (var i = 1; i < points.length; i++) {
        if (points[i]) {
            path.push(['L', points[i].x, points[i].y]);
        }
    }
    path.push(['z']);
    return path;
}
exports.registerShape = function (config) {
    ShapeRegister_1.default.regist('interval', DEFAULT_RADIALBAR_SHAPE, {
        getPoints: function (_a) {
            var x = _a.x, y = _a.y, y0 = _a.y0, size = _a.size;
            return [
                { x: x - size / 2, y: y0 },
                { x: x - size / 2, y: y },
                { x: x + size / 2, y: y },
                { x: x + size / 2, y: y0 },
                { x: x - size / 2, y: 1 },
                { x: x + size / 2, y: 1 },
            ];
        },
        drawShape: function (cfg, group) {
            var points = cfg.points;
            var rectPoints = points.slice(0, 4);
            var path = this.parsePath(getPath(rectPoints));
            var shape = group.addShape('path', {
                attrs: {
                    fill: cfg.color,
                    path: path,
                },
            });
            if (cfg.style.background) {
                var backPoints = [points[1], points[4], points[5], points[2]];
                var backPath = this.parsePath(getPath(backPoints));
                group.addShape('path', {
                    attrs: {
                        path: backPath,
                        fill: cfg.style.background,
                    },
                });
            }
            return shape;
        },
    });
};
//# sourceMappingURL=RadialBar.js.map