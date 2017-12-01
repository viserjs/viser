const G2 = require('@antv/g2');

export default (geoName: string, shapeName: string, {
  getPoints,
  drawShape,
}: any) => {
  G2.Shape.registerShape(geoName, shapeName, { getPoints, drawShape });
};
