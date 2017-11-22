import { IChart, ICoord, IDataMappingConfig, IDataPre, IScale } from 'viser';

interface ISChartProps {
  data?: any;
  viewId?: string;
  dataView?: string;
  coord?: ICoord;
  dataMapping?: IDataMappingConfig;
  dataPre?: IDataPre;
  scale?: IScale;
}

type IRChart = IChart & ISChartProps;

export default IRChart;
