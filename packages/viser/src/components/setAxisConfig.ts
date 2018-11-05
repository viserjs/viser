import * as _ from 'lodash';
import * as EventUtils from '../utils/EventUtils';
import * as setCustomFormatter from './setCustomFormatter';

function setRotatePolarAxis(chart: any, axisItem: any, coord: any, data: any) {
  const polarLabel = _.get(axisItem, 'polarLabel');
  const rotate = _.get(axisItem, 'polarLabel.rotate');

  if (!rotate) { return; }

  let tickStyle = {};
  if (rotate === 'parallel') {
    tickStyle = {
      rotate: coord.startAngle,
      textAlign: 'center',
    };
  } else if (rotate === 'normal') {
    tickStyle = {
      rotate: coord.startAngle + 90,
      textAlign: 'right',
    };
  }

  const offsetX = _.get(axisItem, 'polarLabel.offsetX');
  const offsetY = _.get(axisItem, 'polarLabel.offsetY');

  data.forEach((res: any, i: any) => {
    chart.guide().text({
      position: [i, 0],
      content: data[i][axisItem.dataKey],
      style: {
        polarLabel,
        ...tickStyle,
      },
      ...offsetX,
      ...offsetY,
    });
  });
}

export const process = (chart: any, config: any) => {
  const cAxis = _.cloneDeep(config.axis);
  const isArr = _.isArray(cAxis);

  if (_.isNil(cAxis) || cAxis === false ||
     (isArr && cAxis.length === 0)) {
    return chart.axis(false);
  }

  if (cAxis === true) { return chart.axis(); }

  const arrAxis = isArr ? cAxis : [cAxis];
  const { coord, data } = config;

  for (const res of arrAxis) {
    if (coord && coord.type === 'polar' && coord.direction === 'rotate') {
      setRotatePolarAxis(chart, res, coord, data);
    }

    if (res.label) {
      res.label = setCustomFormatter.supportD3Formatter(res.label);
    }

    for (const item in res) {
      if (res.hasOwnProperty(item)) {
        const name = item === 'tickLine' ? 'ticks' : item;
        EventUtils.setSEvent(chart, 'axis', name, res[item]);
      }
    }

    if (res.dataKey) {
      if (res.show === false) {
        chart.axis(res.dataKey, false);
      } else {
        const options = _.omit(res, ['show', 'dataKey']);

        // optimize , support config label density
        const label = options.label;
        if (label && _.isNumber(label.density)
          && (0 < label.density) &&  (label.density < 1)
          && _.isFunction(label.formatter)) {
          const gap = Math.floor(1 / label.density);
          const formatter = label.formatter;

          options.label.formatter = (val: any, item: any, i: number) => {
            if (i % gap) {
              return ' ';
            } else {
              return formatter(val, item, i);
            }
          };
        }
        chart.axis(res.dataKey, options);
      }
    } else {
      chart.axis(res);
    }
  }

  return chart;
};
