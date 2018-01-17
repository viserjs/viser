import * as IStyle from './Style';
import { NgModule, Component, Input } from '@angular/core';
import { Chart } from '../Chart';

type func = () => void;
type formatterFunc = (val: number) => string | number;
type eventFunc = (ev: any, chart: any) => void;

interface IBackground {
  stroke?: string;
  strokeOpacity?: number;
  lineWidth?: number;
  fill?: string;
  fillOpactiy?: number;
  radius?: number;
}

@Component({
  selector: 'v-legend',
  template: `<div #chartDom></div>`,
})
class Legend extends Chart {
  @Input() dataKey?: string;
  @Input() show?: boolean;
  @Input() position?: 'top' | 'right' | 'bottom' | 'left';
  @Input() title?: null | object;
  @Input() offset?: number;
  @Input() offsetX?: number;
  @Input() offsetY?: number;
  @Input() items?: object[];
  @Input() itemGap?: number;
  @Input() titleGap?: number;
  @Input() itemMarginBottom?: number;
  @Input() itemsGroup?: object[];
  @Input() layout?: 'horizontal' | 'vertical';
  @Input() allowAllCanceled?: boolean;
  @Input() backPadding?: number[];
  @Input() itemWidth?: number;
  @Input() unCheckColor?: string;
  @Input() background?: IBackground;
  @Input() itemFormatter?: formatterFunc;
  @Input() marker?: string | func;
  @Input() textStyle?: IStyle.ITextStyle;
  @Input() checkable?: boolean;
  @Input() clickable?: boolean;
  @Input() hoverable?: boolean;
  @Input() useHtml?: boolean;
  @Input() autoWrap?: boolean;
  @Input() autoPosition?: boolean;
  @Input() container?: any;
  @Input() containerTpl?: string;
  @Input() itemTpl?: string | func;
  @Input() selectedMode?: 'single' | 'multiple';
  @Input() reversed?: boolean;
  @Input() specialConfig?: any;
  @Input() onHover?: eventFunc;
  @Input() onClick?: eventFunc;
  @Input() onTitleMouseDown?: eventFunc;
  @Input() onTitleMouseMove?: eventFunc;
  @Input() onTitleMouseLeave?: eventFunc;
  @Input() onTitleMouseUp?: eventFunc;
  @Input() onTitleClick?: eventFunc;
  @Input() onTitleDbClick?: eventFunc;
  @Input() onTitleTouchStart?: eventFunc;
  @Input() onTitleTouchMove?: eventFunc;
  @Input() onTitleTouchEnd?: eventFunc;
  @Input() onItemMouseDown?: eventFunc;
  @Input() onItemMouseMove?: eventFunc;
  @Input() onItemMouseLeave?: eventFunc;
  @Input() onItemMouseUp?: eventFunc;
  @Input() onItemClick?: eventFunc;
  @Input() onItemDbClick?: eventFunc;
  @Input() onItemTouchStart?: eventFunc;
  @Input() onItemTouchMove?: eventFunc;
  @Input() onItemTouchEnd?: eventFunc;
  @Input() onMarkerMouseDown?: eventFunc;
  @Input() onMarkerMouseMove?: eventFunc;
  @Input() onMarkerMouseLeave?: eventFunc;
  @Input() onMarkerMouseUp?: eventFunc;
  @Input() onMarkerClick?: eventFunc;
  @Input() onMarkerDbClick?: eventFunc;
  @Input() onMarkerTouchStart?: eventFunc;
  @Input() onMarkerTouchMove?: eventFunc;
  @Input() onMarkerTouchEnd?: eventFunc;
  @Input() onTextMouseDown?: eventFunc;
  @Input() onTextMouseMove?: eventFunc;
  @Input() onTextMouseLeave?: eventFunc;
  @Input() onTextMouseUp?: eventFunc;
  @Input() onTextClick?: eventFunc;
  @Input() onTextDbClick?: eventFunc;
  @Input() onTextTouchStart?: eventFunc;
  @Input() onTextTouchMove?: eventFunc;
  @Input() onTextTouchEnd?: eventFunc;
}

export default Legend;
