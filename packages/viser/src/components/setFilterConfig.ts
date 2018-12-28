import * as _ from 'lodash';

export const process = (chart: any, config: any) => {
  const cFilter = _.cloneDeep(config.filter);
  const isArr = _.isArray(cFilter);

  if (_.isEmpty(cFilter)) { return; }

  const arrFilter = isArr ? cFilter : [cFilter];

  for (const res of arrFilter) {
    if (res.dataKey && res.callback) {
      chart.filter(res.dataKey, res.callback);
    }
  }

  return chart;
};
