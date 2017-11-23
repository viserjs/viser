import * as Style from './Style';
import { NgModule, Component, Input } from '@angular/core';
import { Chart } from '../component';

type func = () => void;
type formatterFunc = (val: number) => string | number;

interface IBackground {
  stroke: string;
  strokeOpacity: number;
  lineWidth: number;
  fill: string;
  fillOpactiy: number;
  radius: number
}

@Component({
  selector: 'Legend',
  template: `<div #chartDom></div>`,
})

class Legend extends Chart {
  @Input() dataKey?: string;
  @Input() position?: 'top' | 'right' | 'bottom' | 'left';
  @Input() title?: null | object;
  @Input() offsetX?: number;
  @Input() offsetY?: number;
  @Input() itemGap?: number;
  @Input() itemMarginBottom?: number;
  @Input() itemWidth?: number;
  @Input() unCheckColor?: string;
  @Input() background?: object | any;
  @Input() allowAllCanceled?: boolean;
  @Input() itemFormatter?: formatterFunc;
  @Input() marker?: string | func;
  @Input() textStyle?: Style.ITextStyle;
  @Input() clickable?: boolean;
  @Input() hoverable?: boolean;
  @Input() selectedMode?: 'single' | 'multiple';
  @Input() onHover?: func;
  @Input() onClick?: func;
}

export default Legend;
