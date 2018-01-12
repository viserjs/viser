import { IChart, ICoord, IScale } from 'viser';

interface ISChartProps {
  data?: any;
  viewId?: string;
  coord?: ICoord;
  scale?: IScale;
}

type IRChart = IChart & ISChartProps;

export default IRChart;
