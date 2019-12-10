import { Component, Input } from '@angular/core';
import { Graph } from './Graph';

@Component({
  selector: 'v-node',
  template: `<div #graphDom></div>`,
})
class Node extends Graph {
  @Input() public formatter?: (node: any) => any;

  @Input() public events?: any;
}

export { Node };
