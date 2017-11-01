import * as G2 from '@antv/g2';

export default {
  regist: (geoName: string, shapeName: string, {
    getPoints,
    drawShape,
  }: any) => {
    G2.Shape.registerShape(geoName, shapeName, { getPoints, drawShape });
  },
};
