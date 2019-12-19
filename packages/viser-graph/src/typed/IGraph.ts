import * as CSS from 'csstype';
import IEvent from './IEvent';

// hover selected actived running
interface IItemStateStyles {
  [key: string]: IItemStyle;
}

interface IItemStyle extends CSS.Properties {
  endArrow?: boolean;
  lineWidth?: number;
  stroke?: string;
  fillOpacity?: number;
  radius?: number;
  fill?: string;
  lineAppendWidth?: number;
}

interface IDefaultItem {
  shape?: string;
  size?: number | number[];
  color?: string;
  style?: IItemStyle;
  labelCfg?: any;
  linkPoints?: any;
  icon?: any;
  modes?: any;
  nodeStateStyles?: IItemStateStyles;
  direction?: string;
  clipCfg?: any;  // ???
  lineAppendWidth?: number;
  preRect?: any;
  logoIcon?: any;
  stateIcon?: any;
}

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
export default interface IGraph extends G6.TreeGraphOptions, G6.GraphOptions {
  container: string | HTMLElement;
  type?: 'tree' | 'graph';
  nodeStateStyles?: IItemStateStyles;
  edgeStateStyles?: IItemStateStyles;
  defaultNode?: IDefaultItem;
  defaultEdge?: IDefaultItem;
  plugins?: any[];
  layout?: ILayout;

  fixedRoot?: boolean;

  moveTo?: number[];
  focusItem?: any;
  hideItem?: any;
  showItem?: any;

  events?: IEvent;
}
