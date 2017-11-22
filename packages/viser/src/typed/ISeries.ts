import * as IStyle from './IStyle';

type func = () => void;

interface ILabelSeries {
  dataKey?: string;
  offset?: number;
  textStyle?: IStyle.ITextStyle;
  callback?: func;
}

interface ITooltipSeries {
  dataKey?: string;
  callback?: func;
}

export interface ISeries {
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
  style?: any;
  select?: boolean;
}

type ISeriesConfig = ISeries | ISeries[];

export default ISeriesConfig;
