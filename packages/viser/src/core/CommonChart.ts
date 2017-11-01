/**
 * @file Common Chart
 * @description instantiation of chart, include base functions
 */
import loadShapes from '../shapes/loadShapes';
import * as G2 from '@antv/g2';
import * as _ from 'lodash';
import * as DataSetUtils from '../utils/DataSetUtils';
import * as setCoordConfig from '../components/setCoordConfig';
import * as setAxisConfig from '../components/setAxisConfig';
import * as setSeriesConfig from '../components/setSeriesConfig';
import * as validateConfig from '../components/validateConfig';
import * as setCustomFormatter from '../components/setCustomFormatter';
import * as setQuickType from '../components/setQuickType';
import * as setLengendConfig from '../components/setLengendConfig';
import * as setGuideConfig from '../components/setGuideConfig';
import * as setTooltipConfig from '../components/setTooltipConfig';

class CommonChart {
  dataSets: any;
  chartInstance: any;
  viewInstance: any = {};
  config: any;
  oriConfig: any;

  constructor(config: any) {
    this.config = _.cloneDeep(config);
    this.config = validateConfig.checkChartConfig(this.config);
    const chart = this.chartInstance = new G2.Chart(this.config.chart);
  }

  public setView(chart, config) {
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

  public setDataSource(chart, config) {
    const { data, dataView } = config;

    if (dataView && this.dataSets[dataView]) {
      chart.source(this.dataSets[dataView]);
    } else {
      chart.source(this.dataSets);
    }
  }

  public destroy(chart) {
    chart && chart.destroy();
  }

  public setScale(chart, config) {
    const { dataDef } = config;

    if (!dataDef.scale) { return; }

    let option = dataDef.scale;
    option = setCustomFormatter.supportD3Formatter(option);

    return chart.scale(option);
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

  public renderSameContent(chart, config) {
    this.setScale(chart, config);
    this.setDataSource(chart, config);
    this.setCoord(chart, config.coord);
    this.setAxis(chart, config);
    this.setSeries(chart, config);
    this.setTooltip(chart, config);
    this.setGuide(chart, config);
  }

  public createViews(chart, views) {
    for (let item of views) {
      item = validateConfig.checkViewConfig(item);
      item = setQuickType.process(item);

      const view = this.setView(chart, item);

      if (DataSetUtils.preprocessing(item)) {
        this.dataSets = DataSetUtils.preprocessing(item);
      }

      this.renderSameContent(view, item);
    }
  }

  public renderContent(config) {
    config = validateConfig.checkViewConfig(config);
    config = setQuickType.process(config);
    const { data, dataDef, coord, scale } = config;
    const viewsConfig = config.views;
    const chart = this.chartInstance;

    this.dataSets = DataSetUtils.preprocessing(config);
    loadShapes(config);
    this.setEvents(chart, config);

    if (viewsConfig && viewsConfig.length) {
      const view = this.setView(chart, config);
      this.renderSameContent(view, config);
      this.createViews(chart, viewsConfig);
    } else {
      this.renderSameContent(chart, config);
    }

    this.setLegend(chart, config);

    this.oriConfig = config;
  }

  public render() {
    this.renderContent(this.config);
    this.chartInstance.render();
  }

  public renderDiffContent(chart, oriConfig, config) {
    if (!_.isEmpty(config.data) && !_.isEqual(oriConfig.data, config.data)) {
      this.dataSets = DataSetUtils.preprocessing(config);
      const { dataView } = config;

      if (dataView && this.dataSets[dataView]) {
        chart.changeData(this.dataSets[dataView]);
      } else {
        chart.changeData(this.dataSets);
      }
    }

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
  }

  public renderDiffWidthHeight(config) {
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

  public renderDiffConfig(config) {
    const oriConfig = this.oriConfig;
    const viewsConfig = config.views;
    const chart = this.chartInstance;
    let hasChartChange = false;

    config = validateConfig.checkViewConfig(config);
    config = setQuickType.process(config);

    if (viewsConfig && viewsConfig.length) {
      if (config.viewId && _.isEqual(oriConfig.viewId, config.viewId)) {
        const view = this.viewInstance[config.viewId];
        this.renderDiffContent(view, oriConfig, config);
        view.repaint();
      } else {
        const view = this.setView(chart, config);
        this.renderSameContent(view, config);
        view.repaint();
      }

      if (!_.isEqual(oriConfig.views, config.views)) {
        for (let item of viewsConfig) {
          item = validateConfig.checkViewConfig(item);
          item = setQuickType.process(item);

          const oriView = oriConfig.views.filter(res => (res.viewId === item.viewId));

          if (oriView.length) {
            const view = this.viewInstance[item.viewId];
            this.renderDiffContent(view, oriView[0], item);
            view.repaint();
          } else {
            const view = this.setView(chart, config);
            this.renderSameContent(view, item);
            view.repaint();
          }
        }
      }
    } else {
      this.renderDiffContent(chart, oriConfig, config);
      hasChartChange = true;
    }

    if (config.legend && !_.isEqual(oriConfig.legend, config.legend)) {
      this.setLegend(chart, config);
      hasChartChange = true;
    }

    if (hasChartChange) {
      chart.repaint();
    }
  }

  public repaint(config) {
    config = _.cloneDeep(config);
    config = validateConfig.checkChartConfig(config);

    this.renderDiffWidthHeight(config);
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
