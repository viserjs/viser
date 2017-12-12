/**
 * @file Common Chart
 * @description instantiation of chart, include base functions
 */
import loadShapes from '../shapes/loadShapes';
import CommonDataSet from './CommonDataSet';
import IMainConfig from '../typed/IMain';
import * as _ from 'lodash';
import * as EventUtils from '../utils/EventUtils';
import * as setCoordConfig from '../components/setCoordConfig';
import * as setAxisConfig from '../components/setAxisConfig';
import * as setSeriesConfig from '../components/setSeriesConfig';
import * as setCustomFormatter from '../components/setCustomFormatter';
import * as setLengendConfig from '../components/setLengendConfig';
import * as setGuideConfig from '../components/setGuideConfig';
import * as setTooltipConfig from '../components/setTooltipConfig';
import * as setScaleConfig from '../components/setScaleConfig';

const G2 = require('@antv/g2');

class CommonChart {
  chartInstance: any;
  datasetInstance: any;
  viewInstance: any = {};
  config: any;
  oriConfig: any;

  constructor(config: IMainConfig) {
    this.config = _.cloneDeep(config);
    this.checkChartConfig(this.config);
    const chart: any = this.chartInstance = new G2.Chart(this.config.chart);
    const dataSet: any = this.datasetInstance = new CommonDataSet();
  }

  public getWidth() {
    return this.chartInstance.get('width');
  }

  public getHeight() {
    return this.chartInstance.get('height');
  }

  public render() {
    let config = this.config;
    const chart = this.chartInstance;

    loadShapes();
    this.setEvents(chart, config);

    if (!_.isEmpty(config.data)) {
      const { data, dataPre, dataView } = config;

      const processedData = this.datasetInstance.getProcessedData(data, dataPre, 'main');

      if (!_.isEmpty(config.series) ||!_.isEmpty(config.facet)) {
        const calData = this.datasetInstance.getDataView(processedData, dataView);
        this.setDataSource(chart, calData);
      }
    }

    this.setCoord(chart, config);
    this.setTooltip(chart, config);
    this.setAxis(chart, config);
    this.setContent(chart, config);
    this.setLegend(chart, config);
    this.setViews(chart, config);
    this.setFacet(chart, config);

    this.oriConfig = config;
    chart.render();
  }

  public repaint(config: IMainConfig) {
    const newConfig = _.cloneDeep(config);
    this.checkChartConfig(newConfig);
    this.renderDiffConfig(newConfig);
    this.oriConfig = newConfig;
  }

  public destroy(chart: any) {
    chart && chart.destroy();
  }

  public clear(chart: any) {
    chart && chart.clear();
  }

  private checkChartConfig(config: IMainConfig) {
    const chart = config.chart;
    if (_.isNil(chart.height)) {
      throw new Error('please set correct chart option');
    }
  }

  private createView(chart: any, config: IMainConfig) {
    const view = chart.view();

    if (!config.viewId) {
      throw new Error('you must set viewId');
    }

    this.viewInstance[config.viewId] = view;
    return view;
  }

  private setEvents(chart: any, config: IMainConfig) {
    EventUtils.setEvent(chart, null, config.chart);
  }

  private setDataSource(chart: any, data: any) {
    chart.source(data);
  }

  private setScale(chart: any, config: IMainConfig) {
    return setScaleConfig.process(chart, config);
  }

  private setCoord(chart: any, config: IMainConfig) {
    return setCoordConfig.process(chart, config);
  }

  private setSeries(chart: any, config: IMainConfig) {
    return setSeriesConfig.process(chart, config);
  }

  private setAxis(chart: any, config: IMainConfig) {
    return setAxisConfig.process(chart, config);
  }

  private setTooltip(chart: any, config: IMainConfig) {
    return setTooltipConfig.process(chart, config);
  }

  private setGuide(chart: any, config: IMainConfig) {
    return setGuideConfig.process(chart, config);
  }

  private setLegend(chart: any, config: IMainConfig) {
    return setLengendConfig.process(chart, config);
  }

  private setContent(chart: any, config: IMainConfig) {
    this.setScale(chart, config);
    this.setSeries(chart, config);
    this.setGuide(chart, config);
  }

  private setView(item: any, chart: any, config: IMainConfig) {
    const view = this.createView(chart, item);

    let viewData = item.data;
    let processedData;

    if (item.data) {
      processedData = this.datasetInstance.getProcessedData(item.data, item.dataPre, item.viewId);
    } else if (!item.data && item.dataPre) {
      processedData = this.datasetInstance.getProcessedData(config.data, item.dataPre, item.viewId);
    } else if (!item.data && !item.dataPre) {
      processedData = this.datasetInstance.copyData('main', item.viewId);
    }

    const calData = this.datasetInstance.getDataView(processedData, item.dataView);
    this.setDataSource(view, calData);

    if (!_.isNil(item.coord)) { this.setCoord(view, item); }
    if (!_.isNil(item.tooltip)) { this.setTooltip(view, item); }
    if (!_.isNil(item.axis)) { this.setAxis(view, item); }

    this.setContent(view, item);

    return view;
  }

  private setViews(chart: any, config: IMainConfig) {
    let cViews = _.cloneDeep(config.views);
    const isArr = Array.isArray(cViews);

    if (_.isNil(cViews) || _.isEmpty(cViews)) { return; }

    const arrViews: any = isArr ? cViews : [cViews];

    for (let item of arrViews) {
      this.setView(item, chart, config);
    }
  }

  private setFacetViews(chart: any, facet: any, views: IMainConfig) {
    const processedData = this.datasetInstance.getProcessedData(facet.data, views.dataPre);
    const calData = this.datasetInstance.getDataView(processedData, views.dataView);

    this.setDataSource(chart, calData);
    this.setContent(chart, views);
  }

  private setFacet(chart: any, config: IMainConfig) {
    let cFacet = _.cloneDeep(config.facet);

    if (_.isNil(cFacet) || _.isEmpty(cFacet)) { return; }

    const options = _.omit(cFacet, ['type', 'views']);

    if (_.isEmpty(cFacet.views) && !_.isFunction(cFacet.views)) {
      return chart.facet(cFacet.type, options);
    }

    if (_.isFunction(cFacet.views)) {
      options.eachView = (v: any, f: any) => {
        const options = cFacet.views(v, f);
        this.setFacetViews(v, f, options);
      }
    } else {
      cFacet.views = Array.isArray(cFacet.views) ? cFacet.views : [cFacet.views];
      options.eachView = (v: any, f: any) => {
        this.setFacetViews(v, f, cFacet.views[0]);
      }
    }

    return chart.facet(cFacet.type, options);
  }

  private repaintWidthHeight(chart: any, config: IMainConfig) {
    const oriConfig = this.oriConfig;

    const width = _.get(config, 'chart.width');
    const oWidth = _.get(oriConfig, 'chart.width');
    if ((!_.isNil(width) || !_.isNil(oWidth)) && !_.isEqual(oWidth, width)) {
      chart.changeWidth(width);
    }

    const height = _.get(config, 'chart.height');
    const oHeight = _.get(oriConfig, 'chart.height');
    if ((!_.isNil(height) || !_.isNil(oHeight)) && !_.isEqual(oHeight, height)) {
      chart.changeHeight(height);
    }
  }

  private repaintData(chart: any, oriConfig: IMainConfig, config: IMainConfig) {
    if ((!_.isNil(oriConfig.data) || !_.isNil(config.data)) &&
        !_.isEqual(oriConfig.data, config.data)) {
      const viewId = config.viewId || 'main';
      const processedData = this.datasetInstance.getProcessedData(config.data, config.dataPre, viewId);
      const calData = this.datasetInstance.getDataView(processedData, config.dataView);

      chart.changeData(calData);
    }
  }

  private repaintContent(chart: any, oriConfig: IMainConfig, config: IMainConfig) {
    let hasChartChange = false;

    if ((!_.isNil(oriConfig.scale) || !_.isNil(config.scale)) &&
        !_.isEqual(oriConfig.scale, config.scale)) {
      this.setScale(chart, config);
      hasChartChange = true;
    }

    if ((!_.isNil(oriConfig.coord) || !_.isNil(config.coord)) &&
        !_.isEqual(oriConfig.coord, config.coord)) {
      this.setCoord(chart, config);
      hasChartChange = true;
    }

    if ((!_.isNil(oriConfig.axis) || !_.isNil(config.axis)) &&
        !_.isEqual(oriConfig.axis, config.axis)) {
      this.setAxis(chart, config);
      hasChartChange = true;
    }

    if ((!_.isNil(oriConfig.series) || !_.isNil(config.series)) &&
        !_.isEqual(oriConfig.series, config.series)) {
      this.setSeries(chart, config);
      hasChartChange = true;
    }

    if ((!_.isNil(oriConfig.tooltip) || !_.isNil(config.tooltip)) &&
        !_.isEqual(oriConfig.tooltip, config.tooltip)) {
      this.setTooltip(chart, config);
      hasChartChange = true;
    }

    if ((!_.isNil(oriConfig.guide) || !_.isNil(config.guide)) &&
        !_.isEqual(oriConfig.guide, config.guide)) {
      this.setGuide(chart, config);
      hasChartChange = true;
    }

    return hasChartChange;
  }

  private repaintViews(chart: any, oriConfig: IMainConfig, config: IMainConfig) {
    const oViewsConfig: any = oriConfig.views;
    const cViews = _.cloneDeep(config.views);
    const isArr = Array.isArray(cViews);

    if ((!_.isNil(oriConfig.views) || !_.isNil(config.views)) &&
        !_.isEqual(oriConfig.views, config.views)) {
      const arrViews: any = isArr ? cViews : [cViews];

      for (let item of arrViews) {
        const oriView = oViewsConfig.filter((res: any) => (res.viewId === item.viewId));
        let view;

        if (oriView.length) {
          view = this.viewInstance[item.viewId];
          this.repaintData(view, oriView[0], item);
          this.repaintContent(view, oriView[0], item);
        } else {
          view = this.setView(item, chart, config);
        }

        view.repaint();
      }
    }
  }

  private renderDiffConfig(config: IMainConfig) {
    const oriConfig = this.oriConfig;
    const chart = this.chartInstance;

    this.repaintWidthHeight(chart, config);
    this.repaintData(chart, oriConfig, config);

    const hasContentChange = this.repaintContent(chart, oriConfig, config);
    this.repaintViews(chart, oriConfig, config);

    let hasChartPartChange = false;
    if ((!_.isNil(oriConfig.legend) || !_.isNil(config.legend)) &&
        !_.isEqual(oriConfig.legend, config.legend)) {
      this.setLegend(chart, config);
      hasChartPartChange = true;
    }

    if ((!_.isNil(oriConfig.facet) || !_.isNil(config.facet)) &&
        !_.isEqual(oriConfig.facet, config.facet)) {
      this.setFacet(chart, config);
      hasChartPartChange = true;
    }

    if (hasContentChange || hasChartPartChange) {
      chart.repaint();
    }
  }
}

export default CommonChart;
