import IAxis from './IAxis';
import IChart from './IChart';
import ICoord from './ICoord';
import IGuide from './IGuide';
import ILegend from './ILegend';
import IScale from './IScale';
import ISeries from './ISeries';
import ITooltip from './ITooltip';

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
