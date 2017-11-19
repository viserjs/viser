/**
 * @file Common Chart
 * @description instantiation of chart, include base functions
 */
import loadShapes from '../shapes/loadShapes';
import * as _ from 'lodash';
import * as DataSetUtils from '../utils/DataSetUtils';
import * as setCoordConfig from '../components/setCoordConfig';
import * as setAxisConfig from '../components/setAxisConfig';
import * as setSeriesConfig from '../components/setSeriesConfig';
import * as setDataMappingConfig from '../components/setDataMappingConfig';
import * as setCustomFormatter from '../components/setCustomFormatter';
import * as setLengendConfig from '../components/setLengendConfig';
import * as setGuideConfig from '../components/setGuideConfig';
import * as setTooltipConfig from '../components/setTooltipConfig';
import * as setScaleConfig from '../components/setScaleConfig';

const G2 = require('@antv/g2');

class CommonChart {
  chartInstance: any;
  viewInstance: any = {};
  config: any;
  oriConfig: any;

  constructor(config: any) {
    this.config = _.cloneDeep(config);
    this.config = this.checkChartConfig(this.config);
    const chart = this.chartInstance = new G2.Chart(this.config.chart);
  }

  public checkChartConfig(config) {
    const chart = config.chart;
    if (!chart || !chart.height) {
      throw new Error('please set correct chart option');
    }

    return config;
  };

  public destroy(chart) {
    chart && chart.destroy();
  }

  public clear(chart) {
    chart && chart.clear();
  }

  public createView(chart, config) {
    const view = chart.view();

    if (!config.viewId) {
      throw new Error('you must set viewId');
    }

    this.viewInstance[config.viewId] = view;
    return view;
  }

  // plotenter, plotmove, plotleave, plotclick, plotdblclick
  // onClick: { 'guide-line': func, 'guide-arc': func ]
  public setEvents(chart, config) {
    const chartConfig = config.chart;

    const events = Object.keys(chartConfig).filter((entry) => /^on/.test(entry));
    const eventsRes = {};

    events.forEach(entry => {
      const eventName = entry.slice(2, entry.length);
      const eventLowerCase = eventName.toLowerCase();
      const content = chartConfig[entry];

      if (_.isPlainObject(content)) {
        for (const res in content) {
          if (content.hasOwnProperty(res)) {
            chart.on(`${res}:${eventLowerCase}`, content[res]);
          }
        }
      } else {
        chart.on(eventLowerCase, content);
      }
    });
  }

  public setDataSource(chart, data) {
    chart.source(data);
  }

  public setScale(chart, config) {
    return setScaleConfig.process(chart, config);
  }

  public setCoord(chart, coord) {
    return setCoordConfig.process(chart, coord);
  }

  public setSeries(chart, config) {
    return setSeriesConfig.process(chart, config);
  }

  public setAxis(chart, config) {
    return setAxisConfig.process(chart, config);
  }

  public setLegend(chart, config) {
    return setLengendConfig.process(chart, config);
  }

  public setTooltip(chart, config) {
    return setTooltipConfig.process(chart, config);
  }

  public setGuide(chart, config) {
    return setGuideConfig.process(chart, config);
  }

  public setContent(chart, config) {
    this.setScale(chart, config);
    this.setAxis(chart, config);
    this.setSeries(chart, config);
    this.setCoord(chart, config.coord);
    this.setTooltip(chart, config);
    this.setGuide(chart, config);
  }

  public setView(item, chart, config) {
    item = setDataMappingConfig.process(item);

    const view = this.createView(chart, item);

    let viewData = item.data;
    if (item.data) {
      viewData = DataSetUtils.preprocessing(item.data, item.dataPre);
    } else if (!item.data && !item.dataPre) {
      viewData = config.calData;
    } else if (!item.data && item.dataPre) {
      viewData = DataSetUtils.preprocessing(config.data, item.dataPre);
    }

    let finalData = viewData;
    if (item.dataView) { finalData = viewData[item.dataView]; }

    this.setDataSource(view, finalData);
    this.setContent(view, item);

    return view;
  }

  public setViews(chart, config) {
    let views = config.views;

    if (_.isEmpty(views)) { return; }

    views = Array.isArray(views) ? views : [views];

    for (let item of views) {
      this.setView(item, chart, config);
    }
  }

  public setFacetViews(chart, facet, views, dataMapping) {
    let viewData = facet.data;

    if (!views.dataMapping) {
      views.dataMapping = dataMapping;
    } else {
      views = setDataMappingConfig.process(views);
    }

    if (views.dataPre) {
      viewData = DataSetUtils.preprocessing(viewData, views.dataPre);
    }

    this.setDataSource(chart, viewData);
    this.setContent(chart, views);
  }

  public setFacet(chart, config) {
    let facet = config.facet;
    const dataMapping = config.dataMapping;

    if (!facet) { return; }

    const options = _.omit(facet, ['type', 'views']);

    if (_.isEmpty(facet.views) && !_.isFunction(facet.views)) {
      return chart.facet(facet.type, options);
    }

    if (_.isFunction(facet.views)) {
      options.eachView = (v, f) => {
        const options = facet.views(v, f);
        this.setFacetViews(v, f, options, dataMapping);
      }
    } else {
      facet.views = Array.isArray(facet.views) ? facet.views : [facet.views];

      options.eachView = (v, f) => {
        this.setFacetViews(v, f, facet.views[0], dataMapping);
      }
    }

    return chart.facet(facet.type, options);
  }

  public render() {
    let config = setDataMappingConfig.process(this.config);

    const { data, dataMapping, dataPre } = config;
    const chart = this.chartInstance;

    loadShapes(config);
    this.setEvents(chart, config);

    config.calData = DataSetUtils.preprocessing(data, dataPre)

    let finalData = config.calData;
    if (config.dataView) {
      finalData = finalData[config.dataView];
    }

    if (config.viewId) {
      const view = this.createView(chart, config);
      this.setDataSource(view, finalData);
      this.setContent(view, config);
    } else {
      this.setDataSource(chart, finalData);
      this.setContent(chart, config);
    }
    this.setLegend(chart, config);
    this.setViews(chart, config);
    this.setFacet(chart, config);

    this.oriConfig = config;
    chart.render();
  }

  public repaintWidthHeight(config) {
    const oriConfig = this.oriConfig;
    const chart = this.chartInstance;

    const width = _.get(config, 'chart.width');
    if (width && !_.isEqual(_.get(oriConfig, 'chart.width'), width)) {
      chart.changeWidth(width);
    }

    const height = _.get(config, 'chart.height');
    if (height && !_.isEqual(_.get(oriConfig, 'chart.height'), height)) {
      chart.changeHeight(height);
    }
  }

  public repaintData(chart, oriConfig, config) {
    if (!_.isEmpty(config.data) && !_.isEqual(oriConfig.data, config.data)) {
      config.calData = DataSetUtils.preprocessing(config.data, config.dataPre)

      let finalData = config.calData;
      if (config.dataView) {
        finalData = finalData[config.dataView];
      }

      chart.changeData(finalData);
    } else {
      config.calData = oriConfig.calData;
    }
  }

  public repaintContent(chart, oriConfig, config) {
    config = setDataMappingConfig.process(config);

    this.repaintData(chart, oriConfig, config);

    if (config.dataMapping && !_.isEqual(oriConfig.dataMapping, config.dataMapping)) {
      this.setScale(chart, config);
    }

    if (config.coord && !_.isEqual(oriConfig.coord, config.coord)) {
      this.setCoord(chart, config);
    }

    if (config.axis && !_.isEqual(oriConfig.axis, config.axis)) {
      this.setAxis(chart, config);
    }

    if ((config.dataMapping && !_.isEqual(oriConfig.DataMapping, config.DataMapping)) ||
        (config.series && !_.isEqual(oriConfig.series, config.series))) {
      this.setSeries(chart, config);
    }

    if (config.tooltip && !_.isEqual(oriConfig.tooltip, config.tooltip)) {
      this.setTooltip(chart, config);
    }

    if (config.guide && !_.isEqual(oriConfig.guide, config.guide)) {
      this.setGuide(chart, config);
    }
  }

  public repaintViews(chart, oriConfig, config) {
    const viewsConfig = config.views;

    if (!_.isEqual(oriConfig.views, config.views)) {
      for (let item of viewsConfig) {
        const oriView = oriConfig.views.filter(res => (res.viewId === item.viewId));

        if (oriView.length) {
          const view = this.viewInstance[item.viewId];
          this.repaintContent(view, oriView[0], item);
          view.repaint();
        } else {
          const view = this.setView(item, chart, config);
          view.repaint();
        }
      }
    }
  }

  public renderDiffConfig(config) {
    const oriConfig = this.oriConfig;
    const viewsConfig = config.views;
    const chart = this.chartInstance;
    let hasChartChange = false;

    config = this.checkChartConfig(config);

    this.repaintWidthHeight(config);

    if (!config.viewId) {
      this.repaintContent(chart, oriConfig, config);
      hasChartChange = true;
    } else if (config.viewId && !oriConfig.viewId) {
      const view = this.setView(config, chart, config);
      view.repaint();
    } else if (config.viewId && oriConfig.viewId && _.isEqual(oriConfig.viewId, config.viewId)) {
      const view = this.viewInstance[config.viewId];
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
  }

  public repaint(config) {
    if (_.isEmpty(config)) { return; }

    config = _.cloneDeep(config);
    this.renderDiffConfig(config);
    this.oriConfig = config;
  }

  public getWidth() {
    return this.chartInstance.get('width');
  }

  public getHeight() {
    return this.chartInstance.get('height');
  }
}

export default CommonChart;
