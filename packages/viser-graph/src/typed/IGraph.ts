// tslint:disable-next-line: no-submodule-imports
import { GraphOptions } from '@antv/g6/lib/interface/graph.d';
import IEvent from './IEvent';

type ILayoutFunc = (node: any) => number;
interface ILayout {
  type: string;
  direction?: string;
  // H / V / LR / RL / TB / BT
  nodeSep?: number;
  rankSep?: number;
  radial?: boolean;
  ranksep?: number;
  defalutPosition?: string[];
  preventOverlap?: boolean;
  unitRadius?: number;
  indent?: number;
  gravity?: number;
  speed?: number;
  nodeSize?: number;
  divisions?: number;
  radius?: number;
  startAngle?: number;
  endAngle?: number;
  startRadius?: number;
  endRadius?: number;
  ordering?: 'degree' | string;
  strictRadial?: boolean;
  maxPreventOverlapIteration?: number;
  clustering?: boolean;
  rankdir?: 'LR' | string;
  align?: 'DL' | string;
  maxLevelDiff?: number;
  sortBy?: 'degree' | string;
  linkDistance?: number | ILayoutFunc;
  nodeStrength?: ILayoutFunc;
  edgeStrength?: ILayoutFunc | number;
  getHeight?: () => number;
  getWidth?: () => number;
  getVGap?: () => number;
  getHGap?: () => number;
  getId?: (d: any) => string | number;
  getSide?: (d: any) => string;
  nodesepFunc?: ILayoutFunc;
  ranksepFunc?: ILayoutFunc;
}
/** 仅定义更限制的类型，未定义的遵循 G6 的定义 */
export default interface IGraph extends GraphOptions {
  container: string | HTMLElement;
  type?: 'tree' | 'graph';
  plugins?: any[];
  layout?: ILayout;
  pixelRatio?: number;

  fixedRoot?: boolean;
  // TODO 待实现 api
  // moveTo?: number[];
  // focusItem?: any;
  // hideItem?: any;
  // showItem?: any;

  events?: IEvent;
}
