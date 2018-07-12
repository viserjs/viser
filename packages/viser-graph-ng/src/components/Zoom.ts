import { Component, Input } from '@angular/core';
import { Graph } from './Graph';

@Component({
  selector: 'v-zoom',
  template: `<div #graphDom></div>`,
})
class Zoom extends Graph {
  @Input() public max?: number;
  @Input() public min?: number;
}

export { Zoom };
