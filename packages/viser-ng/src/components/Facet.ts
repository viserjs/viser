import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';
import * as IStyle from './Style';

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
  @Input() public type?: string;
  @Input() public fields?: string[];
  @Input() public cols?: number;
  @Input() public rows?: number;
  @Input() public colField?: string | string[];
  @Input() public rowField?: string | string[];
  @Input() public colValue?: number;
  @Input() public rowValue?: number;
  @Input() public colIndex?: number;
  @Input() public rowIndex?: number;
  @Input() public showTitle?: boolean;
  @Input() public colTitle?: IColTitleProps;
  @Input() public rowTitle?: IRowTitleProps;
  @Input() public autoSetAxis?: boolean;
  @Input() public padding?: number | number[];
  @Input() public transpose?: boolean;
  @Input() public lineSmooth?: boolean;
  @Input() public line?: IStyle.ILineStyle;
  @Input() public views?: any;
  @Input() public eachView?: (views: any, facet: any) => void;
}

export { Facet };
