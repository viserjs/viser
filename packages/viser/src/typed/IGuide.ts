
import * as IStyle from './IStyle';

type func = () => void;
type eventFunc = (ev: any, chart: any) => void;

interface IGuideEvent {
  onMouseDown?: eventFunc;
  onMouseMove?: eventFunc;
  onMouseLeave?: eventFunc;
  onMouseUp?: eventFunc;
  onClick?: eventFunc;
  onDbClick?: eventFunc;
  onTouchStart?: eventFunc;
  onTouchMove?: eventFunc;
  onTouchEnd?: eventFunc;
}

interface ILineText {
  position?: string | number;
  autoRotate?: boolean;
  style?: IStyle.ILineStyle;
  content?: string;
  offsetX?: number;
  offsetY?: number;
}

export interface ILineGuide {
  type?: 'line';
  top?: boolean;
  zIndex?: number;
  start?: object | Array<number | string> | func;
  end?: object | Array<number | string> | func;
  lineStyle?: IStyle.ILineStyle;
  text?: ILineText;
}

export interface ITextGuide {
  type?: 'text';
  top?: boolean;
  zIndex?: number;
  position?: object | Array<number | string> | func;
  content?: string;
  style?: IStyle.ITextStyle;
  offsetX?: number;
  offsetY?: number;
}

export interface IImageGuide {
  type?: 'image';
  top?: boolean;
  zIndex?: number;
  start?: object | Array<number | string> | func;
  end?: object | Array<number | string> | func;
  src?: string;
  width?: number;
  height?: number;
  offsetX?: number;
  offsetY?: number;
}

interface IRegionStyle {
  lineWidth?: number;
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
}

export interface IRegionGuide {
  type?: 'region';
  top?: boolean;
  start?: object | Array<number | string> | func;
  end?: object | Array<number | string> | func;
  style?: IRegionStyle;
}

export interface IHtmlGuide {
  type?: 'html';
  position?: object | Array<number | string> | func;
  alignX?: string;
  alignY?: string;
  offsetX?: number;
  offsetY?: number;
  html?: string;
  zIndex?: number;
}

export interface IArcGuide {
  type?: 'arc';
  top?: boolean;
  start?: object | Array<number | string> | func;
  end?: object | Array<number | string> | func;
  style?: object;
}

export type IGuide = IGuideEvent & (ILineGuide | ITextGuide | IImageGuide | IRegionGuide | IArcGuide | IHtmlGuide);
type IGuideConfig = IGuide | IGuide[];

export default IGuideConfig;
