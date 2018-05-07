import * as setCustomFormatter from './setCustomFormatter';
import * as _ from 'lodash';

export const process = (chart: any, config: any) => {
  const cAxis = _.cloneDeep(config.axis);
  const isArr = _.isArray(cAxis);

  if (_.isNil(cAxis) || cAxis === false ||
     (isArr && cAxis.length === 0)) {
    return chart.axis(false);
  }

  if (cAxis === true) { return chart.axis(true); }

  const arrAxis = isArr ? cAxis : [cAxis];
  const { coord, data } = config;

  for (const res of arrAxis) {
    if (res.label) {
      res.label = setCustomFormatter.supportD3Formatter(res.label);
    }

    if (res.dataKey) {
      if (res.show === false) {
        chart.axis(res.dataKey, false);
      } else {
        const options = _.omit(res, ['show', 'dataKey']);
        chart.axis(res.dataKey, options);
      }
    } else {
      chart.axis(res);
    }
  }

  return chart;
};
