import { Component, Input, NgModule } from '@angular/core';
import { Chart } from '../Chart';
import * as IStyle from './Style';

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
  @Input() public dataKey?: string;
  @Input() public show?: boolean;
  @Input() public position?: string;
  @Input() public title?: null | object;
  @Input() public custom?: boolean;
  @Input() public offset?: number;
  @Input() public offsetX?: number;
  @Input() public offsetY?: number;
  @Input() public items?: object[];
  @Input() public itemGap?: number;
  @Input() public titleGap?: number;
  @Input() public itemMarginBottom?: number;
  @Input() public itemsGroup?: object[];
  @Input() public layout?: string;
  @Input() public allowAllCanceled?: boolean;
  @Input() public backPadding?: number[];
  @Input() public itemWidth?: number;
  @Input() public unCheckColor?: string;
  @Input() public background?: IBackground;
  @Input() public itemFormatter?: formatterFunc;
  @Input() public marker?: string | func;
  @Input() public textStyle?: IStyle.ITextStyle;
  @Input() public checkable?: boolean;
  @Input() public clickable?: boolean;
  @Input() public hoverable?: boolean;
  @Input() public useHtml?: boolean;
  @Input() public autoWrap?: boolean;
  @Input() public autoPosition?: boolean;
  @Input() public container?: any;
  @Input() public containerTpl?: string;
  @Input() public itemTpl?: string | func;
  @Input() public selectedMode?: string;
  @Input() public reversed?: boolean;
  @Input() public slidable?: boolean;
  @Input() public width?: number;
  @Input() public height?: number;
  @Input() public legendMarker?: any;
  @Input() public legendListItem?: any;
  @Input() public onHover?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onTitleMouseDown?: eventFunc;
  @Input() public onTitleMouseMove?: eventFunc;
  @Input() public onTitleMouseLeave?: eventFunc;
  @Input() public onTitleMouseUp?: eventFunc;
  @Input() public onTitleClick?: eventFunc;
  @Input() public onTitleDbClick?: eventFunc;
  @Input() public onTitleTouchStart?: eventFunc;
  @Input() public onTitleTouchMove?: eventFunc;
  @Input() public onTitleTouchEnd?: eventFunc;
  @Input() public onItemMouseDown?: eventFunc;
  @Input() public onItemMouseMove?: eventFunc;
  @Input() public onItemMouseLeave?: eventFunc;
  @Input() public onItemMouseUp?: eventFunc;
  @Input() public onItemClick?: eventFunc;
  @Input() public onItemDbClick?: eventFunc;
  @Input() public onItemTouchStart?: eventFunc;
  @Input() public onItemTouchMove?: eventFunc;
  @Input() public onItemTouchEnd?: eventFunc;
  @Input() public onMarkerMouseDown?: eventFunc;
  @Input() public onMarkerMouseMove?: eventFunc;
  @Input() public onMarkerMouseLeave?: eventFunc;
  @Input() public onMarkerMouseUp?: eventFunc;
  @Input() public onMarkerClick?: eventFunc;
  @Input() public onMarkerDbClick?: eventFunc;
  @Input() public onMarkerTouchStart?: eventFunc;
  @Input() public onMarkerTouchMove?: eventFunc;
  @Input() public onMarkerTouchEnd?: eventFunc;
  @Input() public onTextMouseDown?: eventFunc;
  @Input() public onTextMouseMove?: eventFunc;
  @Input() public onTextMouseLeave?: eventFunc;
  @Input() public onTextMouseUp?: eventFunc;
  @Input() public onTextClick?: eventFunc;
  @Input() public onTextDbClick?: eventFunc;
  @Input() public onTextTouchStart?: eventFunc;
  @Input() public onTextTouchMove?: eventFunc;
  @Input() public onTextTouchEnd?: eventFunc;
}

export { Legend };
