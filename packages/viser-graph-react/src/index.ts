import { GlobalG6, registerBehavior, registerEdge, registerLayout, registerNode, Util } from '../../viser-graph/src/index';
import { default as Graph } from './components/Graph';
import { Edge, Node, Tooltip, Zoom } from './components/SubComponent';

export {
  Graph,
  Zoom,
  Node,
  Edge,
  Tooltip,

  registerNode,
  registerEdge,
  registerBehavior,
  registerLayout,

  Util,
  GlobalG6,
};
