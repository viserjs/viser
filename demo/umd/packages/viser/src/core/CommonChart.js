"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loadShapes_1 = require("../shapes/loadShapes");
var _ = require("lodash");
var DataSetUtils = require("../utils/DataSetUtils");
var setCoordConfig = require("../components/setCoordConfig");
var setAxisConfig = require("../components/setAxisConfig");
var setSeriesConfig = require("../components/setSeriesConfig");
var setDataDefConfig = require("../components/setDataDefConfig");
var setLengendConfig = require("../components/setLengendConfig");
var setGuideConfig = require("../components/setGuideConfig");
var setTooltipConfig = require("../components/setTooltipConfig");
var setScaleConfig = require("../components/setScaleConfig");
var G2 = require('@antv/g2');
var CommonChart = (function () {
    function CommonChart(config) {
        this.viewInstance = {};
        this.config = _.cloneDeep(config);
        this.config = this.checkChartConfig(this.config);
        var chart = this.chartInstance = new G2.Chart(this.config.chart);
    }
    CommonChart.prototype.checkChartConfig = function (config) {
        var chart = config.chart;
        if (!chart || !chart.height) {
            throw new Error('please set correct chart option');
        }
        return config;
    };
    ;
    CommonChart.prototype.destroy = function (chart) {
        chart && chart.destroy();
    };
    CommonChart.prototype.createView = function (chart, config) {
        var view = chart.view();
        if (!config.viewId) {
            throw new Error('you must set viewId');
        }
        this.viewInstance[config.viewId] = view;
        return view;
    };
    CommonChart.prototype.setEvents = function (chart, config) {
        var chartConfig = config.chart;
        var events = Object.keys(chartConfig).filter(function (entry) { return /^on/.test(entry); });
        var eventsRes = {};
        events.forEach(function (entry) {
            var eventName = entry.slice(2, entry.length);
            var eventLowerCase = eventName.toLowerCase();
            var content = chartConfig[entry];
            if (_.isPlainObject(content)) {
                for (var res in content) {
                    if (content.hasOwnProperty(res)) {
                        chart.on(res + ":" + eventLowerCase, content[res]);
                    }
                }
            }
            else {
                chart.on(eventLowerCase, content);
            }
        });
    };
    CommonChart.prototype.setDataSource = function (chart, data) {
        chart.source(data);
    };
    CommonChart.prototype.setScale = function (chart, config) {
        return setScaleConfig.process(chart, config);
    };
    CommonChart.prototype.setCoord = function (chart, coord) {
        return setCoordConfig.process(chart, coord);
    };
    CommonChart.prototype.setSeries = function (chart, config) {
        return setSeriesConfig.process(chart, config);
    };
    CommonChart.prototype.setAxis = function (chart, config) {
        return setAxisConfig.process(chart, config);
    };
    CommonChart.prototype.setLegend = function (chart, config) {
        return setLengendConfig.process(chart, config);
    };
    CommonChart.prototype.setTooltip = function (chart, config) {
        return setTooltipConfig.process(chart, config);
    };
    CommonChart.prototype.setGuide = function (chart, config) {
        return setGuideConfig.process(chart, config);
    };
    CommonChart.prototype.setContent = function (chart, config) {
        this.setScale(chart, config);
        this.setAxis(chart, config);
        this.setSeries(chart, config);
        this.setCoord(chart, config.coord);
        this.setTooltip(chart, config);
        this.setGuide(chart, config);
    };
    CommonChart.prototype.setView = function (item, chart, config) {
        item = setDataDefConfig.process(item);
        var view = this.createView(chart, item);
        var viewData = item.data;
        if (item.data) {
            viewData = DataSetUtils.preprocessing(item.data, item.dataPre);
        }
        else if (!item.data && !item.dataPre) {
            viewData = config.calData;
        }
        else if (!item.data && item.dataPre) {
            viewData = DataSetUtils.preprocessing(config.data, item.dataPre);
        }
        var finalData = viewData;
        if (item.dataView) {
            finalData = viewData[item.dataView];
        }
        this.setDataSource(view, finalData);
        this.setContent(view, item);
        return view;
    };
    CommonChart.prototype.setViews = function (chart, config) {
        var views = config.views;
        if (_.isEmpty(views)) {
            return;
        }
        views = Array.isArray(views) ? views : [views];
        for (var _i = 0, views_1 = views; _i < views_1.length; _i++) {
            var item = views_1[_i];
            this.setView(item, chart, config);
        }
    };
    CommonChart.prototype.setFacetViews = function (chart, facet, views, dataDef) {
        var viewData = facet.data;
        if (!views.dataDef) {
            views.dataDef = dataDef;
        }
        else {
            views = setDataDefConfig.process(views);
        }
        if (views.dataPre) {
            viewData = DataSetUtils.preprocessing(viewData, views.dataPre);
        }
        this.setDataSource(chart, viewData);
        this.setContent(chart, views);
    };
    CommonChart.prototype.setFacet = function (chart, config) {
        var _this = this;
        var facet = config.facet;
        var dataDef = config.dataDef;
        if (!facet) {
            return;
        }
        var options = _.omit(facet, ['type', 'views']);
        if (_.isEmpty(facet.views) && !_.isFunction(facet.views)) {
            return chart.facet(facet.type, options);
        }
        if (_.isFunction(facet.views)) {
            options.eachView = function (v, f) {
                var options = facet.views(v, f);
                _this.setFacetViews(v, f, options, dataDef);
            };
        }
        else {
            facet.views = Array.isArray(facet.views) ? facet.views : [facet.views];
            options.eachView = function (v, f) {
                _this.setFacetViews(v, f, facet.views[0], dataDef);
            };
        }
        return chart.facet(facet.type, options);
    };
    CommonChart.prototype.render = function () {
        var config = setDataDefConfig.process(this.config);
        var data = config.data, dataDef = config.dataDef, dataPre = config.dataPre;
        var chart = this.chartInstance;
        loadShapes_1.default(config);
        this.setEvents(chart, config);
        config.calData = DataSetUtils.preprocessing(data, dataPre);
        var finalData = config.calData;
        if (config.dataView) {
            finalData = finalData[config.dataView];
        }
        if (config.viewId) {
            var view = this.createView(chart, config);
            this.setDataSource(view, finalData);
            this.setContent(view, config);
        }
        else {
            this.setDataSource(chart, finalData);
            this.setContent(chart, config);
        }
        this.setLegend(chart, config);
        this.setViews(chart, config);
        this.setFacet(chart, config);
        this.oriConfig = config;
        chart.render();
    };
    CommonChart.prototype.repaintWidthHeight = function (config) {
        var oriConfig = this.oriConfig;
        var chart = this.chartInstance;
        var width = _.get(config, 'chart.width');
        if (width && !_.isEqual(_.get(oriConfig, 'chart.width'), width)) {
            chart.changeWidth(width);
        }
        var height = _.get(config, 'chart.height');
        if (height && !_.isEqual(_.get(oriConfig, 'chart.height'), height)) {
            chart.changeHeight(height);
        }
    };
    CommonChart.prototype.repaintData = function (chart, oriConfig, config) {
        if (!_.isEmpty(config.data) && !_.isEqual(oriConfig.data, config.data)) {
            config.calData = DataSetUtils.preprocessing(config.data, config.dataPre);
            var finalData = config.calData;
            if (config.dataView) {
                finalData = finalData[config.dataView];
            }
            chart.changeData(finalData);
        }
        else {
            config.calData = oriConfig.calData;
        }
    };
    CommonChart.prototype.repaintContent = function (chart, oriConfig, config) {
        config = setDataDefConfig.process(config);
        this.repaintData(chart, oriConfig, config);
        if (config.dataDef && !_.isEqual(oriConfig.dataDef, config.dataDef)) {
            this.setScale(chart, config);
        }
        if (config.coord && !_.isEqual(oriConfig.coord, config.coord)) {
            this.setCoord(chart, config);
        }
        if (config.axis && !_.isEqual(oriConfig.axis, config.axis)) {
            this.setAxis(chart, config);
        }
        if ((config.dataDef && !_.isEqual(oriConfig.dataDef, config.dataDef)) ||
            (config.series && !_.isEqual(oriConfig.series, config.series))) {
            this.setSeries(chart, config);
        }
        if (config.tooltip && !_.isEqual(oriConfig.tooltip, config.tooltip)) {
            this.setTooltip(chart, config);
        }
        if (config.guide && !_.isEqual(oriConfig.guide, config.guide)) {
            this.setGuide(chart, config);
        }
    };
    CommonChart.prototype.repaintViews = function (chart, oriConfig, config) {
        var viewsConfig = config.views;
        if (!_.isEqual(oriConfig.views, config.views)) {
            var _loop_1 = function (item) {
                var oriView = oriConfig.views.filter(function (res) { return (res.viewId === item.viewId); });
                if (oriView.length) {
                    var view = this_1.viewInstance[item.viewId];
                    this_1.repaintContent(view, oriView[0], item);
                    view.repaint();
                }
                else {
                    var view = this_1.setView(item, chart, config);
                    view.repaint();
                }
            };
            var this_1 = this;
            for (var _i = 0, viewsConfig_1 = viewsConfig; _i < viewsConfig_1.length; _i++) {
                var item = viewsConfig_1[_i];
                _loop_1(item);
            }
        }
    };
    CommonChart.prototype.renderDiffConfig = function (config) {
        var oriConfig = this.oriConfig;
        var viewsConfig = config.views;
        var chart = this.chartInstance;
        var hasChartChange = false;
        config = this.checkChartConfig(config);
        this.repaintWidthHeight(config);
        if (!config.viewId) {
            this.repaintContent(chart, oriConfig, config);
            hasChartChange = true;
        }
        else if (config.viewId && !oriConfig.viewId) {
            var view = this.setView(config, chart, config);
            view.repaint();
        }
        else if (config.viewId && oriConfig.viewId && _.isEqual(oriConfig.viewId, config.viewId)) {
            var view = this.viewInstance[config.viewId];
            this.repaintContent(view, oriConfig, config);
            view.repaint();
        }
        this.repaintViews(chart, oriConfig, config);
        if (config.legend && !_.isEqual(oriConfig.legend, config.legend)) {
            this.setLegend(chart, config);
            hasChartChange = true;
        }
        if (config.facet && !_.isEqual(oriConfig.facet, config.facet)) {
            this.setFacet(chart, config);
            hasChartChange = true;
        }
        if (hasChartChange) {
            chart.repaint();
        }
    };
    CommonChart.prototype.repaint = function (config) {
        if (_.isEmpty(config)) {
            return;
        }
        config = _.cloneDeep(config);
        this.renderDiffConfig(config);
        this.oriConfig = config;
    };
    CommonChart.prototype.getWidth = function () {
        return this.chartInstance.get('width');
    };
    CommonChart.prototype.getHeight = function () {
        return this.chartInstance.get('height');
    };
    return CommonChart;
}());
exports.default = CommonChart;
//# sourceMappingURL=CommonChart.js.map