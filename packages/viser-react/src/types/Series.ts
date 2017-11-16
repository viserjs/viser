import * as Style from './Style';

type func = () => void;

interface ILabelSeries {
  dataKey?: string;
  offset?: number;
  textStyle?: Style.ITextStyle;
  callback?: func;
}

interface ITooltipSeries {
  dataKey?: string;
  callback?: func;
}

interface Series {
  position?: string | string[];
  quickType?: string;
  gemo?: string;
  adjust?: string;
  color?: string;
  shape?: string;
  size?: number;
  opacity?: number;
  label?: string | ILabelSeries;
  tooltip?: boolean | string | ITooltipSeries;
  style?: object;
}

export default Series;
