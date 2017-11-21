import ShapeRegister from '../utils/ShapeRegister';
import IShapePoints from '../typed/ShapePoints';

const DEFAULT_ERRORBAR_SHAPE = 'errorbar';

function renderBarPath(points: IShapePoints[]) {
  return [
    ['M', points[1].x, points[1].y],
    ['L', points[2].x, points[2].y],
    ['Z'],
    ['M', (points[1].x + points[2].x) / 2, (points[1].y + points[2].y) / 2],
    ['L', (points[0].x + points[3].x) / 2, (points[0].y + points[3].y) / 2],
    ['Z'],
    ['M', points[0].x, points[0].y],
    ['L', points[3].x, points[3].y],
    ['Z'],
  ];
}

export const registerShape = () => {
  let barWidth = 1;
  let hasPoint = false;

  ShapeRegister.regist('schema', DEFAULT_ERRORBAR_SHAPE, {
    getPoints({ x, y, size }: IShapePoints) {
      // 1 -> 2
      // |    |
      // 5<-4 |
      // |    |
      // 0    3

      return [
        { x: x - (size / 2) * barWidth, y: y[0] },
        { x: x - (size / 2) * barWidth, y: y[2] },
        { x: x + (size / 2) * barWidth, y: y[2] },
        { x: x + (size / 2) * barWidth, y: y[0] },
        { x, y: y[1] },
        { x: x - (size / 2) * barWidth , y: y[1] },
      ];
    },

    drawShape(cfg: any, group: any) {
      const newGroup = group;
      const { points } = cfg;
      newGroup.addShape('path', {
        attrs: {
          stroke: cfg.color,
          strokeOpacity: cfg.opacity || 1,
          lineWidth: cfg.style.lineWidth || 1,
          fill: cfg.color,
          opacity: cfg.opacity || 1,
          path: this.parsePath(renderBarPath(points)),
          ...cfg.style,
        }
      });
      if (hasPoint) {
        newGroup.addShape('circle', {
          attrs: {
            stroke: cfg.color,
            strokeOpacity: cfg.opacity || 1,
            lineWidth: cfg.style.lineWidth || 1,
            fill: cfg.color,
            opacity: cfg.opacity || 1,
            x: this.parsePoint(points[4]).x,
            y: this.parsePoint(points[4]).y,
            r: cfg.style.lineWidth + 0.5 || 1.5,
            ...cfg.style,
          }
        });
      }

      return newGroup;
    }
  });
};
