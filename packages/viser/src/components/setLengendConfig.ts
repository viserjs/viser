import * as _ from 'lodash';

function setHighlight(item) {
  item.onHover = (ev) => {
    const shapes = ev.shapes;
    const geom = ev.geom;
    geom.highlightShapes(shapes);
  };

  return item;
}

export const process = (chart, config) => {
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
      const option = _.omit(res, ['dataKey']);
      return chart.legend(res.dataKey, option);
    } else {
      return chart.legend(res);
    }
  }
};
