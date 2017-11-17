"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../../packages/viser/src/index");
var data_1 = require("./data");
index_1.default({
    data: data_1.chartData,
    dataDef: [{
            dataKey: 'carat',
            mark: 'column',
        }, {
            dataKey: 'price',
            mark: 'row',
        }, {
            dataKey: 'cut',
            mark: 'color',
        }],
    scale: [{
            dataKey: 'carat',
            sync: true
        }, {
            dataKey: 'price',
            sync: true,
            tickCount: 3
        }, {
            dataKey: 'cut',
            sync: true,
        }],
    facet: {
        type: 'rect',
        fields: ['cut', 'clarity'],
        views: {
            axis: true,
            tooltip: true,
            series: {
                quickType: 'point',
                opacity: 0.3,
                size: 3,
            }
        }
    },
    chart: {
        container: 'mount',
        forceFit: true,
        height: 600,
    },
});
//# sourceMappingURL=json.js.map