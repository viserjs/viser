/**
 * @file Common Chart
 * @description instantiation of chart, include base functions
 */
import * as _ from 'lodash';
import * as setAxisConfig from '../components/setAxisConfig';
import * as setCoordConfig from '../components/setCoordConfig';
import * as setGuideConfig from '../components/setGuideConfig';
import * as setLegendConfig from '../components/setLegendConfig';
import * as setScaleConfig from '../components/setScaleConfig';
import * as setSeriesConfig from '../components/setSeriesConfig';
import * as setTooltipConfig from '../components/setTooltipConfig';
import IMainConfig from '../typed/IMain';
declare const require: any;
// tslint:disable-next-line:no-var-requires
const F2 = require('@antv/f2');

class CommonChart {
  public chartInstance: any;
  public config: any;

  constructor(config: IMainConfig) {
    this.config = _.cloneDeep(config);
    this.checkChartConfig(this.config);
    this.chartInstance = new F2.Chart(this.config.chart);
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

    this.setDataSource(chart, config.data);
    this.setCoord(chart, config);
    this.setTooltip(chart, config);
    this.setAxis(chart, config);
    this.setContent(chart, config);
    this.setLegend(chart, config);

    chart.render();
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

  private setGuide(chart: any, config: IMainConfig) {
    return setGuideConfig.process(chart, config);
  }

  private setLegend(chart: any, config: IMainConfig) {
    return setLegendConfig.process(chart, config);
  }

  private setContent(chart: any, config: IMainConfig) {
    this.setScale(chart, config);
    this.setSeries(chart, config);
    this.setGuide(chart, config);
  }

  private repaintWidthHeight(chart: any, config: IMainConfig) {
    const width = _.get(config, 'chart.width');
    const height = _.get(config, 'chart.height');

    chart.changeSize(width, height);
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
    this.setLegend(chart, config);

    this.repaintWidthHeight(chart, config);

    if (config.data) {
      chart.changeData(config.data);
    }
    chart.repaint();
  }
}

export default CommonChart;
