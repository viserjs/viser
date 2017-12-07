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
  @Input() rowField?: string | string[];
  @Input() colField?: string | string[];
  @Input() cols?: number;
  @Input() rows?: number;
  @Input() showTitle?: boolean;
  @Input() colTitle?: IColTitleProps;
  @Input() rowTitle?: IRowTitleProps;
  @Input() autoSetAxis?: boolean;
  @Input() padding?: number | number[];
  @Input() transpose?: boolean;
  @Input() lineSmooth?: boolean;
  @Input() line?: IStyle.ILineStyle;
  @Input() eachView?: (views: any, facet: any) => void;
}

export default Facet;
