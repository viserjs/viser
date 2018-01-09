import * as IStyle from './IStyle';

type eventFunc = (chart: any, ev: any) => void;

interface ICrosshairs {
  type?: string;
  style?: IStyle.ILineStyle;
}

export interface ITooltip {
  x?: number;
  y?: number;
  items?: object[];
  title?: string;
  show?: boolean;
  showTitle?: boolean;
  offset?: number;
  timeStamp?: number;
  crosshairs?: boolean | ICrosshairs;
  plotRange?: object;
  containerTpl?: string;
  itemTpl?: string;
  inPlot?: boolean;
  follow?: boolean;
  shared?: boolean;
  enterable?: boolean;
  position?: 'left' | 'right' | 'top' | 'bottom';
  g2Tooltip?: any;
  onShow?: eventFunc;
  onHide?: eventFunc;
  onChange?: eventFunc;
}

type ITooltipConfig = boolean | ITooltip;

export default ITooltipConfig;
