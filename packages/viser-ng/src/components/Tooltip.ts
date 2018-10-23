import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';
import * as IStyle from './Style';

type eventFunc = (ev: any, chart: any) => void;

type triggerType = 'mousemove' | 'click' | 'none';

interface ICrosshairs {
  type?: string;
  style?: IStyle.ILineStyle;
}

@Component({
  selector: 'v-tooltip',
  template: `<div #chartDom></div>`,
})
class Tooltip extends Chart {
  @Input() public x?: number;
  @Input() public y?: number;
  @Input() public items?: object[];
  @Input() public show?: boolean;

  @Input() public triggerOn?: triggerType;
  @Input() public showTitle?: boolean;
  @Input() public title?: string;
  @Input() public crosshairs?: boolean | string | ICrosshairs;
  @Input() public offset?: number;
  @Input() public inPlot?: boolean;
  @Input() public follow?: boolean;
  @Input() public shared?: boolean;
  @Input() public enterable?: boolean;
  @Input() public position?: string;
  @Input() public hideMarkers?: boolean;
  @Input() public containerTpl?: string;
  @Input() public itemTpl?: string;
  @Input() public g2Tooltip?: any;
  @Input() public g2TooltipTitle?: any;
  @Input() public g2TooltipList?: any;
  @Input() public g2TooltipListItem?: any;
  @Input() public g2TooltipMarker?: any;

  @Input() public htmlContent?: any;
  @Input() public useHtml?: boolean;
  @Input() public type?: string;

  @Input() public onShow?: eventFunc;
  @Input() public onHide?: eventFunc;
  @Input() public onChange?: eventFunc;

  @Input() public defaultPoint?: any;

  // Deprecated
  @Input() public timeStamp?: number;
  @Input() public plotRange?: object;
}

export { Tooltip };
