"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_esm_js_1 = require("vue/dist/vue.esm.js");
var src_1 = require("../../../packages/viser-vue/src");
var data_1 = require("./data");
vue_esm_js_1.default.use(src_1.default);
var container = document.createElement('div');
container.innerHTML = "\n  <div>\n    <v-chart :force-fit=\"true\" :height=\"600\" :data=\"chartData\" :data-def=\"dataDef\" :scale=\"scale\">\n      <v-facet :type=\"'rect'\" :fields=\"['cut', 'clarity']\">\n        <v-facet-view>\n          <v-axis />\n          <v-tooltip />\n          <v-point :opacity=\"0.3\" :size=\"3\" />\n        </v-facet-view>\n      </v-facet>\n    </v-chart>\n  </div>\n";
document.getElementById('mount').appendChild(container);
new vue_esm_js_1.default({
    el: container,
    data: {
        chartData: data_1.chartData,
        dataDef: data_1.dataDef,
        scale: data_1.scale,
    },
    methods: {}
});
//# sourceMappingURL=vue.js.map