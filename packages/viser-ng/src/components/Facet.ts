import * as IStyle from './Style';
import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';

interface IColTitleProps {
  offsetY?: number;
  style?: IStyle.ITextStyle;
}

interface IRowTitleProps {
  offsetX?: number;
  style?: IStyle.ITextStyle;
}

@Component({
  selector: 'v-facet',
  template: `<div #chartDom></div>`,
})
class Facet extends Chart {
  @Input() type: string;
  @Input() fields?: string[];
  @Input() cols?: number;
  @Input() rows?: number;
  @Input() colField?: string | string[];
  @Input() rowField?: string | string[];
  @Input() colValue?: number;
  @Input() rowValue?: number;
  @Input() colIndex?: number;
  @Input() rowIndex?: number;
  @Input() showTitle?: boolean;
  @Input() colTitle?: IColTitleProps;
  @Input() rowTitle?: IRowTitleProps;
  @Input() autoSetAxis?: boolean;
  @Input() padding?: number | number[];
  @Input() transpose?: boolean;
  @Input() lineSmooth?: boolean;
  @Input() line?: IStyle.ILineStyle;
  @Input() views?: any;
  @Input() eachView?: (views: any, facet: any) => void;
}

export { Facet };
