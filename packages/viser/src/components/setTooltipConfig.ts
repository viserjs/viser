import * as EventUtils from '../utils/EventUtils';

export const process = (chart: any, config: any) => {
  const tooltip = config.tooltip;

  if (!tooltip || tooltip === false) {
    return chart.tooltip(false);
  }

  if (tooltip === true) {
    return chart.tooltip(true);
  }

  for (const item in tooltip) {
    if (tooltip.hasOwnProperty(item)) {
      EventUtils.setEvent(chart, 'tooltip', item);
    }
  }

  return chart.tooltip(tooltip);
};
