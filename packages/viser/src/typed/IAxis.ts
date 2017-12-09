import * as IStyle from './IStyle';

type formatterFunc = (val: number) => string | number;
type eventFunc = (ev: any) => void;

interface ITitle {
  autoRotate?: boolean;
  offset?: number;
  position?: string;
  textStyle?: IStyle.ITextStyle;
}

interface IAxisTick {
  ticks?: number[];
  tickCount?: number;
  tickInterval?: number;
}

interface IAxisGrid {
  zIndex?: number;
  type?: string;
  align?: string;
  lineStyle?: IStyle.ILineStyle;
  items: object[];
  alternateColor?: string | string[];
  matrix?: any;
  hideFirstLine?: boolean;
  hideLastLine?: boolean;
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
  autoPaint?: boolean;
  onMouseDown?: eventFunc;
  onMouseMove?: eventFunc;
  onMouseLeave?: eventFunc;
  onMouseUp?: eventFunc;
  onClick?: eventFunc;
  onDbClick?: eventFunc;
  onTouchStart?: eventFunc;
  onTouchMove?: eventFunc;
  onTouchEnd?: eventFunc;
}

type IAxisConfig = boolean | IAxis | IAxis[];

export default IAxisConfig;
