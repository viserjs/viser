import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Layouts, registerEdge, registerGuide, registerNode, Util } from 'viser-graph';
import { Edge, Graph, Node, Zoom } from './components/index';

@NgModule({
  imports: [CommonModule],
  declarations: [
    Graph,
    Zoom,
    Node,
    Edge,
  ],
  exports: [
    Graph,
    Zoom,
    Node,
    Edge,
  ],
})

export class ViserGraphModule {
}

export {
  registerNode, registerEdge, registerGuide, Layouts, Util,
};
