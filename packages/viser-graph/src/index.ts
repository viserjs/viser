import G6 from '@antv/g6';

const { registerNode, registerEdge, registerBehavior, registerLayout} = G6;

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

import * as utils from './utils';

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

  GlobalG6,

  utils,
};
