import IViewProps, { IView } from './View';
import IChartProps from './Chart';
import IFacetProps from './Facet';
import ILegendProps from './Legend';

interface IMain {
  data: any;
  calData?: any;
  viewId?: string;
  chart?: IChartProps;
  facet?: IFacetProps;
  legend?: ILegendProps;
  views?: IViewProps;
}

type IMainProps = IMain & IView;

export default IMainProps;
