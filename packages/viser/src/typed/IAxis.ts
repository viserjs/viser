import * as IStyle from './IStyle';

type formatterFunc = (val: string | number) => string | number;
type eventFunc = (ev: any, chart: any) => void;

interface ITitle {
  autoRotate?: boolean;
  offset?: number;
  position?: string;
  textStyle?: IStyle.ITextStyle;
  text?: string;
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
  line?: IStyle.ILineStyle;
  items?: object[];
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
  show?: boolean;
  position?: string;
  title?: ITitle;
  tick?: IAxisTick;
  subTick?: IAxisTick;
  grid?: IAxisGrid;
  zIndex?: number;
  label?: boolean | IAxisLabel;
  line?: IStyle.ILineStyle;
  tickLine?: IStyle.ILineStyle;
  subTickCount?: number;
  subTickLine?: IStyle.ILineStyle;
  autoPaint?: boolean;
  onTitleMouseDown?: eventFunc;
  onTitleMouseMove?: eventFunc;
  onTitleMouseLeave?: eventFunc;
  onTitleMouseUp?: eventFunc;
  onTitleClick?: eventFunc;
  onTitleDbClick?: eventFunc;
  onTitleTouchStart?: eventFunc;
  onTitleTouchMove?: eventFunc;
  onTitleTouchEnd?: eventFunc;
  onLabelMouseDown?: eventFunc;
  onLabelMouseMove?: eventFunc;
  onLabelMouseLeave?: eventFunc;
  onLabelMouseUp?: eventFunc;
  onLabelClick?: eventFunc;
  onLabelDbClick?: eventFunc;
  onLabelTouchStart?: eventFunc;
  onLabelTouchMove?: eventFunc;
  onLabelTouchEnd?: eventFunc;
  onTicksMouseDown?: eventFunc;
  onTicksMouseMove?: eventFunc;
  onTicksMouseLeave?: eventFunc;
  onTicksMouseUp?: eventFunc;
  onTicksClick?: eventFunc;
  onTicksDbClick?: eventFunc;
  onTicksTouchStart?: eventFunc;
  onTicksTouchMove?: eventFunc;
  onTicksTouchEnd?: eventFunc;
  onLineMouseDown?: eventFunc;
  onLineMouseMove?: eventFunc;
  onLineMouseLeave?: eventFunc;
  onLineMouseUp?: eventFunc;
  onLineClick?: eventFunc;
  onLineDbClick?: eventFunc;
  onLineTouchStart?: eventFunc;
  onLineTouchMove?: eventFunc;
  onLineTouchEnd?: eventFunc;
  onGridMouseDown?: eventFunc;
  onGridMouseMove?: eventFunc;
  onGridMouseLeave?: eventFunc;
  onGridMouseUp?: eventFunc;
  onGridClick?: eventFunc;
  onGridDbClick?: eventFunc;
  onGridTouchStart?: eventFunc;
  onGridTouchMove?: eventFunc;
  onGridTouchEnd?: eventFunc;
}

type IAxisConfig = boolean | IAxis | IAxis[];

export default IAxisConfig;
