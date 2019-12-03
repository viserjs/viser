import * as CSS from 'csstype';
import IEvent from './IEvent';

// hover selected actived running
interface IItemStateStyles {
  [key: string]: CSS.Properties;
}

interface IItemStyle extends CSS.Properties {
  endArrow?: boolean;
  lineWidth?: number;
  stroke?: string;
}

interface IDefaultItem {
  shape?: string;
  size?: number[];
  color?: string;
  style?: IItemStyle;
  labelCfg?: any;
  linkPoints?: any;
  icon?: any;
  modes?: any;
  nodeStateStyles?: IItemStateStyles;
}

interface IAnimate {
  onFrame?: any;
  duration?: number;
  easing?: string;
}

interface IMode {
  default?: any;
}

interface ILayout {
  type: string;
  direction?: string;
  // H / V / LR / RL / TB / BT
  nodeSep?: number;
  rankSep?: number;
  radial?: boolean;
  defalutPosition?: string[];
  getHeight?: () => number;
  getWidth?: () => number;
  getVGap?: () => number;
  getHGap?: () => number;
  getId?: (d: any) => string | number;
}

export default interface IGraph {
  container: any;
  type?: 'tree' | 'graph';
  width?: number | string;
  height?: number | string;
  fitView?: boolean;
  fitViewPadding?: boolean | number | number[];
  nodeStateStyles?: IItemStateStyles;
  edgeStateStyles?: IItemStateStyles;
  defaultNode?: IDefaultItem;
  defaultEdge?: IDefaultItem;
  plugins?: any[];
  animate?: boolean;
  animateCfg?: IAnimate;
  minZoom?: number;
  maxZoom?: number;
  groupType?: string;
  groupStyle?: CSS.Properties;
  layout?: ILayout;
  // 使边连入节点的中心
  linkCenter?: boolean;
  renderer?: 'svg' | 'canvas';

  fixedRoot?: boolean;
  pixelRatio?: number;

  modes?: IMode;
  moveTo?: number[];
  focusItem?: any;
  hideItem?: any;
  showItem?: any;

  events?: IEvent;
}
