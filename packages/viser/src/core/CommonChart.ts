/**
 * @file Common Chart
 * @description instantiation of chart, include base functions
 */
import loadShapes from '../shapes/loadShapes';
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
const Brush = require('@antv/g2-brush');

function firstUpperCase(str: string) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

class CommonChart {
  chartInstance: any;
  viewInstance: any = {};
  config: any;

  constructor(config: IMainConfig) {
    this.config = _.cloneDeep(config);
    this.checkChartConfig(this.config);
    this.chartInstance = new G2.Chart(this.config.chart);
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

    this.setDataSource(chart, config.data);
    this.setCoord(chart, config);
    this.setTooltip(chart, config);
    this.setAxis(chart, config);
    this.setContent(chart, config);
    this.setLegend(chart, config);
    this.setViews(chart, config);
    this.setFacet(chart, config);

    chart.render();

    this.setDefaultTooltip(chart, config);
    this.setBrush(chart, config);
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
    const opts: any = {};
    if (config.start) {
      opts.start = config.start;
    }
    if (config.end) {
      opts.end = config.end;
    }
    const view = chart.view(opts);

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
    if (!_.isNil(data) && !_.isEmpty(data)) {
      chart.source(data);
    }
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

  private setDefaultTooltip(chart: any, config: IMainConfig) {
    return setTooltipConfig.setDefaultPoint(chart, config);
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

    let viewData;
    if (item.data) {
      viewData = item.data;
    } else {
      viewData = config.data;
    }

    this.setDataSource(view, viewData);

    if (!_.isNil(item.coord)) { this.setCoord(view, item); }
    if (!_.isNil(item.tooltip)) { this.setTooltip(view, item); }
    if (!_.isNil(item.axis)) { this.setAxis(view, item); }
    if (!_.isNil(item.guide)) { this.setGuide(view, item); }

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
    this.setDataSource(chart, views.data);
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

  private setBrush(chart: any, config: any) {
    if (_.isNil(config.brush) || _.isEmpty(config.brush)) { return; }

    const { brush } = config;

    const brushConfig = {
      ...config.brush,
      canvas: chart.get('canvas'),
      chart,
    };

    const regEvents = /on(BrushStart|BrushMove|BrushEnd|DragStart|DragMove|DragEnd)/;
    const events = Object.keys(brush).filter((entry) => regEvents.test(entry));

    events.forEach(entry => {
      const item = regEvents.exec(entry);
      const oriEventName = 'on' + firstUpperCase(item[0]);
      brushConfig[oriEventName] = (ev: any) => {
        brush[entry](ev, chart);
      };
    });

    new Brush(brushConfig);
  }

  private repaintWidthHeight(chart: any, config: IMainConfig) {
    const width = _.get(config, 'chart.width');
    if (width) { chart.changeWidth(width); }

    const height = _.get(config, 'chart.height');
    if (height) { chart.changeHeight(height); }
  }

  private renderDiffConfig(config: IMainConfig) {
    const chart = this.chartInstance;

    this.clear(chart);
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

    if (config.data) {
      chart.changeData(config.data);
    }
    chart.repaint();

    this.setBrush(chart, config);
  }
}

export default CommonChart;
