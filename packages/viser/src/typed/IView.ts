import IAxis from './IAxis';
import ICoord from './ICoord';
import IGuide from './IGuide';
import IScale from './IScale';
import ISeries from './ISeries';
import ITooltip from './ITooltip';

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
