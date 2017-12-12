import * as EventUtils from '../utils/EventUtils';
import * as _ from 'lodash';

export const process = (chart: any, config: any) => {
  let tooltip = config.tooltip;

  if (_.isNil(tooltip) || tooltip === false || tooltip.show === false) {
    return chart.tooltip(false);
  }

  for (const item in tooltip) {
    if (item === 'g2Tooltip') {
      tooltip['g2-tooltip'] = tooltip[item];
      tooltip = _.omit(tooltip, 'g2Tooltip');
    }

    if (tooltip.hasOwnProperty(item)) {
      EventUtils.setEvent(chart, 'tooltip', item);
    }
  }

  return chart.tooltip(tooltip);
};
