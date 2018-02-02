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

    if (item === 'g2TooltipList') {
      cTooltip['g2-tooltip-list'] = cTooltip[item];
      cTooltip = _.omit(cTooltip, 'g2TooltipList');
    }

    if (cTooltip.hasOwnProperty(item)) {
      EventUtils.setEvent(chart, 'tooltip', item);
    }
  }

  return chart.tooltip(cTooltip);
};

export const setDefaultPoint = (chart: any, config: any) => {
  let cTooltip = _.cloneDeep(config.tooltip);

  if (
    !_.isNil(cTooltip) && cTooltip !== false && cTooltip.show !== false
    && cTooltip.defaultPoint
  ) {
    const defaultPoint = cTooltip.defaultPoint;
    const xyPoint = chart.getXY(defaultPoint);
    if (!!xyPoint) {
      chart.showTooltip(xyPoint);
    }
  }
};
