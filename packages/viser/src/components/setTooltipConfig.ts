import * as EventUtils from '../utils/EventUtils';

export const process = (chart: any, config: any) => {
  const tooltip = config.tooltip;

  if (!tooltip || tooltip === false) {
    return chart.tooltip(false);
  }

  if (tooltip === true) {
    return chart.tooltip(true);
  }

  tooltip.forEach((res: any) => {
    EventUtils.setEvent(chart, 'tooltip', res);
  });

  return chart.tooltip(tooltip);
};
