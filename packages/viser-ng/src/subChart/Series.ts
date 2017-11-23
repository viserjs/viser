import * as Style from './Style';
import { Component, Input } from '@angular/core';
import { Chart } from '../component';

type func = () => void;

interface ILabelSeries {
  dataKey?: string;
  offset?: number;
  textStyle?: Style.ITextStyle;
  callback?: func;
}

interface ITooltipSeries {
  dataKey?: string;
  callback?: func;
}

@Component({
  selector: 'Series',
  template: `<div #chartDom></div>`,
})
class Series extends Chart {
  @Input() position?: string | string[];
  @Input() quickType?: string;
  @Input() gemo?: string;
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

export default Series;
