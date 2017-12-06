import * as Style from './Style';
import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';

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

@Component({
  selector: 'v-axis',
  template: `<div #chartDom></div>`,
})

class Axis extends Chart {
  @Input() dataKey?: string;
  @Input() position?: string | 'start' | 'center' | 'end';
  @Input() title?: null | ITitle;
  @Input() tick?: null | IAxisTick;
  @Input() subTick?: null | IAxisTick;
  @Input() grid?: null | IAxisGrid;
  @Input() labels?: null | IAxisLabels;
  @Input() line?: null | Style.ILineStyle;
  @Input() tickLine?: null | Style.ILineStyle;
}

export default Axis;
