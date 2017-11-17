"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
function setHighlight(item) {
    item.onHover = function (ev) {
        var shapes = ev.shapes;
        var geom = ev.geom;
        geom.highlightShapes(shapes);
    };
    return item;
}
exports.process = function (chart, config) {
    var legend = config.legend;
    var isArr = Array.isArray(legend);
    if (!legend || (isArr && legend.length === 0)) {
        return chart.legend(false);
    }
    var arrLegend = isArr ? legend : [legend];
    for (var _i = 0, arrLegend_1 = arrLegend; _i < arrLegend_1.length; _i++) {
        var res = arrLegend_1[_i];
        if (res.highlight) {
            res = setHighlight(res);
        }
        if (res.dataKey) {
            if (res.show === false) {
                return chart.legend(res.dataKey, false);
            }
            var option = _.omit(res, ['dataKey', 'show']);
            return chart.legend(res.dataKey, option);
        }
        else {
            return chart.legend(res);
        }
    }
};
//# sourceMappingURL=setLengendConfig.js.map