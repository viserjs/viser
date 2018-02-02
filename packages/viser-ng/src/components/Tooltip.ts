import * as IStyle from './Style';
import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';

type eventFunc = (ev: any, chart: any) => void;

interface ICrosshairs {
  type?: string,
  style?: IStyle.ILineStyle;
}

@Component({
  selector: 'v-tooltip',
  template: `<div #chartDom></div>`,
})
class Tooltip extends Chart {
  @Input() x?: number;
  @Input() y?: number;
  @Input() items?: object[];
  @Input() title?: string;
  @Input() show?: boolean;
  @Input() defaultPoint?: any;
  @Input() showTitle?: boolean;
  @Input() offset?: number;
  @Input() timeStamp?: number;
  @Input() crosshairs?: boolean | ICrosshairs;
  @Input() plotRange?: object;
  @Input() containerTpl?: string;
  @Input() itemTpl?: string;
  @Input() inPlot?: boolean;
  @Input() follow?: boolean;
  @Input() shared?: boolean;
  @Input() enterable?: boolean;
  @Input() position?: string;
  @Input() g2Tooltip?: any;
  @Input() onShow?: eventFunc;
  @Input() onHide?: eventFunc;
  @Input() onChange?: eventFunc;
}

export { Tooltip };
