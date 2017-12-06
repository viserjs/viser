
import * as Style from './Style';
import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';
type func = () => void;

interface ILineText {
  position?: string | number | 'start' | 'center' | 'end';
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
  @Input() start?: object | number[] | func;
  @Input() end?: object | number[] | func;
  @Input() position: object | number[] | func;
  @Input() lineStyle: Style.ILineStyle;
  @Input() content?: string;
  @Input() style?: object | Style.ITextStyle | IRegionStyle;
  @Input() text: ILineText;
  @Input() src?: string;
  @Input() width?: number;
  @Input() height?: number;
  @Input() offsetX?: number;
  @Input() offsetY?: number;
}

export default Guide;
