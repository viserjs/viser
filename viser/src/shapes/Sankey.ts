import ShapeRegister from '../utils/ShapeRegister';

const DEFAULT_SANKEY_SHAPE = 'sankey';

function interpolationGenerator(a, b) {
  const ka = +a;
  const kb = b - ka;
  return t => ka + kb * t;
}

function getCurvePath(from, to, curvature) {
  const interpolationFunc = interpolationGenerator(from.x, to.x);
  const fromCtrlX = interpolationFunc(curvature);
  const toCtrlX = interpolationFunc(1 - curvature);

  const points = [
    'C',
    fromCtrlX, from.y,
    toCtrlX, to.y,
    to.x, to.y,
  ];

  return points;
}

function getEdgePath(points, curvature) {
  const path = [
    ['M', points[0].x, points[0].y],
    ['L', points[1].x, points[1].y]
  ];
  const c1 = getCurvePath(points[1], points[3], curvature);
  path.push(c1);
  path.push(['L', points[3].x, points[3].y]);
  path.push(['L', points[2].x, points[2].y]);
  const c2 = getCurvePath(points[2], points[0], curvature);
  path.push(c2);
  path.push(['Z']);
  return path;
}

export const registerShape = (config) => {
  ShapeRegister.regist('edge', DEFAULT_SANKEY_SHAPE, {
    drawShape(cfg: any, group: any) {
      const { points, style } = cfg;
      const curvature = style.curvature || 0.5;
      const path = this.parsePath(getEdgePath(points, curvature));
      const shape = group.addShape('path', {
        attrs: {
          stroke: 'none',
          strokeOpacity: 0,
          fill: cfg.color,
          opacity: cfg.opacity,
          path,
        },
      });
      return shape;
    }
  });
};
