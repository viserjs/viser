import { Component, Input } from '@angular/core';
import { Chart } from '../component';

@Component({
  selector: 'Coord',
  template: `<div #chartDom></div>`,
})

class Coord extends Chart {
  @Input() type?: 'polar' | 'theta' | 'helix' | 'rect';
  @Input() direction?: string;
  @Input() radius?: number;
  @Input() innerRadius?: number;
  @Input() startAngle?: number;
  @Input() endAngle?: number;
}

export default Coord;
