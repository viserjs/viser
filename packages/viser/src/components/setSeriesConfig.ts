import * as _ from 'lodash';
import * as setQuickType from './setQuickType';

function isFunction(fn) {
  return Object.prototype.toString.call(fn) === '[object Function]';
}

function renderGemo(chart, gemo) {
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

function skipPosition(dataDef, currSeries) {
  if (!currSeries.position && dataDef.column && dataDef.row) {
    if (currSeries.quickType === 'pie') {
      currSeries.position = `${dataDef.row[0]}`;
    } else {
      currSeries.position = `${dataDef.column[0]}*${dataDef.row[0]}`;
    }
  }

  return currSeries;
}

function setSeriesPosition(chart, currSeries) {
  return chart.position(currSeries.position);
}

function setSeriesAdjust(chart, currSeries) {
  const adjust = currSeries.adjust;

  if (!_.isEmpty(adjust)) { return chart.adjust(adjust); }

  return chart;
}

function setSeriesShape(chart, dataDef, currSeries) {
  const dim = dataDef.shape;
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

function setSeriesColor(chart, dataDef, currSeries) {
  const color = _.get(currSeries, 'color');
  const dim = dataDef.color;

  if (dim && color) {
    return chart.color(dim, color);
  } else if (dim && !color) {
    return chart.color(dim);
  } else if (color) {
    return chart.color(color);
  }

  return chart;
}

function setSeriesSize(chart, dataDef, currSeries) {
  const dim = dataDef.size;
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

function setSeriesOpacity(chart, dataDef, currSeries) {
  const dim = dataDef.opacity;
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

function setSeriesLabel(chart, currSeries) {
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

function setSeriesStyle(chart, currSeries) {
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

function setSeriesTooltip(chart, currSeries) {
  const tooltip = currSeries.tooltip;

  if (tooltip === false) {
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

function setSeriesSelect(chart, currSeries) {
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

export const process = (chart, config) => {
  if (_.isEmpty(config.series)) { return chart; }

  config.series = Array.isArray(config.series) ? config.series : [config.series];
  config = setQuickType.process(config);

  const { dataDef } = config;
  let series = config.series;

  // add `index` to comfirm overlay index
  series = _.sortBy(series, 'index');

  let chartInstance;
  series.forEach((currSeries: any) => {
    currSeries = skipPosition(dataDef, currSeries);
    chartInstance = renderGemo(chart, currSeries.gemo);
    chartInstance = setSeriesPosition(chartInstance, currSeries);
    chartInstance = setSeriesAdjust(chartInstance, currSeries);
    chartInstance = setSeriesShape(chartInstance, dataDef, currSeries);
    chartInstance = setSeriesColor(chartInstance, dataDef, currSeries);
    chartInstance = setSeriesOpacity(chartInstance, dataDef, currSeries);
    chartInstance = setSeriesSize(chartInstance, dataDef, currSeries);
    chartInstance = setSeriesLabel(chartInstance, currSeries);
    chartInstance = setSeriesTooltip(chartInstance, currSeries);
    chartInstance = setSeriesStyle(chartInstance, currSeries);
    chartInstance = setSeriesSelect(chartInstance, currSeries);
  });

  return chartInstance;
};
