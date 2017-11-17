"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_esm_js_1 = require("vue/dist/vue.esm.js");
var src_1 = require("../../../packages/viser-vue/src");
var data_1 = require("./data");
vue_esm_js_1.default.use(src_1.default);
var container = document.createElement('div');
container.innerHTML = "\n  <div>\n    <v-chart :force-fit=\"true\" :height=\"400\" :data=\"data\" :data-pre=\"dataPre\" :data-def=\"dataDef\" :scale=\"scale\">\n      <v-tooltip />\n      <v-axis />\n      <v-stack-bar :v-style=\"{ stroke: '#fff', lineWidth: 1 }\" />\n    </v-chart>\n  </div>\n";
document.getElementById('mount').appendChild(container);
new vue_esm_js_1.default({
    el: container,
    data: {
        data: data_1.data,
        dataDef: data_1.dataDef,
        dataPre: data_1.dataPre,
        scale: data_1.scale,
    },
    methods: {}
});
//# sourceMappingURL=vue.js.map