import * as IStyle from './IStyle';

type eventFunc = (ev: any, chart: any) => void;

export interface ITooltip {
  offsetX?: number;
  offsetY?: number;
  items?: object[];
  show?: boolean;
  triggerOn?: string | string[];
  triggerOff?: string | string[];
  showTitle?: boolean;
  showCrosshairs?: boolean;
  crosshairsStyle?: IStyle.ILineStyle;
  showTooltipMarker?: boolean;
  background?: any;
  titleStyle?: IStyle.ITextStyle;
  nameStyle?: IStyle.ITextStyle;
  valueStyle?: IStyle.ITextStyle;
  showItemMarker?: boolean;
  itemMarkerStyle?: any;
  custom?: boolean;
  onShow?: eventFunc;
  onHide?: eventFunc;
  onChange?: eventFunc;
}

type ITooltipConfig = boolean | ITooltip;

export default ITooltipConfig;
