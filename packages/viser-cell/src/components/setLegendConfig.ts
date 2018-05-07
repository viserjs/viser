import * as _ from 'lodash';

export const process = (chart: any, config: any) => {
  const cLegend = _.cloneDeep(config.legend);
  const isArr = Array.isArray(cLegend);

  if (_.isNil(cLegend) || cLegend === false ||
     (isArr && cLegend.length === 0)) {
    return chart.legend(false);
  }

  if (cLegend === true) { return chart.legend(true); }

  const arrLegend = isArr ? cLegend : [cLegend];

  for (let res of arrLegend) {
    for (const item in res) {
      // Due to lack of legend:click event support in F2.chart,
      // unlike other component,
      // we have to use onClick on Legend.
      if (item === 'onClick') {
        const content = res['onClick'];
        res['onClick'] = (ev?: any) => {
          content(ev, chart);
        };
      }
    }

    if (res.dataKey) {
      if (res.show === false) {
        chart.legend(res.dataKey, false);
      } else {
        const option = _.omit(res, ['dataKey', 'show']);
        chart.legend(res.dataKey, option);
      }
    } else {
      chart.legend(res);
    }
  }
  return chart;
};
