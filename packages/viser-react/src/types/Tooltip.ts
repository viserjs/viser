import * as Style from './Style';

interface ICrosshairs {
  type?: 'rect' | 'x' | 'y' | 'cross',
  style?: Style.ILineStyle;
}

interface Tooltip {
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

export default Tooltip;
