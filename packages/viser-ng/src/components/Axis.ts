import * as Style from './Style';
import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';

type formatterFunc = (val: number) => string | number;

interface ITitle {
  autoRotate?: boolean;
  offset?: number;
  position?: 'start' | 'center' | 'end';
  TextStyle?: Style.ITextStyle;
}

interface IAxisTick {
  ticks?: number[];
  tickCount?: number;
  tickInterval?: number;
}

interface IAxisGrid {
  align?: string;
  type?: 'line' | 'polygon';
  lineStyle?: Style.ILineStyle;
  alternateColor?: string | string[];
}

interface IAxisLabel {
  offset?: number;
  formatter?: string | formatterFunc;
  autoRotate?: boolean;
  rotate?: number | 'normal' | 'parallel';
  textStyle?: Style.ITextStyle;
}

@Component({
  selector: 'v-axis',
  template: `<div #chartDom></div>`,
})

class Axis extends Chart {
  @Input() dataKey?: string;
  @Input() position?: string | 'start' | 'center' | 'end';
  @Input() title?: ITitle;
  @Input() tick?: IAxisTick;
  @Input() subTick?: IAxisTick;
  @Input() grid?: IAxisGrid;
  @Input() label?: boolean | IAxisLabel;
  @Input() line?: Style.ILineStyle;
  @Input() tickLine?: Style.ILineStyle;
}

export default Axis;
