import { IChart, ICoord, IScale } from '../../../viser/src';

interface ISChartProps {
  data?: any;
  viewId?: string;
  coord?: ICoord;
  scale?: IScale;
  start?: any;
  end?: any;
}

type IRChart = IChart & ISChartProps;

export default IRChart;
