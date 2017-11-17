"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var PropTypes = require("prop-types");
var viser_1 = require("viser");
var isReact16 = ReactDOM.createPortal !== undefined;
var createPortal = isReact16
    ? ReactDOM.createPortal
    : ReactDOM.unstable_renderSubtreeIntoContainer;
function firstLowerCase(str) {
    return str.replace(/^\S/, function (s) {
        return s.toLowerCase();
    });
}
function omit(obj, attr) {
    var newObj = {};
    for (var item in obj) {
        if (obj.hasOwnProperty(item)) {
            var arrAttr = Array.isArray(attr) ? attr : [attr];
            for (var i = 0; i < arrAttr.length; i++) {
                if (arrAttr[i] !== item) {
                    newObj[item] = obj[item];
                }
            }
        }
    }
    return newObj;
}
function isOwnEmpty(obj) {
    for (var name_1 in obj) {
        if (obj.hasOwnProperty(name_1)) {
            return false;
        }
    }
    return true;
}
var Chart = (function (_super) {
    __extends(Chart, _super);
    function Chart(props) {
        var _this = _super.call(this, props) || this;
        _this.config = {};
        _this.views = {};
        _this.facetviews = {};
        _this.centralizedUpdates = function (unit) {
            var config = _this.config;
            var views = _this.views;
            var props = unit.props;
            var displayName = unit.displayName;
            var hasInViews = unit.context.hasInViews;
            if (displayName === 'Facet') {
                var options = omit(props, 'children');
                config.facet = options;
            }
            else if (displayName === 'FacetView') {
                var viewId = unit.state.viewId;
                if (!_this.facetviews[viewId]) {
                    _this.facetviews[viewId] = { viewId: viewId };
                }
                _this.combineViewConfig(props, _this.facetviews[viewId]);
            }
            else if (displayName === 'View') {
                var viewId = unit.state.viewId;
                if (!_this.views[viewId]) {
                    _this.views[viewId] = { viewId: viewId };
                }
                _this.combineViewConfig(props, _this.views[viewId]);
            }
            else {
                if (!hasInViews) {
                    _this.combineContentConfig(displayName, props, config);
                }
                else {
                    var viewType = unit.context.viewType;
                    var viewId = unit.context.viewId;
                    if (viewType === 'view') {
                        if (!_this.views[viewId]) {
                            _this.views[viewId] = { viewId: viewId };
                        }
                        _this.combineContentConfig(displayName, props, _this.views[viewId]);
                    }
                    else if (viewType === 'facet') {
                        if (!_this.facetviews[viewId]) {
                            _this.facetviews[viewId] = { viewId: viewId };
                        }
                        _this.combineContentConfig(displayName, props, _this.facetviews[viewId]);
                    }
                }
            }
        };
        _this.portalRef = function (container) {
            if (!_this.container) {
                _this.container = container;
            }
        };
        return _this;
    }
    Chart.prototype.getChildContext = function () {
        return {
            centralizedUpdates: this.centralizedUpdates,
            hasInViews: false,
            viewType: 'view',
        };
    };
    Chart.prototype.combineChartConfig = function (props, config) {
        var chartOmit = ['data', 'dataDef', 'dataView', 'dataPre', 'children', 'container', 'id', 'scale'];
        config.chart = omit(props, chartOmit);
    };
    Chart.prototype.combineViewConfig = function (props, config) {
        if (props.data) {
            config.data = props.data;
        }
        if (props.dataDef) {
            config.dataDef = props.dataDef;
        }
        if (props.dataPre) {
            config.dataPre = props.dataPre;
        }
        if (props.dataView) {
            config.dataView = props.dataView;
        }
        if (props.scale) {
            config.scale = props.scale;
        }
    };
    Chart.prototype.combineContentConfig = function (displayName, props, config) {
        var nameLowerCase = displayName.toLowerCase();
        var regSeries = ['pie', 'sector', 'line', 'smoothline', 'dashline', 'area',
            'stackarea', 'smootharea', 'bar', 'stackbar', 'dodgebar', 'point', 'waterfall',
            'funnel', 'pyramid', 'radialbar', 'schema', 'box', 'candle', 'polygon', 'contour',
            'heatmap', 'edge'];
        if (isOwnEmpty(props)) {
            config[nameLowerCase] = true;
        }
        else if (regSeries.indexOf(nameLowerCase) >= 0) {
            if (!config.series) {
                config.series = [];
            }
            config.series.push(__assign({ quickType: firstLowerCase(displayName) }, props));
        }
        else if (nameLowerCase === 'axis') {
            if (!config.axis) {
                config.axis = [];
            }
            config.axis.push(props);
        }
        else if (nameLowerCase === 'series') {
            if (!config.series) {
                config.series = [];
            }
            config.series.push(props);
        }
        else if (nameLowerCase === 'guide') {
            if (!config.guide) {
                config.guide = [];
            }
            config.guide.push(props);
        }
        else {
            config[nameLowerCase] = props;
        }
        return config;
    };
    Chart.prototype.changeViewConfig = function () {
        var views = this.views;
        var facetviews = this.facetviews;
        var config = this.config;
        if (!isOwnEmpty(views)) {
            config.views = [];
            for (var item in views) {
                if (views.hasOwnProperty(item)) {
                    config.views.push(views[item]);
                }
            }
        }
        if (!isOwnEmpty(facetviews)) {
            config.facet.views = [];
            for (var item in facetviews) {
                if (facetviews.hasOwnProperty(item)) {
                    config.facet.views.push(facetviews[item]);
                }
            }
        }
    };
    Chart.prototype.createChartInstance = function (config) {
        var elm = this.elm;
        if (elm) {
            ReactDOM.unmountComponentAtNode(elm);
        }
        if (this.chart) {
            this.chart.destroy();
        }
        this.combineChartConfig(this.props, this.config);
        this.combineViewConfig(this.props, this.config);
        var root = document.createElement('div');
        this.container.appendChild(root);
        config.chart.container = root;
        this.elm = document.createElement('div');
        if (!isReact16) {
            createPortal(this, React.createElement("div", null, this.props.children), this.elm);
        }
        else {
            createPortal(this.props.children, this.elm);
        }
        this.changeViewConfig();
        this.chart = viser_1.default(config);
    };
    Chart.prototype.repaintChartInstance = function (config) {
        this.combineChartConfig(this.props, this.config);
        this.combineViewConfig(this.props, this.config);
        if (!isReact16) {
            createPortal(this, React.createElement("div", null, this.props.children), this.elm);
        }
        else {
            createPortal(this.props.children, this.elm);
        }
        this.changeViewConfig();
        this.chart.repaint(this.config);
    };
    Chart.prototype.clearConfigData = function () {
        this.config = {};
        this.views = {};
    };
    Chart.prototype.componentDidMount = function () {
        this.createChartInstance(this.config);
    };
    Chart.prototype.componentDidUpdate = function () {
        this.clearConfigData();
        this.repaintChartInstance(this.config);
    };
    Chart.prototype.componentWillUnmount = function () {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
        this.elm = this.container = null;
    };
    Chart.prototype.render = function () {
        return React.createElement("div", { ref: this.portalRef }, this.props.children);
    };
    Chart.childContextTypes = {
        centralizedUpdates: PropTypes.func,
        hasInViews: PropTypes.bool,
        viewType: PropTypes.string,
    };
    return Chart;
}(React.Component));
exports.default = Chart;
//# sourceMappingURL=Chart.js.map