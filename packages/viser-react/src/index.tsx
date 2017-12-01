import * as React from 'react';
import * as PropTypes from 'prop-types';
import SubComponent from './components/SubComponent';
import { ICoord, ITooltip, ILegend, IGuide, IAxis, ISeries } from 'viser';

export { default as Chart } from './components/Chart';
export { default as View } from './components/View';
export { default as FacetView } from './components/FacetView';
export { default as Facet } from './components/Facet';
export { default as LiteChart } from './components/LiteChart';

export class Coord extends SubComponent<ICoord> { displayName = 'Coord'; }
export class Tooltip extends SubComponent<ITooltip> { displayName = 'Tooltip'; }
export class Legend extends SubComponent<ILegend> { displayName = 'Legend'; }
export class Guide extends SubComponent<IGuide> { displayName = 'Guide'; }
export class Axis extends SubComponent<IAxis> { displayName = 'Axis'; }

export class Series extends SubComponent<ISeries> { displayName = 'Series'; }
export class Line extends SubComponent<ISeries> { displayName = 'Line'; }
export class Pie extends SubComponent<ISeries> { displayName = 'Pie'; }
export class Sector extends SubComponent<ISeries> { displayName = 'Sector'; }
export class SmoothLine extends SubComponent<ISeries> { displayName = 'SmoothLine'; }
export class DashLine extends SubComponent<ISeries> { displayName = 'DashLine'; }
export class Area extends SubComponent<ISeries> { displayName = 'Area'; }
export class StackArea extends SubComponent<ISeries> { displayName = 'StackArea'; }
export class SmoothArea extends SubComponent<ISeries> { displayName = 'SmoothArea'; }
export class Bar extends SubComponent<ISeries> { displayName = 'Bar'; }
export class StackBar extends SubComponent<ISeries> { displayName = 'StackBar'; }
export class DodgeBar extends SubComponent<ISeries> { displayName = 'DodgeBar'; }
export class Interval extends SubComponent<ISeries> { displayName = 'Interval'; }
export class StackInterval extends SubComponent<ISeries> { displayName = 'StackInterval'; }
export class DodgeInterval extends SubComponent<ISeries> { displayName = 'DodgeInterval'; }
export class Point extends SubComponent<ISeries> { displayName = 'Point'; }
export class Waterfall extends SubComponent<ISeries> { displayName = 'Waterfall'; }
export class Funnel extends SubComponent<ISeries> { displayName = 'Funnel'; }
export class Pyramid extends SubComponent<ISeries> { displayName = 'Pyramid'; }
export class RadialBar extends SubComponent<ISeries> { displayName = 'RadialBar'; }
export class Schema extends SubComponent<ISeries> { displayName = 'Schema'; }
export class Box extends SubComponent<ISeries> { displayName = 'Box'; }
export class Candle extends SubComponent<ISeries> { displayName = 'Candle'; }
export class Polygon extends SubComponent<ISeries> { displayName = 'Polygon'; }
export class Contour extends SubComponent<ISeries> { displayName = 'Contour'; }
export class Heatmap extends SubComponent<ISeries> { displayName = 'Heatmap'; }
export class Edge extends SubComponent<ISeries> { displayName = 'Edge'; }
export class Sankey extends SubComponent<ISeries> { displayName = 'Sankey'; }
