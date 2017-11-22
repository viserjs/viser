import * as setCustomFormatter from './setCustomFormatter';
import * as _ from 'lodash';

function validateAxis(dataMapping: any, oriAxis: any) {
  if (oriAxis === true) { return true; }
  const axis = Array.isArray(oriAxis) ? oriAxis : [oriAxis];

  const seriesKey = [];
  const newAxis = [];

  for (const citem of dataMapping.column) {
    seriesKey.push(citem);
  }

  for (const ritem of dataMapping.row) {
    seriesKey.push(ritem);
  }

  for (const item of axis) {
    if (item && item.dataKey && seriesKey.indexOf(item.dataKey) >= 0) {
      newAxis.push(item);
    }
  }

  return newAxis;
}

function setRotatePolarAxis(chart: any, config: any) {
  const { coord, data, dataMapping, axis } = config;

  const colsKey = dataMapping.column[0];
  const axisTick = dataMapping.scale[colsKey];

  if (!axisTick || !_.get(axisTick, 'tick.rotate')) { return; }

  let tickStyle = {};
  if (axisTick.tick.rotate === 'parallel') {
    tickStyle = {
      rotate: coord.startAngle,
      textAlign: 'center',
    };
  } else if (axisTick.tick.rotate === 'normal') {
    tickStyle = {
      rotate: coord.startAngle + 90,
      textAlign: 'right',
    };
  }

  const offsetX = _.get(axisTick, 'tick.offsetX') ? { offsetX: axisTick.tick.offsetX } : null;
  const offsetY = _.get(axisTick, 'tick.offsetY') ? { offsetY: axisTick.tick.offsetY } : null;

  data.forEach((res: any, i: any) => {
    chart.guide().text({
      position: [i, 0],
      content: data[i][colsKey],
      style: {
        axisTick,
        ...tickStyle,
      },
      ...offsetX,
      ...offsetY,
    });
  });
}

function generateAxisNameOptions(config: any) {
  const axisPos = config.position;
  const namePos = config.name.position;
  const title = config.name.value ? config.name.value :
    (config.name.formatter ? config.name.formatter() : '');

  // position coordinate begin  left top point
  let labelViewPos = ['0%', '0%'];
  if (axisPos === 'bottom' && namePos === 'left') {
    labelViewPos = ['0%', '100%'];
  } else if (axisPos === 'bottom' && namePos === 'middle') {
    labelViewPos = ['50%', '100%'];
  } else if (axisPos === 'bottom' && namePos === 'right') {
    labelViewPos = ['100%', '100%'];
  } else if (axisPos === 'left' && namePos === 'top') {
    labelViewPos = ['0%', '0%'];
  } else if (axisPos === 'left' && namePos === 'middle') {
    labelViewPos = ['0%', '50%'];
  } else if (axisPos === 'left' && namePos === 'bottom') {
    labelViewPos = ['0%', '100%'];
  } else if (axisPos === 'right' && namePos === 'top') {
    labelViewPos = ['100%', '0%'];
  } else if (axisPos === 'right' && namePos === 'middle') {
    labelViewPos = ['100%', '50%'];
  } else if (axisPos === 'right' && namePos === 'bottom') {
    labelViewPos = ['100%', '100%'];
  } else if (axisPos === 'top' && namePos === 'left') {
    labelViewPos = ['0%', '0%'];
  } else if (axisPos === 'top' && namePos === 'middle') {
    labelViewPos = ['50%', '0%'];
  } else if (axisPos === 'top' && namePos === 'right') {
    labelViewPos = ['100%', '0%'];
  }

  return {
    top: true,
    position: labelViewPos,
    content: title,
    style: config.label,
  };
}

export const process = (chart: any, config: any) => {
  const { coord, axis, series, dataMapping } = config;

  if (config.axis) {
    config.axis = validateAxis(config.dataMapping, config.axis);
  } else {
    config.axis = false;
  }

  const isArr = Array.isArray(axis);

  if (!axis || (isArr && axis.length === 0)) { return chart.axis(false); }

  if (axis === true) { return chart.axis(); }

  if (coord && coord.type === 'polar' && coord.direction === 'rotate') {
    setRotatePolarAxis(chart, config);
  }

  const newAxis = [];

  for (const res of axis) {
    if (res.show === false) { return chart.axis(res.dataKey, false); }

    if (res.label) { res.label = setCustomFormatter.supportD3Formatter(res.label); }

    const options = _.omit(res, ['show', 'dataKey']);
    chart.axis(res.dataKey, options);

    if (res.name) {
      chart.guide().text(generateAxisNameOptions(res));
    }
  }

  return chart;
};
