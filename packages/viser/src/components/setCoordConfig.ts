import { degreeToRadian } from '../utils/PolarUtils';
import * as _ from 'lodash';

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

  const polarCoord = chart.coord(coord.type, { ...newCoord });

  switch (coord.direction) {
    case 'rotate':
      polarCoord.transpose();
      break;
    case 'xReverse':
      polarCoord.reflect('x');
      break;
    case 'yReverse':
      polarCoord.reflect('y');
      break;
    case 'reverse':
      polarCoord.reflect();
      break;
    default:
      break;
  }

  return polarCoord;
}

function setRectCoord(chart: any, coord: any) {
  if (!coord.direction) {
    return chart.coord('rect');
  }

  switch (coord.direction) {
    case 'BL':
      chart.coord('rect');
      break;
    case 'BR':
      chart.coord('rect').scale(-1, 1);
      break;
    case 'LT':
      chart.coord('rect').transpose().scale(1, -1);
      break;
    case 'LB':
      chart.coord('rect').transpose();
      break;
    case 'RB':
      chart.coord('rect').transpose().reflect();
      break;
    case 'RT':
      chart.coord('rect').transpose().reflect().scale(-1, 1);
      break;
    case 'TL':
      chart.coord('rect').reflect();
      break;
    case 'TR':
      chart.coord('rect').reflect().scale(-1, 1);
      break;
    default:
      chart.coord('rect');
      break;
  }

  return chart;
}

export const process = (chart: any, config: any) => {
  const cCoord = _.cloneDeep(config.coord);

  if (!cCoord || !cCoord.type) {
    return chart.coord('rect');
  }

  const type = cCoord.type;

  if (type === 'polar' || type === 'theta') {
    return setPolarCoord(chart, cCoord);
  }

  if (type === 'rect') {
    return setRectCoord(chart, cCoord);
  }

  return chart.coord(type);
};
