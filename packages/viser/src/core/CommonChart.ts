/**
 * @file Common Chart
 * @description instantiation of chart, include base functions
 */
import loadShapes from '../shapes/loadShapes';
import IMainConfig from '../typed/IMain';
import * as _ from 'lodash';
import * as EventUtils from '../utils/EventUtils';
import * as DataSetUtils from '../utils/DataSetUtils';
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
  viewInstance: any = {};
  config: any;
  oriConfig: any;
  mainDataSet: any = {};

  constructor(config: IMainConfig) {
    this.config = _.cloneDeep(config);
    this.checkChartConfig(this.config);
    const chart: any = this.chartInstance = new G2.Chart(this.config.chart);
  }

  public checkChartConfig(config: IMainConfig) {
    const chart = config.chart;
    if (_.isNil(chart.height)) {
      throw new Error('please set correct chart option');
    }
  };

  public destroy(chart: any) {
    chart && chart.destroy();
  }

  public clear(chart: any) {
    chart && chart.clear();
  }

  public createView(chart: any, config: IMainConfig) {
    const view = chart.view();

    if (!config.viewId) {
      throw new Error('you must set viewId');
    }

    this.viewInstance[config.viewId] = view;
    return view;
  }

  public setEvents(chart: any, config: IMainConfig) {
    EventUtils.setEvent(chart, null, config.chart);
  }

  public setDataSource(chart: any, data: any) {
    chart.source(data);
  }

  public setScale(chart: any, config: IMainConfig) {
    return setScaleConfig.process(chart, config);
  }

  public setCoord(chart: any, config: IMainConfig) {
    return setCoordConfig.process(chart, config.coord);
  }

  public setSeries(chart: any, config: IMainConfig) {
    return setSeriesConfig.process(chart, config);
  }

  public setAxis(chart: any, config: IMainConfig) {
    return setAxisConfig.process(chart, config);
  }

  public setTooltip(chart: any, config: IMainConfig) {
    return setTooltipConfig.process(chart, config);
  }

  public setGuide(chart: any, config: IMainConfig) {
    return setGuideConfig.process(chart, config);
  }

  public setLegend(chart: any, config: IMainConfig) {
    return setLengendConfig.process(chart, config);
  }

  public setContent(chart: any, config: IMainConfig) {
    this.setScale(chart, config);
    this.setAxis(chart, config);
    this.setSeries(chart, config);
    this.setCoord(chart, config);
    this.setTooltip(chart, config);
    this.setGuide(chart, config);
  }

  public setFacetContent(chart: any, config: IMainConfig) {
    this.setScale(chart, config);
    this.setSeries(chart, config);
    this.setGuide(chart, config);
  }

  public setView(item: any, chart: any, config: IMainConfig) {
    const view = this.createView(chart, item);

    let viewData = item.data;

    if (item.data) {
      viewData = DataSetUtils.getProcessedData(item.data, item.dataPre);
    } else if (!item.data && item.dataPre) {
      viewData = DataSetUtils.getProcessedData(config.data, item.dataPre);
    } else if (!item.data && !item.dataPre) {
      viewData = this.mainDataSet;
    }

    const calData = DataSetUtils.getDataContent(viewData, item.dataView);
    this.setDataSource(view, calData);
    this.setContent(view, item);

    return view;
  }

  public setViews(chart: any, config: IMainConfig) {
    let views = config.views;

    if (_.isEmpty(views)) { return; }

    views = Array.isArray(views) ? views : [views];

    for (let item of views) {
      this.setView(item, chart, config);
    }
  }

  public setFacetViews(chart: any, facet: any, views: IMainConfig) {
    const viewData = DataSetUtils.getProcessedData(facet.data, views.dataPre);
    const calData = DataSetUtils.getDataContent(viewData, views.dataView);

    this.setDataSource(chart, calData);
    this.setFacetContent(chart, views);
  }

  public setFacet(chart: any, config: IMainConfig) {
    let facet: any = config.facet;

    if (!facet) { return; }

    const options = _.omit(facet, ['type', 'views']);

    if (_.isEmpty(facet.views) && !_.isFunction(facet.views)) {
      return chart.facet(facet.type, options);
    }

    if (_.isFunction(facet.views)) {
      options.eachView = (v: any, f: any) => {
        const options = facet.views(v, f);
        this.setFacetViews(v, f, options);
      }
    } else {
      facet.views = Array.isArray(facet.views) ? facet.views : [facet.views];

      options.eachView = (v: any, f: any) => {
        this.setFacetViews(v, f, facet.views[0]);
      }
    }

    return chart.facet(facet.type, options);
  }

  public render() {
    let config = this.config;

    const { data, dataPre, dataView } = config;
    const chart = this.chartInstance;

    loadShapes();
    this.setEvents(chart, config);

    const chartData = this.mainDataSet = DataSetUtils.getProcessedData(data, dataPre);

    if (config.series || config.facet) {
      const calData = DataSetUtils.getDataContent(chartData, dataView);
      this.setDataSource(chart, calData);
    }
    this.setContent(chart, config);
    this.setLegend(chart, config);
    this.setViews(chart, config);
    this.setFacet(chart, config);

    this.oriConfig = config;
    chart.render();
  }

  public repaintWidthHeight(config: IMainConfig) {
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

  public repaintData(chart: any, oriConfig: IMainConfig, config: IMainConfig) {
    let hasDataChange = false;

    if (!_.isEmpty(config.data) && !_.isEqual(oriConfig.data, config.data)) {
      const viewData = DataSetUtils.getProcessedData(config.data, config.dataPre);
      const calData = DataSetUtils.getDataContent(viewData, config.dataView);

      hasDataChange = true;
      chart.changeData(calData);
    }

    return hasDataChange;
  }

  public repaintViewData(chart: any, oriConfig: IMainConfig, config: IMainConfig) {
    let viewData;

    if ((_.isEmpty(config.data) && !_.isEmpty(oriConfig.data)) ||
        (!_.isEmpty(config.data) && !_.isEqual(oriConfig.data, config.data))) {
      viewData = DataSetUtils.getProcessedData(config.data, config.dataPre);
      const calData = DataSetUtils.getDataContent(viewData, config.dataView);
      chart.changeData(calData);
    }
  }

  public repaintContent(chart: any, oriConfig: IMainConfig, config: IMainConfig) {
    let hasChartChange = false;

    if (config.scale && !_.isEqual(oriConfig.scale, config.scale)) {
      this.setScale(chart, config);
      hasChartChange = true;
    }

    if (config.coord && !_.isEqual(oriConfig.coord, config.coord)) {
      this.setCoord(chart, config);
      hasChartChange = true;
    }

    if (config.axis && !_.isEqual(oriConfig.axis, config.axis)) {
      this.setAxis(chart, config);
      hasChartChange = true;
    }

    if (config.series && !_.isEqual(oriConfig.series, config.series)) {
      this.setSeries(chart, config);
      hasChartChange = true;
    }

    if (config.tooltip && !_.isEqual(oriConfig.tooltip, config.tooltip)) {
      this.setTooltip(chart, config);
      hasChartChange = true;
    }

    if (config.guide && !_.isEqual(oriConfig.guide, config.guide)) {
      this.setGuide(chart, config);
      hasChartChange = true;
    }

    return hasChartChange;
  }

  public repaintViews(chart: any, oriConfig: IMainConfig, config: IMainConfig) {
    const viewsConfig: any = config.views;
    const oViewsConfig: any = oriConfig.views

    if (!_.isEqual(oriConfig.views, config.views)) {
      for (let item of viewsConfig) {
        const oriView = oViewsConfig.filter((res: any) => (res.viewId === item.viewId));
        let view;

        if (oriView.length) {
          view = this.viewInstance[item.viewId];
          this.repaintViewData(view, oriView[0], item);
          this.repaintContent(view, oriView[0], item);
        } else {
          view = this.setView(item, chart, config);
        }

        view.repaint();
      }
    }
  }

  public renderDiffConfig(config: IMainConfig) {
    const oriConfig = this.oriConfig;
    const viewsConfig = config.views;
    const chart = this.chartInstance;

    this.repaintWidthHeight(config);

    const hasDataChange = this.repaintData(chart, oriConfig, config);
    if (hasDataChange) { this.mainDataSet = config.data; }

    const hasContentChange = this.repaintContent(chart, oriConfig, config);
    this.repaintViews(chart, oriConfig, config);

    let hasChartPartChange = false;
    if (config.legend && !_.isEqual(oriConfig.legend, config.legend)) {
      this.setLegend(chart, config);
      hasChartPartChange = true;
    }

    if (config.facet && !_.isEqual(oriConfig.facet, config.facet)) {
      this.setFacet(chart, config);
      hasChartPartChange = true;
    }

    if (hasContentChange || hasChartPartChange) {
      chart.repaint();
    }
  }

  public repaint(config: IMainConfig) {
    const newConfig = _.cloneDeep(config);
    this.checkChartConfig(newConfig);
    this.renderDiffConfig(newConfig);
    this.oriConfig = newConfig;
  }

  public getWidth() {
    return this.chartInstance.get('width');
  }

  public getHeight() {
    return this.chartInstance.get('height');
  }
}

export default CommonChart;
