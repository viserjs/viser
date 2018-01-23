
import * as Style from './Style';
import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';

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
  @Input() type?: 'line' | 'text' | 'image' | 'region' | 'arc';
  @Input() top?: boolean;
  @Input() zIndex?: number;
  @Input() start?: object | (number | string)[] | func;
  @Input() end?: object | (number | string)[] | func;
  @Input() position?: object | (number | string)[] | func;
  @Input() lineStyle?: Style.ILineStyle;
  @Input() content?: string;
  @Input() style?: object | Style.ITextStyle | IRegionStyle;
  @Input() text: ILineText;
  @Input() src?: string;
  @Input() width?: number;
  @Input() height?: number;
  @Input() offsetX?: number;
  @Input() offsetY?: number;
  @Input() alignX?: 'left' | 'middle' | 'right';
  @Input() alignY?: 'top' | 'middle' | 'bottom';
  @Input() html?: string;
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

export { Guide };
