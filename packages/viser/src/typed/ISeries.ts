import * as IStyle from './IStyle';

type eventFunc = (chart: any, ev: any) => void;

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
  onMouseDown?: eventFunc;
  onMouseMove?: eventFunc;
  onMouseLeave?: eventFunc;
  onMouseUp?: eventFunc;
  onClick?: eventFunc;
  onDbClick?: eventFunc;
  onTouchStart?: eventFunc;
  onTouchMove?: eventFunc;
  onTouchEnd?: eventFunc;
}

type ISeriesConfig = ISeries | ISeries[];

export default ISeriesConfig;
