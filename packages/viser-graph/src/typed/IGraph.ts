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
  getSide?: () => string;
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
