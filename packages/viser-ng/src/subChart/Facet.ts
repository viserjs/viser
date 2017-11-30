import * as Style from './Style';
import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';

interface IColTitleProps {
  offsetY?: number;
  style?: Style.ITextStyle;
}

interface IRowTitleProps {
  offsetX?: number;
  style?: Style.ITextStyle;
}

@Component({
  selector: 'Facet',
  template: `<div #chartDom></div>`,
})
class Facet extends Chart {
  @Input() type: string;
  @Input() fields?: string[];
  @Input() showTitle?: boolean;
  @Input() autoSetAxis?: boolean;
  @Input() padding?: number;
  @Input() colTitle?: IColTitleProps;
  @Input() rowTitle?: IRowTitleProps;
  @Input() eachView?: () => void;
}

export default Facet;
