import * as _ from 'lodash';
import ShapeRegister from '../utils/ShapeRegister';
import IShapePoints from '../typed/ShapePoints';

const DEFAULT_RADIALBAR_SHAPE = 'radialBar';

function getPath(points: IShapePoints[]) {
  const path = [['M', points[0].x, points[0].y]];

  for (let i = 1; i < points.length; i++) {
    if (points[i]) {
      path.push(['L', points[i].x, points[i].y]);
    }
  }

  path.push(['z']);

  return path;
}

export const registerShape = () => {
  ShapeRegister.regist('interval', DEFAULT_RADIALBAR_SHAPE, {
    getPoints({x, y, y0, size}: IShapePoints) {
      return [
        { x: x - size / 2, y: y0 },
        { x: x - size / 2, y },
        { x: x + size / 2, y },
        { x: x + size / 2, y: y0 },
        { x: x - size / 2, y: 1 },
        { x: x + size / 2, y: 1 },
      ];
    },

    drawShape(cfg: any, group: any) {
      const points = cfg.points;
      const rectPoints = points.slice(0, 4);
      const path = this.parsePath(getPath(rectPoints));

      const shape = group.addShape('path', {
        attrs: {
          fill: cfg.color,
          path,
        },
      });

      if (cfg.style.background) {
        const backPoints = [points[1], points[4], points[5], points[2]];
        const backPath = this.parsePath(getPath(backPoints));

        group.addShape('path', {
          attrs: {
            path: backPath,
            fill: cfg.style.background,
          },
        });
      }

      return shape;
    },
  });
};
