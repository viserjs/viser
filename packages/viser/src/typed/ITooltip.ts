import * as IStyle from './IStyle';

type eventFunc = (ev: any, chart: any) => void;

type triggerType = 'mousemove' | 'click' | 'none';

interface ICrosshairs {
  type?: string;
  style?: IStyle.ILineStyle;
}

export interface ITooltip {
  x?: number;
  y?: number;
  items?: object[];
  show?: boolean;

  triggerOn?: triggerType;
  showTitle?: boolean;
  title?: string;
  crosshairs?: boolean | ICrosshairs;
  offset?: number;
  inPlot?: boolean;
  follow?: boolean;
  shared?: boolean;
  enterable?: boolean;
  position?: string;
  hideMarkers?: boolean;
  containerTpl?: string;
  itemTpl?: string;
  g2Tooltip?: any;
  g2TooltipTitle?: any;
  g2TooltipList?: any;
  g2TooltipListItem?: any;
  g2TooltipMarker?: any;

  onShow?: eventFunc;
  onHide?: eventFunc;
  onChange?: eventFunc;

  defaultPoint?: any;

  // Deprecated
  timeStamp?: number;
  plotRange?: object;
}

type ITooltipConfig = boolean | ITooltip;

export default ITooltipConfig;
