

interface ISliderConfig {
  xAxis: string,
  yAxis: string,
  data: any[],
  container?: any,
  width?: number | string,
  height?: number | string,
  padding?: number | number[],
  start?: string,
  end?: string,
  minSpan?: number,
  maxSpan?: number,
  scales?: any,
  backgroundChart?: any,
  onChange?: (opts: any) => {},
}

export default ISliderConfig;
