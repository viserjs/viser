import * as IStyle from './IStyle';

export interface ISeries {
  quickType?: string;
  position?: string | string[];
  gemo?: string;
  adjust?: string | string[] | object[];
  color?: any;
  shape?: any;
  size?: any;
  opacity?: any;
  label?: any;
  tooltip?: any;
  style?: any;
  select?: any;
  active?: boolean;
  animate?: object;
}

type ISeriesConfig = ISeries | ISeries[];

export default ISeriesConfig;
