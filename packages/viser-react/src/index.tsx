import * as React from 'react';
import * as PropTypes from 'prop-types';
import SubComponent from './SubComponent';

export { default as Chart } from './Chart';
export { default as View } from './View';
export { default as FacetView } from './FacetView';
export { default as Facet } from './Facet';
export class Coord extends SubComponent { displayName = 'Coord'; }
export class Tooltip extends SubComponent { displayName = 'Tooltip'; }
export class Legend extends SubComponent { displayName = 'Legend'; }
export class Guide extends SubComponent { displayName = 'Guide'; }
export class Series extends SubComponent { displayName = 'Series'; }
export class Axis extends SubComponent { displayName = 'Axis'; }

export class Line extends SubComponent { displayName = 'Line'; }
export class Pie extends SubComponent { displayName = 'Pie'; }
export class Sector extends SubComponent { displayName = 'Sector'; }
export class SmoothLine extends SubComponent { displayName = 'SmoothLine'; }
export class DashLine extends SubComponent { displayName = 'DashLine'; }
export class Area extends SubComponent { displayName = 'Area'; }
export class StackArea extends SubComponent { displayName = 'StackArea'; }
export class SmoothArea extends SubComponent { displayName = 'SmoothArea'; }
export class Bar extends SubComponent { displayName = 'Bar'; }
export class StackBar extends SubComponent { displayName = 'StackBar'; }
export class DodgeBar extends SubComponent { displayName = 'DodgeBar'; }
export class Point extends SubComponent { displayName = 'Point'; }
export class Waterfall extends SubComponent { displayName = 'Waterfall'; }
export class Funnel extends SubComponent { displayName = 'Funnel'; }
export class Pyramid extends SubComponent { displayName = 'Pyramid'; }
export class RadialBar extends SubComponent { displayName = 'RadialBar'; }
export class Schema extends SubComponent { displayName = 'Schema'; }
export class Box extends SubComponent { displayName = 'Box'; }
export class Candle extends SubComponent { displayName = 'Candle'; }
export class Polygon extends SubComponent { displayName = 'Polygon'; }
export class Contour extends SubComponent { displayName = 'Contour'; }
export class Heatmap extends SubComponent { displayName = 'Heatmap'; }
export class Edge extends SubComponent { displayName = 'Edge'; }
