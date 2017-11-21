import CommonChart from './core/CommonChart';
import IAxisProps, { IAxis } from './typed/Axis';
import IChartProps from './typed/Chart';
import ICoordProps, { IPolarCoord, IRectCoord } from './typed/Coord';
import IDataMappingProps, { IDataMapping } from './typed/DataMapping';
import IDataPreProps from './typed/DataPre';
import IFacetProps from './typed/Facet';
import IGuideProps, { IGuide, ILineGuide, ITextGuide, IImageGuide, IRegionGuide, IArcGuide } from './typed/Guide';
import ILegendProps, { ILegend } from './typed/Legend';
import ISeriesProps, { ISeries } from './typed/Series';
import ITooltipProps, { ITooltip } from './typed/Tooltip';
import IViewProps, { IView } from './typed/View';
import IMainProps  from './typed/Main';

export {
  IAxis,
  IAxisProps,
  IChartProps,
  ICoordProps,
  IRectCoord,
  IPolarCoord,
  IDataMapping,
  IDataMappingProps,
  IDataPreProps,
  IFacetProps,
  IGuide,
  IGuideProps,
  ILineGuide,
  ITextGuide,
  IImageGuide,
  IRegionGuide,
  IArcGuide,
  ILegend,
  ILegendProps,
  ISeries,
  ISeriesProps,
  ITooltip,
  ITooltipProps,
  IView,
  IViewProps,
  IMainProps,
};

export default function(config: any) {
  const commonChart = new CommonChart(config);
  commonChart.render();

  return commonChart;
}
