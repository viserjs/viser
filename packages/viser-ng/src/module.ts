import { NgModule } from '@angular/core';
import { Chart } from './Chart';
import { LiteChart } from './LiteChart';
import { Axis, Coord, Facet, Guide, Legend, Series, Tooltip, View, Pie, StackBar, FacetView, Point } from './subChart/index';

@NgModule({
  declarations: [
    Chart,
    LiteChart,
    Axis,
    Coord,
    Facet,
    Guide,
    Legend,
    Series,
    Tooltip,
    View,
    Pie,
    StackBar,
    FacetView,
    Point
  ],
  exports: [
    Chart,
    LiteChart,
    Axis,
    Coord,
    Facet,
    Guide,
    Legend,
    Series,
    Tooltip,
    View,
    Pie,
    StackBar,
    FacetView,
    Point
  ]
})

export class ViserModule {
}
