import * as _ from 'lodash';
import * as EventUtils from '../utils/EventUtils';

function setHighlight(item: any) {
  item.onHover = (ev: any) => {
    const shapes = ev.shapes;
    const geom = ev.geom;
    geom.highlightShapes(shapes);
  };

  return item;
}

export const process = (chart: any, config: any) => {
  const legend = config.legend;
  const isArr = Array.isArray(legend);

  if (_.isNil(legend) || legend === false ||
     (isArr && legend.length === 0)) {
    return chart.legend(false);
  }

  if (legend === true) { return chart.legend(); }

  const arrLegend = isArr ? legend : [legend];

  for (let res of arrLegend) {
    if (res.highlight) {
      res = setHighlight(res);
    }

    for (const item in res) {
      if (res.hasOwnProperty(item)) {
        EventUtils.setSEvent(chart, 'legend', item, res[item]);
      }
    }

    if (res.dataKey) {
      if (res.show === false) { return chart.legend(res.dataKey, false); }

      const option = _.omit(res, ['dataKey', 'show']);
      return chart.legend(res.dataKey, option);
    } else {
      return chart.legend(res);
    }
  }
};
