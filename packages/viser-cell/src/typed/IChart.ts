export interface IChart {
  id?: any;
  el?: any;
  height?: number;
  width?: number;
  context?: any;
  animate?: boolean | object;
  pixelRatio?: number;
  plugins?: any;
  padding?: number | object | number[];
}

export default IChart;
