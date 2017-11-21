import * as Style from './Style';

type formatterFunc = (val: number) => string | number;

interface ITitle {
  autoRotate: boolean;
  offset: number;
  position: 'start' | 'center' | 'end';
  TextStyle: Style.ITextStyle;
}

interface IAxisTick {
  ticks: number[];
  tickCount: number;
  tickInterval: number;
}

interface IAxisGrid {
  align: string;
  type: 'line' | 'polygon';
  lineStyle: Style.ILineStyle;
  alternateColor: string | string[];
}

interface IAxisLabels {
  offset: number;
  formatter: string | formatterFunc;
  autoRotate: boolean;
  rotate: number | string;
  textStyle: Style.ITextStyle;
}

export interface IAxis {
  dataKey?: string;
  position?: string | 'start' | 'center' | 'end';
  title?: ITitle;
  tick?: IAxisTick;
  subTick?: IAxisTick;
  grid?: IAxisGrid;
  labels?: IAxisLabels;
  line?: Style.ILineStyle;
  tickLine?: Style.ILineStyle;
}

type IAxisProp = boolean & IAxis & IAxis[];

export default IAxisProp;
