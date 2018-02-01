import IAxis from './IAxis';
import ICoord from './ICoord';
import IGuide from './IGuide';
import ISeries from './ISeries';
import ITooltip from './ITooltip';
import IScale from './IScale';

export interface IView {
  data?: any;
  viewId?: string;
  dataView?: any;
  coord?: ICoord;
  scale?: IScale;
  axis?: IAxis;
  guide?: IGuide;
  series?: ISeries;
  tooltip?: ITooltip;
  start?: any;
  end?: any;
}

type IViewConfig = IView | IView[];

export default IViewConfig;
