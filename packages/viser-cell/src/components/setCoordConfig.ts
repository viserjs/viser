import * as _ from 'lodash';
import { degreeToRadian } from '../utils/PolarUtils';

function setPolarCoord(chart: any, coord: any) {
  let newCoord = {};

  if (coord.radius && (coord.radius < 0 || coord.radius > 1) ||
      coord.innerRadius && (coord.innerRadius < 0 || coord.innerRadius > 1)) {
    throw new Error('please set correct radius or innerRadius');
  }

  if (coord.radius) {
    newCoord = { ...newCoord, radius: coord.radius };
  }

  if (coord.innerRadius) {
    newCoord = { ...newCoord, innerRadius: coord.innerRadius };
  }

  if (coord.startAngle || coord.endAngle) {
    if (coord.startAngle && (coord.startAngle < -360 || coord.startAngle > 360)) {
      throw new Error('please set correct starAngle');
    } else {
      newCoord = {
        ...newCoord,
        startAngle: degreeToRadian(coord.startAngle),
      };
    }

    if (coord.endAngle && (coord.endAngle < -360 || coord.endAngle > 360)) {
      throw new Error('please set correct endAngle');
    } else {
      newCoord = {
        ...newCoord,
        endAngle: degreeToRadian(coord.endAngle),
      };
    }
  }

  return chart.coord(coord.type, { ...newCoord });
}

function setRectCoord(chart: any, coord: any) {
  if (!coord.direction) {
    return chart.coord('rect');
  }

  return chart;
}

export const process = (chart: any, config: any) => {
  const cCoord = _.cloneDeep(config.coord);

  if (!cCoord || !cCoord.type) {
    return chart.coord('rect');
  }

  const type = cCoord.type;

  if (type === 'polar') {
    return setPolarCoord(chart, cCoord);
  }

  if (type === 'rect') {
    return setRectCoord(chart, cCoord);
  }

  return chart.coord(type);
};
