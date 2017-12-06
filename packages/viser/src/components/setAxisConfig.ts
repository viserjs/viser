import * as setCustomFormatter from './setCustomFormatter';
import * as _ from 'lodash';
import * as EventUtils from '../utils/EventUtils';

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
  if (!config.axis || (_.isArray(config.axis) && config.axis.length === 0)) {
    return chart.axis(false);
  }

  const axis = config.axis = Array.isArray(config.axis) ? config.axis : [config.axis];
  const { coord, data } = config;

  if (axis === true) { return chart.axis(); }

  for (const res of axis) {
    if (res.show === false) { return chart.axis(res.dataKey, false); }

    if (coord && coord.type === 'polar' && coord.direction === 'rotate') {
      setRotatePolarAxis(chart, res, coord, data);
    }

    if (res.label) { res.label = setCustomFormatter.supportD3Formatter(res.label); }

    const options = _.omit(res, ['show', 'dataKey']);
    chart.axis(res.dataKey, options);

    for (const item in res) {
      if (res.hasOwnProperty(item)) {
        let name = `axis-${item}`;
        if (item === 'tickLine') {
          name = 'axis-ticks';
        }

        EventUtils.setEvent(chart, name, res[item]);
      }
    }
  }

  return chart;
};
