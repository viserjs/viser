import * as IStyle from './Style';
import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';

type formatterFunc = (val: string | number) => string | number;
type eventFunc = (ev: any, chart: any) => void;

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
  @Input() onTitleMouseDown?: eventFunc;
  @Input() onTitleMouseMove?: eventFunc;
  @Input() onTitleMouseLeave?: eventFunc;
  @Input() onTitleMouseUp?: eventFunc;
  @Input() onTitleClick?: eventFunc;
  @Input() onTitleDbClick?: eventFunc;
  @Input() onTitleTouchStart?: eventFunc;
  @Input() onTitleTouchMove?: eventFunc;
  @Input() onTitleTouchEnd?: eventFunc;
  @Input() onLabelMouseDown?: eventFunc;
  @Input() onLabelMouseMove?: eventFunc;
  @Input() onLabelMouseLeave?: eventFunc;
  @Input() onLabelMouseUp?: eventFunc;
  @Input() onLabelClick?: eventFunc;
  @Input() onLabelDbClick?: eventFunc;
  @Input() onLabelTouchStart?: eventFunc;
  @Input() onLabelTouchMove?: eventFunc;
  @Input() onLabelTouchEnd?: eventFunc;
  @Input() onTicksMouseDown?: eventFunc;
  @Input() onTicksMouseMove?: eventFunc;
  @Input() onTicksMouseLeave?: eventFunc;
  @Input() onTicksMouseUp?: eventFunc;
  @Input() onTicksClick?: eventFunc;
  @Input() onTicksDbClick?: eventFunc;
  @Input() onTicksTouchStart?: eventFunc;
  @Input() onTicksTouchMove?: eventFunc;
  @Input() onTicksTouchEnd?: eventFunc;
  @Input() onLineMouseDown?: eventFunc;
  @Input() onLineMouseMove?: eventFunc;
  @Input() onLineMouseLeave?: eventFunc;
  @Input() onLineMouseUp?: eventFunc;
  @Input() onLineClick?: eventFunc;
  @Input() onLineDbClick?: eventFunc;
  @Input() onLineTouchStart?: eventFunc;
  @Input() onLineTouchMove?: eventFunc;
  @Input() onLineTouchEnd?: eventFunc;
  @Input() onGridMouseDown?: eventFunc;
  @Input() onGridMouseMove?: eventFunc;
  @Input() onGridMouseLeave?: eventFunc;
  @Input() onGridMouseUp?: eventFunc;
  @Input() onGridClick?: eventFunc;
  @Input() onGridDbClick?: eventFunc;
  @Input() onGridTouchStart?: eventFunc;
  @Input() onGridTouchMove?: eventFunc;
  @Input() onGridTouchEnd?: eventFunc;
}

export { Axis };
