import IChart from './IChart';
import ILegend from './ILegend';
import ICoord from './ICoord';
import ISeries from './ISeries';
import IAxis from './IAxis';
import IGuide from './IGuide';
import ITooltip from './ITooltip';
import IScale from './IScale';

interface ISMain {
  data?: any;
  chart?: IChart;
  legend?: ILegend;
  coord?: ICoord;
  series?: ISeries;
  tooltip?: ITooltip;
  scale?: IScale;
  axis?: IAxis;
  guide?: IGuide;
}

type IMainConfig = ISMain;

export default IMainConfig;
