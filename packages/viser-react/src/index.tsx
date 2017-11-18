import * as React from 'react';
import * as PropTypes from 'prop-types';
import SubComponent from './components/SubComponent';
import LiteChart from './components/LiteChart';

import { default as SeriesProps } from './types/Series';
import { default as AxisProps } from './types/Axis';
import { default as CoordProps } from './types/Coord';
import { default as TooltipProps } from './types/Tooltip';
import { default as LegendProps } from './types/Legend';
import { default as GuideProps } from './types/Guide';
import { default as LiteProps } from './types/Lite';

export { default as Chart } from './components/Chart';
export { default as View } from './components/View';
export { default as FacetView } from './components/FacetView';
export { default as Facet } from './components/Facet';

export class Coord extends SubComponent<CoordProps> { displayName = 'Coord'; }
export class Tooltip extends SubComponent<TooltipProps> { displayName = 'Tooltip'; }
export class Legend extends SubComponent<LegendProps> { displayName = 'Legend'; }
export class Guide extends SubComponent<GuideProps> { displayName = 'Guide'; }
export class Axis extends SubComponent<AxisProps> { displayName = 'Axis'; }

export class Series extends SubComponent<SeriesProps> { displayName = 'Series'; }
export class Line extends SubComponent<SeriesProps> { displayName = 'Line'; }
export class Pie extends SubComponent<SeriesProps> { displayName = 'Pie'; }
export class Sector extends SubComponent<SeriesProps> { displayName = 'Sector'; }
export class SmoothLine extends SubComponent<SeriesProps> { displayName = 'SmoothLine'; }
export class DashLine extends SubComponent<SeriesProps> { displayName = 'DashLine'; }
export class Area extends SubComponent<SeriesProps> { displayName = 'Area'; }
export class StackArea extends SubComponent<SeriesProps> { displayName = 'StackArea'; }
export class SmoothArea extends SubComponent<SeriesProps> { displayName = 'SmoothArea'; }
export class Bar extends SubComponent<SeriesProps> { displayName = 'Bar'; }
export class StackBar extends SubComponent<SeriesProps> { displayName = 'StackBar'; }
export class DodgeBar extends SubComponent<SeriesProps> { displayName = 'DodgeBar'; }
export class Point extends SubComponent<SeriesProps> { displayName = 'Point'; }
export class Waterfall extends SubComponent<SeriesProps> { displayName = 'Waterfall'; }
export class Funnel extends SubComponent<SeriesProps> { displayName = 'Funnel'; }
export class Pyramid extends SubComponent<SeriesProps> { displayName = 'Pyramid'; }
export class RadialBar extends SubComponent<SeriesProps> { displayName = 'RadialBar'; }
export class Schema extends SubComponent<SeriesProps> { displayName = 'Schema'; }
export class Box extends SubComponent<SeriesProps> { displayName = 'Box'; }
export class Candle extends SubComponent<SeriesProps> { displayName = 'Candle'; }
export class Polygon extends SubComponent<SeriesProps> { displayName = 'Polygon'; }
export class Contour extends SubComponent<SeriesProps> { displayName = 'Contour'; }
export class Heatmap extends SubComponent<SeriesProps> { displayName = 'Heatmap'; }
export class Edge extends SubComponent<SeriesProps> { displayName = 'Edge'; }

export class LineChart extends LiteChart<LiteProps> { displayName = 'Line'; }
export class PieChart extends LiteChart<LiteProps> { displayName = 'Pie'; }
export class SmoothLineChart extends LiteChart<LiteProps> { displayName = 'SmoothLine'; }
export class DashLineChart extends LiteChart<LiteProps> { displayName = 'DashLine'; }
export class AreaChart extends LiteChart<LiteProps> { displayName = 'Area'; }
export class StackBarChart extends LiteChart<LiteProps> { displayName = 'StackBar'; }
export class DodgeBarChart extends LiteChart<LiteProps> { displayName = 'DodgeBar'; }
export class PointChart extends LiteChart<LiteProps> { displayName = 'Point'; }
export class WaterfallChart extends LiteChart<LiteProps> { displayName = 'Waterfall'; }
export class FunnelChart extends LiteChart<LiteProps> { displayName = 'Funnel'; }
export class PyramidChart extends LiteChart<LiteProps> { displayName = 'Pyramid'; }
export class RadialBarChart extends LiteChart<LiteProps> { displayName = 'RadialBar'; }
export class SchemaChart extends LiteChart<LiteProps> { displayName = 'Schema'; }
export class BoxChart extends LiteChart<LiteProps> { displayName = 'Box'; }
export class CandleChart extends LiteChart<LiteProps> { displayName = 'Candle'; }
export class PolygonChart extends LiteChart<LiteProps> { displayName = 'Polygon'; }
export class ContourChart extends LiteChart<LiteProps> { displayName = 'Contour'; }
export class HeatmapChart extends LiteChart<LiteProps> { displayName = 'Heatmap'; }
