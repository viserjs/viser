type eventFunc = (ev: any, chart: any) => void;

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
  onDblClick?: eventFunc;
  onTouchStart?: eventFunc;
  onTouchMove?: eventFunc;
  onTouchEnd?: eventFunc;
  onLabelMouseDown?: eventFunc;
  onLabelMouseMove?: eventFunc;
  onLabelMouseLeave?: eventFunc;
  onLabelMouseUp?: eventFunc;
  onLabelClick?: eventFunc;
  onLabelDblClick?: eventFunc;
  onLableTouchStart?: eventFunc;
  onLabelTouchMove?: eventFunc;
  onLabelTouchEnd?: eventFunc;
}

type ISeriesConfig = ISeries | ISeries[];

export default ISeriesConfig;
