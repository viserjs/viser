import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as viser from 'viser';
import { Coord, Tooltip, Legend, Guide, Axis, Series, Line,
 Pie, Sector, SmoothLine, DashLine, Area, StackArea, SmoothArea,
 Bar, StackBar, DodgeBar, Interval, StackInterval, DodgeInterval,
 Point, Funnel, Pyramid, Schema, Box, Candle, Polygon, Contour, Heatmap,
 Edge, Sankey, JitterPoint } from './components/SubComponent';

export const registerAnimation = viser.registerAnimation;
export const registerShape = viser.registerShape;
export const Global = viser.Global;

export { default as Chart } from './components/Chart';
export { default as View } from './components/View';
export { default as FacetView } from './components/FacetView';
export { default as Facet } from './components/Facet';
export { default as LiteChart } from './components/LiteChart';
export {
  Coord, Tooltip, Legend, Guide, Axis, Series, Line,
  Pie, Sector, SmoothLine, DashLine, Area, StackArea, SmoothArea,
  Bar, StackBar, DodgeBar, Interval, StackInterval, DodgeInterval,
  Point, Funnel, Pyramid, Schema, Box, Candle, Polygon, Contour, Heatmap,
  Edge, Sankey, JitterPoint
};
