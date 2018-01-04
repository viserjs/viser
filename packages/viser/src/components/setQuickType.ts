import * as _ from 'lodash';

const QUICK_TYPE = [
  {
    type: 'pie',
    series: {
      gemo: 'interval',
      adjust: 'stack',
    },
    coord: {
      type: 'theta',
    }
  },
  {
    type: 'sector',
    series: {
      gemo: 'interval',
    },
    coord: {
      type: 'polar',
    }
  },
  {
    type: 'line',
    series: {
      gemo: 'line',
    }
  },
  {
    type: 'smoothLine',
    series: {
      gemo: 'line',
      shape: 'smooth',
    },
  },
  {
    type: 'dashLine',
    series: {
      gemo: 'line',
      shape: 'dash',
    },
  },
  {
    type: 'stackLine',
    series: {
      gemo: 'line',
      adjust: 'stack',
    },
  },
  {
    type: 'area',
    series: {
      gemo: 'area',
    },
  },
  {
    type: 'stackArea',
    series: {
      gemo: 'area',
      adjust: 'stack',
    },
  },
  {
    type: 'smoothArea',
    series: {
      gemo: 'area',
      shape: 'smooth',
    },
  },
  {
    type: 'interval',
    series: {
      gemo: 'interval',
    }
  },
  {
    type: 'stackInterval',
    series: {
      gemo: 'interval',
      shape: 'interval',
      adjust: 'stack',
    },
  },
  {
    type: 'dodgeInterval',
    series: {
      gemo: 'interval',
      shape: 'interval',
      adjust: 'dodge',
    },
  },
  {
    type: 'bar',
    series: {
      gemo: 'interval',
    }
  },
  {
    type: 'stackBar',
    series: {
      gemo: 'interval',
      shape: 'interval',
      adjust: 'stack',
    },
  },
  {
    type: 'dodgeBar',
    series: {
      gemo: 'interval',
      shape: 'interval',
      adjust: 'dodge',
    },
  },
  {
    type: 'point',
    series: {
      gemo: 'point',
      shape: 'circle',
    },
  },
  {
    type: 'funnel',
    series: {
      gemo: 'interval',
      adjust: 'symmetric',
      shape: 'funnel',
    },
  },
  {
    type: 'pyramid',
    series: {
      gemo: 'interval',
      adjust: 'symmetric',
      shape: 'pyramid',
    },
  },
  {
    type: 'schema',
    series: {
      gemo: 'schema',
      shape: 'box',
    },
  },
  {
    type: 'box',
    series: {
      gemo: 'schema',
      shape: 'box',
    },
  },
  {
    type: 'candle',
    series: {
      gemo: 'schema',
      shape: 'candle',
    },
  },
  {
    type: 'polygon',
    series: {
      gemo: 'polygon',
    },
  },
  {
    type: 'contour',
    series: {
      gemo: 'contour',
    },
  },
  {
    type: 'heatmap',
    series: {
      gemo: 'heatmap',
    },
  },
  {
    type: 'edge',
    series: {
      gemo: 'edge',
    },
  },
  {
    type: 'sankey',
    series: {
      gemo: 'edge',
      shape: 'sankey',
    },
  },
  {
    type: 'errorBar',
    series: {
      gemo: 'schema',
      shape: 'errorbar',
    },
  },
  {
    type: 'jitterPoint',
    series: {
      gemo: 'point',
      adjust: 'jitter',
    },
  },
];

export const process = (series: any, coord: any) => {
  const quickType: any = {};

  for (const item of QUICK_TYPE) {
    quickType[item.type] = item;
  }

  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < series.length; i++) {
    const currType = quickType[series[i].quickType];

    if (currType) {
      series[i] = {
        ...series[i],
        ...currType.series,
      };

      if (coord && coord.type && _.get(currType, 'coord.type') &&
          _.get(currType, 'coord.type') !== coord.type) {
        throw new Error('quickType and coord had conflicted.');
      }
    }
  }

  return series;
};
