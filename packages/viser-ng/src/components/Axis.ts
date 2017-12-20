import * as IStyle from './Style';
import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';

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
  rotate?: number | 'normal' | 'parallel';
  textStyle?: IStyle.ITextStyle;
}

@Component({
  selector: 'v-axis',
  template: `<div #chartDom></div>`,
})

class Axis extends Chart {
  @Input() dataKey?: string;
  @Input() show?: boolean;
  @Input() position?: string;
  @Input() title?: ITitle;
  @Input() tick?: IAxisTick;
  @Input() subTick?: IAxisTick;
  @Input() grid?: IAxisGrid;
  @Input() zIndex?: number;
  @Input() label?: boolean | IAxisLabel;
  @Input() line?: IStyle.ILineStyle;
  @Input() tickLine?: IStyle.ILineStyle;
  @Input() subTickCount?: number;
  @Input() subTickLine?: IStyle.ILineStyle;
  @Input() autoPaint?: boolean;
  @Input() onMouseDown?: eventFunc;
  @Input() onMouseMove?: eventFunc;
  @Input() onMouseLeave?: eventFunc;
  @Input() onMouseUp?: eventFunc;
  @Input() onClick?: eventFunc;
  @Input() onDbClick?: eventFunc;
  @Input() onTouchStart?: eventFunc;
  @Input() onTouchMove?: eventFunc;
  @Input() onTouchEnd?: eventFunc;
}

export default Axis;
