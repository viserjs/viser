import * as Style from './Style';

interface ICrosshairs {
  type?: 'rect' | 'x' | 'y' | 'cross',
  style?: Style.ILineStyle;
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

type ITooltipProps = boolean & ITooltip;

export default ITooltipProps;
