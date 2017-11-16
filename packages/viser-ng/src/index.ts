import { NgModule, Component } from '@angular/core';
import { Chart } from './component';
const subComponents = ['Coord',
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
 'Edge'
];

@Component({
  selector: 'Coord',
  template: `<div #chartDom></div>`
})
class Coord extends Chart {
}

@Component({
  selector: 'Pie',
  template: `<div #chartDom></div>`
})
class Pie extends Chart {
}

@Component({
  selector: 'Tooltip',
  template: `<div #chartDom></div>`
})
class Tooltip extends Chart {
}

@Component({
  selector: 'Legend',
  template: `<div #chartDom></div>`
})
class Legend extends Chart {
}

@Component({
  selector: 'Axis',
  template: `<div #chartDom></div>`
})
class Axis extends Chart {
}

@NgModule({
  declarations: [
    Chart,
    Coord,
    Pie,
    Tooltip,
    Legend,
    Axis
  ],
  exports: [
    Chart,
    Coord,
    Pie,
    Tooltip,
    Legend,
    Axis
  ]
})

export class ViserModule {
}
