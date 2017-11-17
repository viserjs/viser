"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RadialBar = require("./RadialBar");
var Waterfall = require("./Waterfall");
var Sankey = require("./Sankey");
var ErrorBar = require("./ErrorBar");
function default_1(config) {
    RadialBar.registerShape(config);
    Waterfall.registerShape(config);
    Sankey.registerShape(config);
    ErrorBar.registerShape(config);
}
exports.default = default_1;
//# sourceMappingURL=loadShapes.js.map