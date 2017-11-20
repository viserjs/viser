import { NgModule, Component } from '@angular/core';
import { Chart } from './component';
import { LiteChart } from './LiteChart';

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
  selector: 'Coord',
  template: `<div #chartDom></div>`,
})
class Coord extends Chart {
}

@Component({
  selector: 'Pie',
  template: `<div #chartDom></div>`,
})
class Pie extends Chart {
}

@Component({
  selector: 'Tooltip',
  template: `<div #chartDom></div>`,
})
class Tooltip extends Chart {
}

@Component({
  selector: 'Legend',
  template: `<div #chartDom></div>`,
})
class Legend extends Chart {
}

@Component({
  selector: 'Axis',
  template: `<div #chartDom></div>`,
})
class Axis extends Chart {
}

@Component({
  selector: 'StackBar',
  template: `<div #chartDom></div>`,
})
class StackBar extends Chart {
}

@Component({
  selector: 'Facet',
  template: `<div #chartDom></div>`,
})
class Facet extends Chart {
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
}

@NgModule({
  declarations: [
    Chart,
    Coord,
    Pie,
    Tooltip,
    StackBar,
    Legend,
    Axis,
    Facet,
    Point,
    FacetView,
    LiteChart
  ],
  exports: [
    Chart,
    Coord,
    Pie,
    StackBar,
    Tooltip,
    Legend,
    Axis,
    Facet,
    Point,
    FacetView,
    LiteChart
  ]
})
export class ViserModule {
}
