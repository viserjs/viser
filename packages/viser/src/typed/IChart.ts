interface IBackground {
  stroke?: string;
  strokeOpacity?: number;
  lineWidth?: number;
  fill?: string;
  fillOpactiy?: number;
  radius?: number
}

export interface IChart {
  id?: any;
  container?: any;
  height: number;
  width?: number;
  animate?: boolean;
  forceFit?: boolean;
  background?: IBackground;
  plotBackground?: IBackground;
  padding?: number | object | number[];
}

export default IChart;
