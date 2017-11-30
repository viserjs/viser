import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';

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

export {
  Pie,
  StackBar,
  FacetView,
  Point
}
