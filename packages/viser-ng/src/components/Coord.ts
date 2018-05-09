import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';

@Component({
  selector: 'v-coord',
  template: `<div #chartDom></div>`,
})

class Coord extends Chart {
  @Input() public type?: 'polar' | 'theta' | 'helix' | 'rect';
  @Input() public direction?: string;
  @Input() public radius?: number;
  @Input() public innerRadius?: number;
  @Input() public startAngle?: number;
  @Input() public endAngle?: number;
}

export { Coord };
