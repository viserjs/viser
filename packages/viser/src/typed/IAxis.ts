import * as IStyle from './IStyle';

type formatterFunc = (val: number) => string | number;

interface ITitle {
  autoRotate?: boolean;
  offset?: number;
  position?: string;
  TextStyle?: IStyle.ITextStyle;
}

interface IAxisTick {
  ticks?: number[];
  tickCount?: number;
  tickInterval?: number;
}

interface IAxisGrid {
  align?: string;
  type?: string;
  lineStyle?: IStyle.ILineStyle;
  alternateColor?: string | string[];
}

interface IAxisLabel {
  offset?: number;
  formatter?: string | formatterFunc;
  autoRotate?: boolean;
  rotate?: number | string;
  textStyle?: IStyle.ITextStyle;
}

export interface IAxis {
  dataKey?: string;
  position?: string;
  title?: ITitle;
  tick?: IAxisTick;
  subTick?: IAxisTick;
  grid?: IAxisGrid;
  label?: boolean | IAxisLabel;
  line?: IStyle.ILineStyle;
  tickLine?: IStyle.ILineStyle;
  subTickCount?: number;
  subTickLine?: IStyle.ILineStyle;
}

type IAxisConfig = boolean | IAxis | IAxis[];

export default IAxisConfig;
