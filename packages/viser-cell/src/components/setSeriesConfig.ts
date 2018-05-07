import * as _ from 'lodash';
import * as setQuickType from './setQuickType';
import { ISeries } from '../typed/ISeries';
import IMainConfig from '../typed/IMain';

function setSeriesGemo(chart: any, currSeries: ISeries) {
  const gemo = currSeries.gemo;

  switch (gemo) {
    case 'line':
      chart = chart.line();
      break;
    case 'area':
      chart = chart.area();
      break;
    case 'bar':
    case 'interval':
      chart = chart.interval();
      break;
    case 'point':
      chart = chart.point();
      break;
    case 'schema':
      chart = chart.schema();
      break;
    case 'polygon':
      chart = chart.polygon();
      break;
    case 'path':
      chart = chart.path();
      break;
    default:
      chart = chart.line();
  }

  return chart;
}

function setSeriesPosition(chart: any, currSeries: ISeries) {
  const position = currSeries.position;
  if (!_.isNil(position)) { return chart.position(position); }

  return chart;
}

function setSeriesAdjust(chart: any, currSeries: ISeries) {
  const adjust = currSeries.adjust;
  if (!_.isNil(adjust)) { return chart.adjust(adjust); }

  return chart;
}

function setSeriesShape(chart: any, currSeries: ISeries) {
  const shape = currSeries.shape;

  if (_.isString(shape)) {
    return chart.shape(shape);
  }

  if (_.isArray(shape) && shape.length >= 1) {
    if (shape[1]) {
      return chart.shape(shape[0], shape[1]);
    }

    return chart.shape(shape[0]);
  }

  return chart;
}

function setSeriesColor(chart: any, currSeries: ISeries) {
  const color = currSeries.color;

  if (_.isString(color)) {
    return chart.color(color);
  }

  if (_.isArray(color) && color.length >= 1) {
    if (color[1]) {
      return chart.color(color[0], color[1]);
    }

    return chart.color(color[0]);
  }

  return chart;
}

function setSeriesSize(chart: any, currSeries: ISeries) {
  const size = currSeries.size;

  if (_.isNumber(size) || _.isString(size)) {
    return chart.size(size);
  }

  if (_.isArray(size) && size.length >= 1) {
    if (size[1]) {
      return chart.size(size[0], size[1]);
    }

    return chart.size(size[0]);
  }

  return chart;
}

function setSeriesStyle(chart: any, currSeries: ISeries) {
  const style = currSeries.style;

  if (_.isArray(style) && style.length >= 1) {
    if (style[1]) {
      return chart.style(style[0], style[1]);
    }

    return chart.style(style[0]);
  }

  if (_.isPlainObject(style)) {
    return chart.style(style);
  }

  return chart;
}

function setSeriesAnimate(chart: any, currSeries: ISeries) {
  const animate = currSeries.animate;

  if (!_.isEmpty(animate)) {
    return chart.animate(animate);
  }

  return chart;
}

export const process = (chart: any, config: IMainConfig) => {
  const cSeries = _.cloneDeep(config.series);
  const isArr = _.isArray(cSeries);

  if (_.isNil(cSeries) || _.isEmpty(cSeries)) { return chart; }

  let arrSeries = isArr ? cSeries : [cSeries];
  arrSeries = setQuickType.process(arrSeries, config.coord);

  // add `zIndex` to comfirm overlay index
  arrSeries = _.sortBy(arrSeries, 'zIndex');

  let chartInstance;
  arrSeries.forEach((currSeries: any) => {
    chartInstance = setSeriesGemo(chart, currSeries);
    chartInstance = setSeriesPosition(chartInstance, currSeries);
    chartInstance = setSeriesAdjust(chartInstance, currSeries);
    chartInstance = setSeriesShape(chartInstance, currSeries);
    chartInstance = setSeriesColor(chartInstance, currSeries);
    chartInstance = setSeriesSize(chartInstance, currSeries);
    chartInstance = setSeriesStyle(chartInstance, currSeries);
    chartInstance = setSeriesAnimate(chartInstance, currSeries);
  });

  return chartInstance;
};
