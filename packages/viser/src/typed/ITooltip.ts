import * as IStyle from './IStyle';

interface ICrosshairs {
  type?: 'rect' | 'x' | 'y' | 'cross',
  style?: IStyle.ILineStyle;
}

export interface ITooltip {
  showTitle?: boolean;
  offset?: number;
  crosshairs?: ICrosshairs;
  containerTpl?: string;
  itemTpl?: string;
  inPlot?: boolean;
  follow?: boolean;
  shared?: boolean;
  position?: 'left' | 'right' | 'top' | 'bottom';
}

type ITooltipConfig = boolean | ITooltip;

export default ITooltipConfig;
