import IViewConfig, { IView } from './IView';
import IChart from './IChart';
import IFacet from './IFacet';
import ILegend from './ILegend';

interface ISMain {
  data?: any;
  viewId?: string;
  chart?: IChart;
  facet?: IFacet;
  legend?: ILegend;
  views?: IViewConfig;
}

type IMainConfig = ISMain & IView;

export default IMainConfig;
