import * as IStyle from './Style';
import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';

type eventFunc = (ev: any, chart: any) => void;

type triggerType = 'mousemove' | 'click' | 'none';

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
  @Input() show?: boolean;

  @Input() triggerOn?: triggerType;
  @Input() showTitle?: boolean;
  @Input() title?: string;
  @Input() crosshairs?: boolean | ICrosshairs;
  @Input() offset?: number;
  @Input() inPlot?: boolean;
  @Input() follow?: boolean;
  @Input() shared?: boolean;
  @Input() enterable?: boolean;
  @Input() position?: string;
  @Input() hideMarkers?: boolean;
  @Input() containerTpl?: string;
  @Input() itemTpl?: string;
  @Input() g2Tooltip?: any;
  @Input() g2TooltipTitle?: any;
  @Input() g2TooltipList?: any;
  @Input() g2TooltipListItem?: any;
  @Input() g2TooltipMarker?: any;

  @Input() onShow?: eventFunc;
  @Input() onHide?: eventFunc;
  @Input() onChange?: eventFunc;

  @Input() defaultPoint?: any;

  // Deprecated
  @Input() timeStamp?: number;
  @Input() plotRange?: object;
}

export { Tooltip };
