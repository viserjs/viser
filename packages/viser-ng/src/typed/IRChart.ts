import { IChart, ICoord, IDataPre, IScale } from 'viser';

interface ISChartProps {
  data?: any;
  viewId?: string;
  dataView?: string;
  coord?: ICoord;
  dataPre?: IDataPre;
  scale?: IScale;
}

type IRChart = IChart & ISChartProps;

export default IRChart;
