import * as G6 from '@antv/g6';

const registerNode = G6.registerNode;
const registerEdge = G6.registerEdge;
const registerBehavior = G6.registerBehavior;
const registerLayout = G6.registerLayout;
const Util = G6.Util;

const version = G6.version;
/** 全局 G6 可获取所有属性 */
const GlobalG6 = G6;

import { ViserGraph } from './graph';
import {
  IEdge,
  IGraph,
  INode,
  ITooltip,
  IZoom,
} from './typed';

export {
  ViserGraph,
  IEdge,
  IGraph,
  INode,
  IZoom,
  ITooltip,
  registerNode,
  registerEdge,
  registerBehavior,
  registerLayout,

  version,
  Util,
  GlobalG6,
};
