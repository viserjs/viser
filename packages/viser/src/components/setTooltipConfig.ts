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

    if (item === 'g2TooltipTitle') {
      cTooltip['g2-tooltip-title'] = cTooltip[item];
      cTooltip = _.omit(cTooltip, 'g2TooltipTitle');
    }

    if (item === 'g2TooltipList') {
      cTooltip['g2-tooltip-list'] = cTooltip[item];
      cTooltip = _.omit(cTooltip, 'g2TooltipList');
    }

    if (item === 'g2TooltipListItem') {
      cTooltip['g2-tooltip-list-item'] = cTooltip[item];
      cTooltip = _.omit(cTooltip, 'g2TooltipListItem');
    }

    if (item === 'g2TooltipMaker') {
      cTooltip['g2-tooltip-maker'] = cTooltip[item];
      cTooltip = _.omit(cTooltip, 'g2TooltipMaker');
    }
  }

  EventUtils.setEvent(chart, 'tooltip', cTooltip);

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
