import IAxis from './IAxis';
import ICoord from './ICoord';
import IGuide from './IGuide';
import ISeries from './ISeries';
import ITooltip from './ITooltip';
import IDataMapping from './IDataMapping';
import IDataPre from './IDataPre';
import IScale from './IScale';

export interface IView {
  data?: any;
  viewId?: string;
  dataView?: string;
  coord?: ICoord;
  dataMapping?: IDataMapping;
  dataPre?: IDataPre;
  scale?: IScale;
  axis?: IAxis;
  guide?: IGuide;
  series?: ISeries;
  tooltip?: ITooltip;
}

type IViewConfig = IView | IView[];

export default IViewConfig;
