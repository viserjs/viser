import * as G2 from '@antv/g2';
import * as _ from 'lodash';
import ShapeRegister from '../utils/ShapeRegister';

const DEFAULT_WATERFALL_SHAPE = 'waterfall';

function getRectPath(points) {
  const path = [];
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    if (point) {
      const action = i === 0 ? 'M' : 'L';
      path.push([ action, point.x, point.y ]);
    }
  }
  const first = points[0];
  path.push(['L', first.x, first.y]);
  path.push(['z']);

  return path;
}

function getFillAttrs(cfg) {
  const defaultAttrs = G2.Global.shape.interval;
  const attrs = G2.Util.mix({}, defaultAttrs, {
    fill: cfg.color,
    stroke: cfg.color,
    fillOpacity: cfg.opacity,
  }, cfg.style);
  return attrs;
}

export const registerShape = (config) => {
  ShapeRegister.regist('interval', DEFAULT_WATERFALL_SHAPE, {
    drawShape(cfg, group) {
      const attrs = getFillAttrs(cfg);
      let rectPath = getRectPath(cfg.points);
      rectPath = this.parsePath(rectPath);
      const interval = group.addShape('path', {
        attrs: G2.Util.mix(attrs, {
          path: rectPath,
        }),
      });

      if (cfg.nextPoints) {
        let linkPath = [
          ['M', cfg.points[2].x, cfg.points[2].y],
          ['L', cfg.nextPoints[0].x, cfg.nextPoints[0].y],
        ];

        if (cfg.nextPoints[0].y === 0) {
          linkPath[1] = ['L', cfg.nextPoints[1].x, cfg.nextPoints[1].y];
        }

        linkPath = this.parsePath(linkPath);
        group.addShape('path', {
          attrs:  {
            path: linkPath,
            stroke: 'rgba(0, 0, 0, 0.45)',
            lineDash: [4, 2],
            ...cfg.style,
          }
        });
      }

      return interval;
    }
  });
};
