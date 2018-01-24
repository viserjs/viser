import { NgModule, enableProdMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginComponent } from './plugins/Plugin';
import { Slider } from './plugins/Slider';
import { Chart } from './Chart';
import { LiteChart } from './LiteChart';
import { Axis, Brush, Coord, Facet, Guide, Legend, Tooltip, View, FacetView, Series, Pie, Sector, Line, SmoothLine, DashLine, Area, StackArea, SmoothArea,
 Bar, StackBar, DodgeBar, Point, Funnel, Pyramid, Schema, Box, Candle, Polygon, Contour, Heatmap, Edge, Sankey, ErrorBar, JitterPoint, StackInterval, DodgeInterval, Interval } from './components/index';
import * as viser from 'viser';


@NgModule({
  imports: [CommonModule],
  declarations: [
    Chart,
    LiteChart,
    Axis,
    Brush,
    Coord,
    Facet,
    Guide,
    Legend,
    Tooltip,
    View,
    FacetView,
    Series,
    Pie,
    Sector,
    Line,
    SmoothLine,
    DashLine,
    Area,
    StackArea,
    SmoothArea,
    Bar,
    StackBar,
    DodgeBar,
    Point,
    Funnel,
    Pyramid,
    Schema,
    Box,
    Candle,
    Polygon,
    Contour,
    Heatmap,
    Edge,
    Sankey,
    ErrorBar,
    JitterPoint,
    StackInterval,
    DodgeInterval,
    Interval,
    PluginComponent,
    Slider,
  ],
  exports: [
    Chart,
    LiteChart,
    Axis,
    Brush,
    Coord,
    Facet,
    Guide,
    Legend,
    Tooltip,
    View,
    FacetView,
    Series,
    Pie,
    Sector,
    Line,
    SmoothLine,
    DashLine,
    Area,
    StackArea,
    SmoothArea,
    Bar,
    StackBar,
    DodgeBar,
    Point,
    Funnel,
    Pyramid,
    Schema,
    Box,
    Candle,
    Polygon,
    Contour,
    Heatmap,
    Edge,
    Sankey,
    ErrorBar,
    JitterPoint,
    StackInterval,
    DodgeInterval,
    Interval,
    PluginComponent,
    Slider,
  ],
})
export class ViserModule {
}
enableProdMode();
export const registerAnimation = viser.registerAnimation;
export const registerShape = viser.registerShape;
export const Global = viser.Global;
