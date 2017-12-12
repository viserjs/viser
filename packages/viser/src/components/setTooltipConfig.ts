import * as EventUtils from '../utils/EventUtils';
import * as _ from 'lodash';

export const process = (chart: any, config: any) => {
  let cTooltip = _.cloneDeep(config.tooltip);

  if (_.isNil(cTooltip) || cTooltip === false || cTooltip.show === false) {
    return chart.tooltip(false);
  }

  for (const item in cTooltip) {
    if (item === 'g2Tooltip') {
      cTooltip['g2-tooltip'] = cTooltip[item];
      cTooltip = _.omit(cTooltip, 'g2Tooltip');
    }

    if (cTooltip.hasOwnProperty(item)) {
      EventUtils.setEvent(chart, 'tooltip', item);
    }
  }

  return chart.tooltip(cTooltip);
};
