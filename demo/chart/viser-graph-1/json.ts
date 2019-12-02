import { ViserGraph, registerNode, registerEdge, GlobalG6 as G6 } from '../../../packages/viser-graph/src/index';

const data = {
  nodes: [
      {id: '7', x: 200, y: 200, size: 40, shape: 'circleNode',anchorPoints: [[1, 0.5], [1, 0]]},
      {id: '8', x: 400, y: 400, size: 40, shape: 'circleNode',anchorPoints: [[0, 0.5], [0, 1]]},
  ],
  edges: [
      {source: '7', target: '8', shape: 'line-arrow-self',sourceAnchor: 0,targetAnchor: 0,}
  ]
};

registerNode('circleNode', {
  drawShape(cfg, group) {
    const keyShape = group.addShape('circle', {
      attrs: {
        x: 0,
        y: 0,
        r: 30,
        fill: '#87e8de'
      }
    });

    return keyShape;
  }
}, 'circle');

registerEdge('line-arrow', {
  draw(cfg, group) {
    const { startPoint, endPoint } = cfg
    const keyShape = group.addShape('path', {
      attrs: {
          path: [
              ['M', startPoint.x, startPoint.y],
              ['L', endPoint.x / 3 + 2 / 3 * startPoint.x , startPoint.y],
              ['L', endPoint.x / 3 + 2 / 3 * startPoint.x , endPoint.y],
              ['L', endPoint.x, endPoint.y]
          ],
          stroke: '#BBB',
          lineWidth: 1,
          startArrow: {
              path: 'M 6,0 L -6,-6 L -3,0 L -6,6 Z',
              d: 6
          },
          endArrow: {
              path: 'M 6,0 L -6,-6 L -3,0 L -6,6 Z',
              d: 6
          },
          className: 'edge-shape'
      }
    });
    return keyShape
  }
});

registerEdge('line-arrow-self', {
  getPath(points) {
    const startPoint = points[0]
    const endPoint = points[1]
    return [
        ['M', startPoint.x, startPoint.y],
        ['L', endPoint.x / 3 + 2 / 3 * startPoint.x , startPoint.y],
        ['L', endPoint.x / 3 + 2 / 3 * startPoint.x , endPoint.y],
        ['L', endPoint.x, endPoint.y]
    ]
  },
  getShapeStyle(cfg) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;
    const controlPoints = this.getControlPoints(cfg);
    let points = [ startPoint ]; // 添加起始点
    // 添加控制点
    if (controlPoints) {
      points = points.concat(controlPoints);
    }
    // 添加结束点
    points.push(endPoint);
    const path = this.getPath(points);
    const style = G6.Util.mix({}, G6.Global.defaultEdge.style, {
      stroke: '#BBB',
      lineWidth: 1,
      path,
      startArrow: {
          path: 'M 6,0 L -6,-6 L -3,0 L -6,6 Z',
          d: 6
      },
      endArrow: {
          path: 'M 6,0 L -6,-6 L -3,0 L -6,6 Z',
          d: 6
      },
    }, cfg.style);
    return style;
  },
}, 'line');


new ViserGraph({
  data,
  graph: {
    container: 'mount',
  },
}).render();