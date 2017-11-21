import * as _ from 'lodash';
import * as setQuickType from './setQuickType';
import { ISeries } from '../typed/Series';
import IMainProps from '../typed/Main';

function renderGemo(chart: any, gemo: string) {
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
    case 'contour':
      chart = chart.contour();
      break;
    case 'heatmap':
      chart = chart.heatmap();
      break;
    case 'edge':
      chart = chart.edge();
      break;
    default:
      chart = chart.line();
  }

  return chart;
}

function skipPosition(dataMapping: any, currSeries: ISeries) {
  if (!currSeries.position && dataMapping.column && dataMapping.row) {
    if (currSeries.quickType === 'pie') {
      currSeries.position = `${dataMapping.row[0]}`;
    } else {
      currSeries.position = `${dataMapping.column[0]}*${dataMapping.row[0]}`;
    }
  }

  return currSeries;
}

function setSeriesPosition(chart: any, currSeries: ISeries) {
  return chart.position(currSeries.position);
}

function setSeriesAdjust(chart: any, currSeries: ISeries) {
  const adjust = currSeries.adjust;

  if (!_.isEmpty(adjust)) { return chart.adjust(adjust); }

  return chart;
}

function setSeriesShape(chart: any, dataMapping: any, currSeries: ISeries) {
  const dim = dataMapping.shape;
  const shape = currSeries.shape;

  if (dim && shape) {
    return chart.shape(dim, shape);
  } else if (dim && !shape) {
    return chart.shape(dim);
  } else if (shape) {
    return chart.shape(shape);
  }

  return chart;
}

function setSeriesColor(chart: any, dataMapping: any, currSeries: ISeries) {
  const color = _.get(currSeries, 'color');
  const dim = dataMapping.color;

  if (dim && color) {
    return chart.color(dim, color);
  } else if (dim && !color) {
    return chart.color(dim);
  } else if (color) {
    return chart.color(color);
  }

  return chart;
}

function setSeriesSize(chart: any, dataMapping: any, currSeries: ISeries) {
  const dim = dataMapping.size;
  const size = currSeries.size;

  if (dim && size) {
    return chart.size(dim, size);
  } else if (dim && !size) {
    return chart.size(dim);
  } else if (size) {
    return chart.size(size);
  }

  return chart;
}

function setSeriesOpacity(chart: any, dataMapping: any, currSeries: ISeries) {
  const dim = dataMapping.opacity;
  const opacity = currSeries.opacity;

  if (dim && opacity) {
    return chart.opacity(dim, opacity);
  } else if (dim && !opacity) {
    return chart.opacity(dim);
  } else if (opacity) {
    return chart.opacity(opacity);
  }

  return chart;
}

function setSeriesLabel(chart: any, currSeries: ISeries) {
  const label = currSeries.label;

  if (!_.isEmpty(label)) {
    if (_.isString(label)) {
      return chart.label(label);
    }

    if (label.dataKey) {
      const options = _.omit(label, 'dataKey');
      return chart.label(label.dataKey, options);
    }
  }

  return chart;
}

function setSeriesStyle(chart: any, currSeries: ISeries) {
  const style = currSeries.style;

  if (!_.isEmpty(style)) {
    const options = _.omit(style, 'dataKey');

    if (style.dataKey) {
      return chart.style(style.dataKey, options);
    } else {
      return chart.style(options);
    }
  }

  return chart;
}

function setSeriesTooltip(chart: any, currSeries: ISeries) {
  const tooltip = currSeries.tooltip;

  if (typeof tooltip === 'boolean') {
    return chart.tooltip(false);
  }

  if (!_.isEmpty(tooltip)) {
    if (_.isString(tooltip)) {
      return chart.tooltip(tooltip);
    }

    if (tooltip.dataKey && tooltip.callback) {
      return chart.tooltip(tooltip.dataKey, tooltip.callback);
    }

    if (tooltip.dataKey) {
      return chart.tooltip(tooltip.dataKey);
    }
  }

  return chart;
}

function setSeriesSelect(chart: any, currSeries: ISeries) {
  const select = currSeries.select;

  if (select === false) {
    return chart.select(false);
  }

  if (select) {
    if (select === true) {
      return chart.select(true);
    }

    return chart.select(true, select);
  }

  return chart;
}

export const process = (chart: any, config: IMainProps) => {
  if (_.isEmpty(config.series)) { return chart; }

  config.series = Array.isArray(config.series) ? config.series : [config.series];
  config = setQuickType.process(config);

  const { dataMapping } = config;
  let series = config.series;

  // add `index` to comfirm overlay index
  series = _.sortBy(series, 'index');

  let chartInstance;
  series.forEach((currSeries: any) => {
    currSeries = skipPosition(dataMapping, currSeries);
    chartInstance = renderGemo(chart, currSeries.gemo);
    chartInstance = setSeriesPosition(chartInstance, currSeries);
    chartInstance = setSeriesAdjust(chartInstance, currSeries);
    chartInstance = setSeriesShape(chartInstance, dataMapping, currSeries);
    chartInstance = setSeriesColor(chartInstance, dataMapping, currSeries);
    chartInstance = setSeriesOpacity(chartInstance, dataMapping, currSeries);
    chartInstance = setSeriesSize(chartInstance, dataMapping, currSeries);
    chartInstance = setSeriesLabel(chartInstance, currSeries);
    chartInstance = setSeriesTooltip(chartInstance, currSeries);
    chartInstance = setSeriesStyle(chartInstance, currSeries);
    chartInstance = setSeriesSelect(chartInstance, currSeries);
  });

  return chartInstance;
};
