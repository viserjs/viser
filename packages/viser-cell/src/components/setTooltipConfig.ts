import * as _ from 'lodash';

export const process = (chart: any, config: any) => {
  const cTooltip = _.cloneDeep(config.tooltip);

  if (_.isNil(cTooltip) || cTooltip === false || cTooltip.show === false) {
    return chart.tooltip(false);
  }

  for (const item in cTooltip) {
    if (item === 'onShow' || item === 'onHide' || item === 'onChange') {
      const content = cTooltip[item];
      cTooltip[item] = (ev: any) => {
        content(ev, chart);
      };
    }
  }

  return chart.tooltip(cTooltip);
};
