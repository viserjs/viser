import { Component, Input } from '@angular/core';
import { Graph } from './Graph';

@Component({
  selector: 'v-node',
  template: `<div #graphDom></div>`,
})
class Node extends Graph {
  @Input() public shape?: string;
  @Input() public size?: number;
  @Input() public label?: any;
}

export { Node };
