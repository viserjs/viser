import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';
import * as IStyle from './Style';

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
  line?: IStyle.ILineStyle;
  items?: object[];
  alternateColor?: string | string[];
  matrix?: any;
  hideFirstLine?: boolean;
  hideLastLine?: boolean;
}

interface IAxisLabel {
  density: number;
  offset?: number | number[];
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
  @Input() public dataKey?: string;
  @Input() public show?: boolean;
  @Input() public position?: string;
  @Input() public title?: ITitle;
  @Input() public tick?: IAxisTick;
  @Input() public subTick?: IAxisTick;
  @Input() public grid?: IAxisGrid | null;
  @Input() public zIndex?: number;
  @Input() public label?: boolean | IAxisLabel;
  @Input() public line?: IStyle.ILineStyle;
  @Input() public tickLine?: IStyle.ILineStyle;
  @Input() public subTickCount?: number;
  @Input() public subTickLine?: IStyle.ILineStyle;
  @Input() public autoPaint?: boolean;
  @Input() public onTitleMouseDown?: eventFunc;
  @Input() public onTitleMouseMove?: eventFunc;
  @Input() public onTitleMouseLeave?: eventFunc;
  @Input() public onTitleMouseUp?: eventFunc;
  @Input() public onTitleClick?: eventFunc;
  @Input() public onTitleDblClick?: eventFunc;
  @Input() public onTitleTouchStart?: eventFunc;
  @Input() public onTitleTouchMove?: eventFunc;
  @Input() public onTitleTouchEnd?: eventFunc;
  @Input() public onLabelMouseDown?: eventFunc;
  @Input() public onLabelMouseMove?: eventFunc;
  @Input() public onLabelMouseLeave?: eventFunc;
  @Input() public onLabelMouseUp?: eventFunc;
  @Input() public onLabelClick?: eventFunc;
  @Input() public onLabelDblClick?: eventFunc;
  @Input() public onLabelTouchStart?: eventFunc;
  @Input() public onLabelTouchMove?: eventFunc;
  @Input() public onLabelTouchEnd?: eventFunc;
  @Input() public onTicksMouseDown?: eventFunc;
  @Input() public onTicksMouseMove?: eventFunc;
  @Input() public onTicksMouseLeave?: eventFunc;
  @Input() public onTicksMouseUp?: eventFunc;
  @Input() public onTicksClick?: eventFunc;
  @Input() public onTicksDblClick?: eventFunc;
  @Input() public onTicksTouchStart?: eventFunc;
  @Input() public onTicksTouchMove?: eventFunc;
  @Input() public onTicksTouchEnd?: eventFunc;
  @Input() public onLineMouseDown?: eventFunc;
  @Input() public onLineMouseMove?: eventFunc;
  @Input() public onLineMouseLeave?: eventFunc;
  @Input() public onLineMouseUp?: eventFunc;
  @Input() public onLineClick?: eventFunc;
  @Input() public onLineDblClick?: eventFunc;
  @Input() public onLineTouchStart?: eventFunc;
  @Input() public onLineTouchMove?: eventFunc;
  @Input() public onLineTouchEnd?: eventFunc;
  @Input() public onGridMouseDown?: eventFunc;
  @Input() public onGridMouseMove?: eventFunc;
  @Input() public onGridMouseLeave?: eventFunc;
  @Input() public onGridMouseUp?: eventFunc;
  @Input() public onGridClick?: eventFunc;
  @Input() public onGridDblClick?: eventFunc;
  @Input() public onGridTouchStart?: eventFunc;
  @Input() public onGridTouchMove?: eventFunc;
  @Input() public onGridTouchEnd?: eventFunc;
}

export { Axis };
