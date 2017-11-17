"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.process = function (chart, config) {
    var tooltip = config.tooltip;
    if (!tooltip || tooltip === false) {
        return chart.tooltip(false);
    }
    if (tooltip === true) {
        return chart.tooltip(true);
    }
    return chart.tooltip(tooltip);
};
//# sourceMappingURL=setTooltipConfig.js.map