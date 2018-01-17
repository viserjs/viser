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
  const cLegend = _.cloneDeep(config.legend);
  const isArr = Array.isArray(cLegend);

  if (_.isNil(cLegend) || cLegend === false ||
     (isArr && cLegend.length === 0)) {
    return chart.legend(false);
  }

  if (cLegend === true) { return chart.legend(); }

  const arrLegend = isArr ? cLegend : [cLegend];

  for (let res of arrLegend) {
    if (res.highlight) {
      res = setHighlight(res);
    }

    for (const item in res) {
      if (res.hasOwnProperty(item)) {
        EventUtils.setSEvent(chart, 'legend', item, res[item]);
      }
    }
    res = {
      ...res,
      ...res.legendMarker || {},
    };
    res = _.omit(res, ['legendMarker']);
    if (res.dataKey) {
      if (res.show === false) { return chart.legend(res.dataKey, false); }
      const option = _.omit(res, ['dataKey', 'show']);
      return chart.legend(res.dataKey, option);
    } else {
      return chart.legend(res);
    }
  }
};
