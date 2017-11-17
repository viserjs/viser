"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
function setGuideLine(chart, item) {
    if (item.quickType === 'parallel') {
        var data = item.data;
        chart.guide().line({
            start: ['min', data],
            end: ['max', data],
        });
    }
    else if (item.quickType === 'normal') {
        var data = item.data;
        chart.guide().line({
            start: [data, 'min'],
            end: [data, 'max'],
        });
    }
    else {
        chart.guide().line(item);
    }
}
function setGuideArc(chart, item) {
    if (item.quickType === 'parallel') {
        var data = item.data;
        chart.guide().arc({
            start: ['min', data],
            end: ['max', data],
        });
        chart.guide().arc({
            start: ['max', data],
            end: ['min', data],
        });
    }
    else if (item.quickType === 'normal') {
        var data = item.data;
        chart.guide().line({
            start: [data, 'min'],
            end: [data, 'max'],
        });
    }
    else {
        chart.guide().arc(item);
    }
}
exports.process = function (chart, config) {
    var guide = config.guide;
    var isArr = Array.isArray(guide);
    if (_.isEmpty(guide)) {
        return chart;
    }
    guide = Array.isArray(guide) ? guide : [guide];
    guide.forEach(function (res) {
        if (res.type === 'line') {
            setGuideLine(chart, res);
        }
        else if (res.type === 'region') {
            chart.guide().region(res);
        }
        else if (res.type === 'arc') {
            setGuideArc(chart, res);
        }
        else if (res.type === 'text') {
            chart.guide().text(res);
        }
        else if (res.type === 'tag') {
            chart.guide().tag(res);
        }
        else if (res.type === 'html') {
            chart.guide().html(res);
        }
    });
    return chart;
};
//# sourceMappingURL=setGuideConfig.js.map