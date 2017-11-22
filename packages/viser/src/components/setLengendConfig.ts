import * as _ from 'lodash';

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

  if (!legend || (isArr && legend.length === 0)) {
    return chart.legend(false);
  }

  const arrLegend = isArr ? legend : [legend];

  for (let res of arrLegend) {
    if (res.highlight) {
      res = setHighlight(res);
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
