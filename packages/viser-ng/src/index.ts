import { NgModule, Component, Input } from '@angular/core';
import { Chart } from './component';
import { LiteChart } from './LiteChart';
import {
  Axis,
  Coord,
  Facet,
  Guide,
  Legend,
  Series,
  Tooltip,
  View
} from './subChart/';
const subComponents = [
 'Coord',
 'Tooltip',
 'Legend',
 'Guide',
 'Series',
 'Axis',
 'Line',
 'Pie',
 'Sector',
 'SmoothLine',
 'DashLine',
 'Area',
 'StackArea',
 'SmoothArea',
 'Bar',
 'StackBar',
 'DodgeBar',
 'Point',
 'Waterfall',
 'Funnel',
 'Pyramid',
 'RadialBar',
 'Schema',
 'Box',
 'Candle',
 'Polygon',
 'Contour',
 'Heatmap',
 'Edge',
 'Facet',
 'FacetView'
];

@Component({
  selector: 'Pie',
  template: `<div #chartDom></div>`,
})
class Pie extends Chart {
}

@Component({
  selector: 'StackBar',
  template: `<div #chartDom></div>`,
})
class StackBar extends Chart {
}

@Component({
  selector: 'FacetView',
  template: `<div #chartDom></div>`,
})
class FacetView extends Chart {
}

@Component({
  selector: 'Point',
  template: `<div #chartDom></div>`,
})
class Point extends Chart {
  @Input() opacity?: any;
  @Input() size?: any;
}

@NgModule({
  declarations: [
    Axis,
    Coord,
    Facet,
    Guide,
    Legend,
    Series,
    Tooltip,
    View,
    Chart,
    Pie,
    StackBar,
    Point,
    FacetView,
    LiteChart
  ],
  exports: [
    Axis,
    Coord,
    Facet,
    Guide,
    Legend,
    Series,
    Tooltip,
    View,
    Chart,
    Pie,
    StackBar,
    Point,
    FacetView,
    LiteChart
  ]
})
export class ViserModule {
}
