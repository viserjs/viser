import { IChart, ICoord, IScale } from 'viser';

interface ISChartProps {
  data?: any;
  viewId?: string;
  coord?: ICoord;
  scale?: IScale;
  start?: any;
  end?: any;
}

type IRChart = IChart & ISChartProps;

export { IRChart };
