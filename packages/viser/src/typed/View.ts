import IAxisProps from './Axis';
import ICoordProps from './Coord';
import IGuideProps from './Guide';
import ISeriesProps from './Series';
import ITooltipProps from './Tooltip';
import IDataMappingProps from './DataMapping';
import IDataPreProps from './DataPre';
import IScaleProps from './Scale';

export interface IView {
  data?: any;
  viewId?: string;
  dataView?: string;
  coord?: ICoordProps;
  dataMapping?: IDataMappingProps;
  dataPre?: IDataPreProps;
  scale?: IScaleProps;
  axis?: IAxisProps;
  guide?: IGuideProps;
  series?: ISeriesProps;
  tooltip?: ITooltipProps;
}

type IViewProps = IView & IView[];

export default IViewProps;
