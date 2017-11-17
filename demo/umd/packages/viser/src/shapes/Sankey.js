"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShapeRegister_1 = require("../utils/ShapeRegister");
var DEFAULT_SANKEY_SHAPE = 'sankey';
function interpolationGenerator(a, b) {
    var ka = +a;
    var kb = b - ka;
    return function (t) { return ka + kb * t; };
}
function getCurvePath(from, to, curvature) {
    var interpolationFunc = interpolationGenerator(from.x, to.x);
    var fromCtrlX = interpolationFunc(curvature);
    var toCtrlX = interpolationFunc(1 - curvature);
    var points = [
        'C',
        fromCtrlX, from.y,
        toCtrlX, to.y,
        to.x, to.y,
    ];
    return points;
}
function getEdgePath(points, curvature) {
    var path = [
        ['M', points[0].x, points[0].y],
        ['L', points[1].x, points[1].y]
    ];
    var c1 = getCurvePath(points[1], points[3], curvature);
    path.push(c1);
    path.push(['L', points[3].x, points[3].y]);
    path.push(['L', points[2].x, points[2].y]);
    var c2 = getCurvePath(points[2], points[0], curvature);
    path.push(c2);
    path.push(['Z']);
    return path;
}
exports.registerShape = function (config) {
    ShapeRegister_1.default.regist('edge', DEFAULT_SANKEY_SHAPE, {
        drawShape: function (cfg, group) {
            var points = cfg.points, style = cfg.style;
            var curvature = style.curvature || 0.5;
            var path = this.parsePath(getEdgePath(points, curvature));
            var shape = group.addShape('path', {
                attrs: {
                    stroke: 'none',
                    strokeOpacity: 0,
                    fill: cfg.color,
                    opacity: cfg.opacity,
                    path: path,
                },
            });
            return shape;
        }
    });
};
//# sourceMappingURL=Sankey.js.map