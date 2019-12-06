import { GlobalG6, registerBehavior, registerEdge, registerLayout, registerNode, utils } from '../../viser-graph/src/index';
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

  utils,
  GlobalG6,
};
