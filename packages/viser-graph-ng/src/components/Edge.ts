import { Component, Input } from '@angular/core';
import { Graph } from './Graph';

@Component({
  selector: 'v-edge',
  template: `<div #graphDom></div>`,
})
class Edge extends Graph {
  @Input() public shape?: string;
}

export { Edge };
