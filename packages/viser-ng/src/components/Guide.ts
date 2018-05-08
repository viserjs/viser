
import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';
import * as Style from './Style';

type func = () => void;
type eventFunc = (ev: any, chart: any) => void;

interface ILineText {
  position?: string | number;
  autoRotate?: number;
  style?: Style.ILineStyle;
  content?: string;
  offsetX?: number;
  offsetY?: number;
}

interface IRegionStyle {
  lineWidth?: number;
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
}

@Component({
  selector: 'v-guide',
  template: `<div #chartDom></div>`,
})
class Guide extends Chart {
  @Input() public type?: 'line' | 'text' | 'image' | 'region' | 'arc';
  @Input() public top?: boolean;
  @Input() public zIndex?: number;
  @Input() public start?: object | Array<number | string> | func;
  @Input() public end?: object | Array<number | string> | func;
  @Input() public position?: object | Array<number | string> | func;
  @Input() public lineStyle?: Style.ILineStyle;
  @Input() public content?: string;
  @Input() public style?: object | Style.ITextStyle | IRegionStyle;
  @Input() public text?: ILineText;
  @Input() public src?: string;
  @Input() public width?: number;
  @Input() public height?: number;
  @Input() public offsetX?: number;
  @Input() public offsetY?: number;
  @Input() public alignX?: string;
  @Input() public alignY?: string;
  @Input() public html?: string;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDbClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

export { Guide };
