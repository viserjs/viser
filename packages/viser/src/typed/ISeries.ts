import * as IStyle from './IStyle';

type func = () => void;

interface ILabelSeries {
  offset?: number;
  textStyle?: IStyle.ITextStyle;
}

export interface ISeries {
  quickType?: string;
  position?: string | string[];
  gemo?: string;
  adjust?: string | string[] | object[];
  color?: string | [string, any];
  shape?: string | [string, any];
  size?: string | number | [string, any];
  opacity?: string | number | [string, func];
  label?: string | [string, ILabelSeries] | [string, func];
  tooltip?: boolean | string | [string, func];
  style?: object | [string, object];
  select?: boolean | [boolean, func];
  active?: boolean;
  animate?: object;
}

type ISeriesConfig = ISeries | ISeries[];

export default ISeriesConfig;
