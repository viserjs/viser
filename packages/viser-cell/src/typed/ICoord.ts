export interface IRectCoord {
  type?: 'rect';
  transposed?: boolean;
  start?: object;
  end?: object;
  isRect?: boolean;
}

export interface IPolarCoord {
  type?: 'polar';
  radius?: number;
  innerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  isPolar?: boolean;
  transposed?: boolean;
  center?: object;
  circleRadius?: number;
}

type ICoord = IRectCoord | IPolarCoord;

export default ICoord;
