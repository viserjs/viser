import * as _ from 'lodash';
import * as setCustomFormatter from './setCustomFormatter';

export const process = (chart, config) => {
  let scale = config.scale;
  let options = {};

  if (_.isEmpty(scale)) { return; }

  scale = Array.isArray(scale) ? scale : [scale];

  for (const res of scale) {
    if (res.dataKey) {
      const currOption = _.omit(res, 'dataKey');
      options[res.dataKey] = currOption;
    }
  }

  options = setCustomFormatter.supportD3Formatter(options);
  return chart.scale(options);
};
