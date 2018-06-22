import { CommonModule } from '@angular/common';
import { enableProdMode, NgModule } from '@angular/core';
import { Layouts, registerEdge, registerGuide, registerNode, Util } from '../../viser-graph/src';
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

enableProdMode();

export {
  registerNode, registerEdge, registerGuide, Layouts, Util,
};
