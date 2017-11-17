"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var viser_1 = require("viser");
var regSeries = ['pie', 'sector', 'line', 'smoothline', 'dashline', 'area',
    'stackarea', 'smootharea', 'bar', 'stackbar', 'dodgebar', 'point', 'waterfall',
    'funnel', 'pyramid', 'radialbar', 'schema', 'box', 'candle', 'polygon', 'contour',
    'heatmap', 'edge'];
var camelCase = (function () {
    var DEFAULT_REGEX = /[-_]+(.)?/g;
    function toUpper(match, group1) {
        return group1 ? group1.toUpperCase() : '';
    }
    return function (str, delimiters) {
        return str.replace(delimiters ? new RegExp('[' + delimiters + ']+(.)?', 'g') : DEFAULT_REGEX, toUpper);
    };
})();
var baseChartComponent = {
    data: function () {
        return {
            isViser: true,
            jsonForD2: {}
        };
    },
    props: {
        width: null,
        height: null,
        data: null,
        dataDef: null,
        dataPre: null,
        crosshairs: null,
        dataKey: null,
        label: null,
        size: null,
        vStyle: null,
        show: null,
        color: null,
        tooltip: null,
        opacity: null,
        dataView: null,
        gemo: null,
        type: null,
        scale: null,
        forceFit: null,
        fields: null
    },
    methods: {
        findNearestRootComponent: function (componentInstance) {
            if (componentInstance.isViser && ['v-chart', 'v-views', 'v-facet', 'v-facet-view'].indexOf(componentInstance.$options._componentTag) > -1) {
                return componentInstance;
            }
            if (componentInstance.$parent) {
                return this.findNearestRootComponent(componentInstance.$parent);
            }
            return null;
        },
        freshChart: function (isUpdate) {
            if (this.$options._componentTag === 'v-chart') {
                var d2Json = __assign({}, cleanUndefined({
                    data: this.data,
                    dataDef: this.dataDef,
                    dataPre: this.dataPre,
                    scale: this.scale
                }), { chart: __assign({ container: this.$el }, cleanUndefined(normalizeProps(this._props, ['data', 'dataDef', 'dataPre', 'scale']))) }, this.jsonForD2);
                if (!isUpdate) {
                    this.chart = viser_1.default(d2Json);
                }
                else {
                    this.chart.repaint(d2Json);
                }
            }
            else if (this.$options._componentTag === 'v-views') {
                var nearestRootComponent = this.findNearestRootComponent(this.$parent);
                nearestRootComponent.jsonForD2.views = __assign({}, cleanUndefined(normalizeProps(this._props)), this.jsonForD2);
            }
            else if (this.$options._componentTag === 'v-facet-view') {
                var nearestRootComponent = this.findNearestRootComponent(this.$parent);
                nearestRootComponent.jsonForD2.views = __assign({}, cleanUndefined(normalizeProps(this._props)), this.jsonForD2);
            }
            else if (this.$options._componentTag === 'v-facet') {
                var nearestRootComponent = this.findNearestRootComponent(this.$parent);
                nearestRootComponent.jsonForD2.facet = __assign({}, cleanUndefined(normalizeProps(this._props)), this.jsonForD2);
            }
            else {
                var nearestRootComponent = this.findNearestRootComponent(this.$parent);
                if (!nearestRootComponent) {
                    throw Error(this.$options._componentTag + " must be wrapped into v-chart");
                }
                var rechartName = this.$options._componentTag.replace(/-/g, '').slice(1);
                var rechartNameCamelCase = camelCase(this.$options._componentTag.slice(2));
                if (isAllUndefined(this._props)) {
                    nearestRootComponent.jsonForD2[rechartName] = true;
                }
                else if (regSeries.indexOf(rechartName) > -1) {
                    safePush(nearestRootComponent.jsonForD2, 'series', __assign({ quickType: rechartNameCamelCase }, cleanUndefined(normalizeProps(this._props))));
                }
                else {
                    oneObjectMoreArray(nearestRootComponent.jsonForD2, rechartName, cleanUndefined(normalizeProps(this._props)));
                }
            }
        }
    },
    created: function () {
    },
    mounted: function () {
        this.freshChart(false);
    },
    updated: function () {
        this.freshChart(true);
    },
    render: function (h) {
        return h('div', null, this.$slots.default);
    }
};
exports.default = {
    install: function (Vue, options) {
        Vue.component('v-chart', baseChartComponent);
        Vue.component('v-smooth-line', baseChartComponent);
        Vue.component('v-point', baseChartComponent);
        Vue.component('v-tooltip', baseChartComponent);
        Vue.component('v-legend', baseChartComponent);
        Vue.component('v-axis', baseChartComponent);
        Vue.component('v-views', baseChartComponent);
        Vue.component('v-bar', baseChartComponent);
        Vue.component('v-schema', baseChartComponent);
        Vue.component('v-line', baseChartComponent);
        Vue.component('v-coord', baseChartComponent);
        Vue.component('v-pie', baseChartComponent);
        Vue.component('v-edge', baseChartComponent);
        Vue.component('v-series', baseChartComponent);
        Vue.component('v-stack-bar', baseChartComponent);
        Vue.component('v-facet', baseChartComponent);
        Vue.component('v-facet-view', baseChartComponent);
    }
};
function safePush(obj, key, value) {
    if (!obj[key]) {
        obj[key] = [];
    }
    cleanUndefined(value);
    obj[key].push(value);
}
function oneObjectMoreArray(obj, key, value) {
    if (!obj[key]) {
        obj[key] = value;
        return;
    }
    if (obj[key] && obj[key].constructor.name === 'Object') {
        obj[key] = [obj[key]];
    }
    obj[key].push(value);
}
function cleanUndefined(value) {
    for (var key in value) {
        if (value[key] === undefined) {
            delete value[key];
        }
    }
    return value;
}
function isAllUndefined(value) {
    return Object.keys(value).every(function (key) { return value[key] === undefined; });
}
function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
}
function normalizeProps(props, expect) {
    if (expect === void 0) { expect = []; }
    var newProps = __assign({}, props);
    if (newProps.vStyle) {
        newProps.style = newProps.vStyle;
        delete newProps.vStyle;
    }
    expect.forEach(function (each) {
        delete newProps[each];
    });
    return newProps;
}
//# sourceMappingURL=index.js.map