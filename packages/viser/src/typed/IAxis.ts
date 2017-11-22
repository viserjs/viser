import * as IStyle from './IStyle';

type formatterFunc = (val: number) => string | number;

interface ITitle {
  autoRotate: boolean;
  offset: number;
  position: 'start' | 'center' | 'end';
  TextStyle: IStyle.ITextStyle;
}

interface IAxisTick {
  ticks: number[];
  tickCount: number;
  tickInterval: number;
}

interface IAxisGrid {
  align: string;
  type: 'line' | 'polygon';
  lineStyle: IStyle.ILineStyle;
  alternateColor: string | string[];
}

interface IAxisLabels {
  offset: number;
  formatter: string | formatterFunc;
  autoRotate: boolean;
  rotate: number | string;
  textStyle: IStyle.ITextStyle;
}

export interface IAxis {
  dataKey?: string;
  position?: string | 'start' | 'center' | 'end';
  title?: ITitle;
  tick?: IAxisTick;
  subTick?: IAxisTick;
  grid?: IAxisGrid;
  labels?: IAxisLabels;
  line?: IStyle.ILineStyle;
  tickLine?: IStyle.ILineStyle;
}

type IAxisConfig = boolean | IAxis | IAxis[];

export default IAxisConfig;
