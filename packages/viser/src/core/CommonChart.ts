/**
 * @file Common Chart
 * @description instantiation of chart, include base functions
 */
import * as _ from 'lodash';
import * as setAxisConfig from '../components/setAxisConfig';
import * as setCoordConfig from '../components/setCoordConfig';
import * as setFilterConfig from '../components/setFilterConfig';
import * as setGuideConfig from '../components/setGuideConfig';
import * as setLegendConfig from '../components/setLegendConfig';
import * as setScaleConfig from '../components/setScaleConfig';
import * as setSeriesConfig from '../components/setSeriesConfig';
import * as setTooltipConfig from '../components/setTooltipConfig';
import loadShapes from '../shapes/loadShapes';
import IMainConfig from '../typed/IMain';
import * as EventUtils from '../utils/EventUtils';
declare const require: any;
// tslint:disable-next-line:no-var-requires
const G2 = require('@antv/g2');
// tslint:disable-next-line:no-var-requires
const Brush = require('@antv/g2-brush');

// Disable G2 Track
// G2.track(false);

function firstUpperCase(str: string) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

class CommonChart {
  private chartInstance: any;
  private viewInstance: any = {};
  private config: any;

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
    const config = this.config;
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
    if (chart) {
      chart.destroy();
    }
  }

  public clear(chart: any) {
    if (chart) {
      chart.clear();
    }
  }

  private checkChartConfig(config: IMainConfig) {
    const chart = config.chart;
    if (!chart || !chart.height) {
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
    EventUtils.setEvent(chart, '', config.chart);
  }

  private setDataSource(chart: any, data: any) {
    if (!_.isNil(data) && !_.isEmpty(data)) {
      chart.source(data);
    }
  }

  private setFilter(chart: any, config: IMainConfig) {
    return setFilterConfig.process(chart, config);
  }

  private setScale(chart: any, config: IMainConfig) {
    return setScaleConfig.process(chart, config);
  }

  private setCoord(chart: any, config: IMainConfig) {
    return setCoordConfig.process(chart, config);
  }

  private setSeries(chart: any, config: IMainConfig, isUpdate: boolean = false) {
    return setSeriesConfig.process(chart, config, isUpdate);
  }

  private setAxis(chart: any, config: IMainConfig, isUpdate: boolean = false) {
    return setAxisConfig.process(chart, config, isUpdate);
  }

  private setTooltip(chart: any, config: IMainConfig, isUpdate: boolean = false) {
    return setTooltipConfig.process(chart, config, isUpdate);
  }

  private setDefaultTooltip(chart: any, config: IMainConfig) {
    return setTooltipConfig.setDefaultPoint(chart, config);
  }

  private setGuide(chart: any, config: IMainConfig, isUpdate: boolean = false) {
    return setGuideConfig.process(chart, config, isUpdate);
  }

  private setLegend(chart: any, config: IMainConfig, isUpdate: boolean = false) {
    return setLegendConfig.process(chart, config, isUpdate);
  }

  private setContent(chart: any, config: IMainConfig, isUpdate: boolean = false) {
    this.setScale(chart, config);
    this.setFilter(chart, config);
    this.setSeries(chart, config, isUpdate);
    this.setGuide(chart, config, isUpdate);
  }

  private setView(item: any, chart: any, config: IMainConfig, isUpdate: boolean = false) {
    const view = this.createView(chart, item);
    const viewData = item.data ? item.data : config.data;

    this.setDataSource(view, viewData);

    if (!_.isNil(item.coord)) { this.setCoord(view, item); }
    if (!_.isNil(item.tooltip)) { this.setTooltip(view, item, isUpdate); }
    if (!_.isNil(item.axis)) { this.setAxis(view, item, isUpdate); }
    if (!_.isNil(item.guide)) { this.setGuide(view, item, isUpdate); }

    this.setContent(view, item, isUpdate);

    return view;
  }

  private setViews(chart: any, config: IMainConfig, isUpdate: boolean = false) {
    const cViews = _.cloneDeep(config.views);
    const isArr = Array.isArray(cViews);

    if (_.isNil(cViews) || _.isEmpty(cViews)) { return; }

    const arrViews: any = isArr ? cViews : [cViews];

    for (const item of arrViews) {
      this.setView(item, chart, config, isUpdate);
    }
  }

  private setFacetViews(chart: any, facet: any, views: IMainConfig, isUpdate: boolean = false) {
    this.setDataSource(chart, views.data);

    if (!_.isNil(views.coord)) { this.setCoord(chart, views); }
    if (!_.isNil(views.tooltip)) { this.setTooltip(chart, views, isUpdate); }
    if (!_.isNil(views.axis)) { this.setAxis(chart, views, isUpdate); }
    if (!_.isNil(views.guide)) { this.setGuide(chart, views, isUpdate); }

    this.setContent(chart, views);
  }

  private setFacet(chart: any, config: IMainConfig, isUpdate: boolean = false) {
    const cFacet = _.cloneDeep(config.facet);

    if (_.isNil(cFacet) || _.isEmpty(cFacet)) { return; }

    const options = _.omit(cFacet, ['type', 'views']);

    if (_.isEmpty(cFacet.views) && !_.isFunction(cFacet.views)) {
      return chart.facet(cFacet.type, options);
    }

    if (_.isFunction(cFacet.views)) {
      options.eachView = (v: any, f: any) => {
        this.setFacetViews(v, f, cFacet.views(v, f), isUpdate);
      };
    } else {
      cFacet.views = Array.isArray(cFacet.views) ? cFacet.views : [cFacet.views];
      options.eachView = (v: any, f: any) => {
        this.setFacetViews(v, f, cFacet.views[0], isUpdate);
      };
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

    events.forEach((entry: any) => {
      const item = regEvents.exec(entry);

      if (item && item.length) {
        const oriEventName = 'on' + firstUpperCase(item[0]);
        brushConfig[oriEventName] = (ev: any) => {
          brush[entry](ev, chart);
        };
      }
    });

    // tslint:disable-next-line:no-unused-expression
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
    // this.setEvents(chart, config);
    this.clear(chart);
    this.setScale(chart, config);
    this.setCoord(chart, config);
    this.setAxis(chart, config, true);
    this.setSeries(chart, config, true);
    this.setTooltip(chart, config, true);
    this.setGuide(chart, config, true);
    this.setViews(chart, config, true);
    this.setLegend(chart, config, true);
    this.setFacet(chart, config, true);

    this.repaintWidthHeight(chart, config);

    if (config.data) {
      chart.changeData(config.data);
    }
    chart.repaint();

    this.setBrush(chart, config);
  }
}

export default CommonChart;
