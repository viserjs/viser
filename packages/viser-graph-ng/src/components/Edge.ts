import { Component, Input } from '@angular/core';
import { Graph } from './Graph';

@Component({
  selector: 'v-edge',
  template: `<div #graphDom></div>`,
})
class Edge extends Graph {
  @Input() public shape?: string;
  @Input() public color?: string;
  @Input() public label?: string;

  @Input() public formatter?: any;

  @Input() public events?: any;
}

export { Edge };
