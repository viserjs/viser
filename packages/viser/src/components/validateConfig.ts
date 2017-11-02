import * as setDataDefConfig from './setDataDefConfig';
import * as setQuickType from './setQuickType';
import * as _ from 'lodash';

function validateAxis(dataDef, oriAxis) {
  if (oriAxis === true) { return true; }
  const axis = Array.isArray(oriAxis) ? oriAxis : [oriAxis];

  const seriesKey = [];
  const newAxis = [];

  for (const citem of dataDef.column) {
    seriesKey.push(citem);
  }

  for (const ritem of dataDef.row) {
    seriesKey.push(ritem);
  }

  for (const item of axis) {
    if (item && item.dataKey && seriesKey.indexOf(item.dataKey) >= 0) {
      newAxis.push(item);
    }
  }

  return newAxis;
}

export const validateSeries = (dataDef, oriSeries) => {
  if (!oriSeries) { throw new Error('please set at least 1 series'); }

  const series = Array.isArray(oriSeries) ? oriSeries : [oriSeries];

  const colsKey = dataDef.column;
  const rowsKey = dataDef.row;

  for (const item of series) {
    if (!item.position && dataDef.column && dataDef.row) {
      if (item.quickType === 'pie') {
        item.position = `${dataDef.row[0]}`;
      } else {
        item.position = `${dataDef.column[0]}*${dataDef.row[0]}`;
      }
    }

    let pos;
    if (Array.isArray(item.position)) {
      pos = item.position;
    } else {
      pos = item.position.split('*');
    }

    if (pos.length === 2) {
      if (colsKey.indexOf(pos[0]) < 0 || rowsKey.indexOf(pos[1]) < 0) {
        throw new Error('please set correct position in series');
      }
    } else if (pos.length === 1) {
      if (rowsKey.indexOf(pos[0]) < 0) {
        throw new Error('please set correct position in series');
      }
    }
  }

  return series;
}

export const checkChartConfig = (config) => {
  const chart = config.chart;
  if (!chart || !chart.height) {
    throw new Error('please set correct chart option');
  }

  return config;
};

export const checkViewConfig = (config) => {
  if (config.dataDef) {
    config.dataDef = setDataDefConfig.process(config);
  }

  if (config.axis) {
    config.axis = validateAxis(config.dataDef, config.axis);
  } else {
    config.axis = false;
  }

  if (config.facet) { return config; }

  if (!_.isEmpty(config.views)) {
    config.views = Array.isArray(config.views) ? config.views : [config.views];
    config.viewId = '00000';
  }

  if (config.guide) {
    const guide = config.guide;
    config.guide = Array.isArray(guide) ? guide : [guide];
  }

  config.series = validateSeries(config.dataDef, config.series);

  return config;
};
