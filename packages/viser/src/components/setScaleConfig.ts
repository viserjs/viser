import * as _ from 'lodash';
import * as setCustomFormatter from './setCustomFormatter';

export const process = (chart: any, config: any) => {
  const cScale = _.cloneDeep(config.scale);
  let isArr = _.isArray(cScale);

  if (_.isEmpty(cScale)) { return; }

  const arrScale = isArr ? cScale : [cScale];
  let options: any = {};

  for (const res of arrScale) {
    if (res.dataKey) {
      const currOption = _.omit(res, 'dataKey');
      options[res.dataKey] = currOption;
    }
  }

  options = setCustomFormatter.supportD3Formatter(options);
  return chart.scale(options);
};
