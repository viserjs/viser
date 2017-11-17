"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var setCustomFormatter = require("./setCustomFormatter");
exports.process = function (chart, config) {
    var scale = config.scale;
    var options = {};
    if (_.isEmpty(scale)) {
        return;
    }
    scale = Array.isArray(scale) ? scale : [scale];
    for (var _i = 0, scale_1 = scale; _i < scale_1.length; _i++) {
        var res = scale_1[_i];
        if (res.dataKey) {
            var currOption = _.omit(res, 'dataKey');
            options[res.dataKey] = currOption;
        }
    }
    options = setCustomFormatter.supportD3Formatter(options);
    return chart.scale(options);
};
//# sourceMappingURL=setScaleConfig.js.map