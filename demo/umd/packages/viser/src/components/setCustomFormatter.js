"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = require("d3-format");
var _ = require("lodash");
exports.supportD3Formatter = function (obj) {
    var _loop_1 = function (item) {
        if (obj.hasOwnProperty(item)) {
            var formatter_1 = _.get(obj[item], 'formatter');
            if (formatter_1 && typeof formatter_1 === 'string') {
                obj[item].formatter = function (val) {
                    return d3.format(formatter_1)(val);
                };
            }
        }
    };
    for (var item in obj) {
        _loop_1(item);
    }
    return obj;
};
//# sourceMappingURL=setCustomFormatter.js.map