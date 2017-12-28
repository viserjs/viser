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

    chart.render();
  }

  public repaint(config: IMainConfig) {
    const newConfig = _.cloneDeep(config);
    this.checkChartConfig(newConfig);
    this.renderDiffConfig(newConfig);
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
    const width = _.get(config, 'chart.width');
    if (width) { chart.changeWidth(width); }

    const height = _.get(config, 'chart.height');
    if (height) { chart.changeHeight(height); }
  }

  private repaintData(chart: any, config: IMainConfig) {
    let calData;

    if (!_.isEmpty(config.data)) {
      const { data, dataPre, dataView } = config;

      const processedData = this.datasetInstance.getProcessedData(data, dataPre, 'main');

      if (!_.isEmpty(config.series) ||!_.isEmpty(config.facet)) {
        calData = this.datasetInstance.getDataView(processedData, dataView);
      }
    }

    return calData;
  }

  private renderDiffConfig(config: IMainConfig) {
    const chart = this.chartInstance;

    this.clear(chart);
    const calData = this.repaintData(chart, config);
    this.setScale(chart, config);
    this.setCoord(chart, config);
    this.setAxis(chart, config);
    this.setSeries(chart, config);
    this.setTooltip(chart, config);
    this.setGuide(chart, config);
    this.setViews(chart, config);
    this.setLegend(chart, config);
    this.setFacet(chart, config);

    this.repaintWidthHeight(chart, config);

    if (calData) {
      chart.changeData(calData);
    }
    chart.repaint();
  }
}

export default CommonChart;
