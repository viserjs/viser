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
        // Due to lack of legend:click event support in G2.chart,
        // unlike other component,
        // we have to use onClick on Legend.
        if (item === 'onClick') {
          const content = res.onClick;
          res.onClick = (ev?: any) => {
            content(ev, chart);
          };
        }

        EventUtils.setSEvent(chart, 'legend', item, res[item]);
      }
    }

    if (!_.isNil(res.legendMarker)) {
      res['g2-legend-marker'] = res.legendMarker;
    }

    if (!_.isNil(res.legendListItem)) {
      res['g2-legend-list-item'] = res.legendListItem;
    }

    res = _.omit(res, ['legendMarker', 'legendListItem']);

    if (res.dataKey) {
      if (res.show === false) {
        chart.legend(res.dataKey, false);
      } else {
        const option = _.omit(res, ['dataKey', 'show']);
        chart.legend(res.dataKey, option);
      }
    } else {
      chart.legend(res);
    }
  }
  return chart;
};
