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
  rotate: number | 'normal' | 'parallel';
  textStyle: Style.ITextStyle;
}

interface Axis {
  dataKey?: string;
  position?: string | 'start' | 'center' | 'end';
  title?: null | ITitle;
  tick?: null | IAxisTick;
  subTick?: null | IAxisTick;
  grid?: null | IAxisGrid;
  labels?: null | IAxisLabels;
  line?: null | Style.ILineStyle;
  tickLine?: null | Style.ILineStyle;
}

export default Axis;
