
import * as IStyle from './IStyle';

type func = () => void;

export interface ILineGuide {
  type?: 'line';
  top?: boolean;
  start?: object | Array<number | string> | func;
  end?: object | Array<number | string> | func;
  style?: IStyle.ILineStyle;
}

export interface ITextGuide {
  type?: 'text';
  top?: boolean;
  position?: object | Array<number | string> | func;
  content?: string;
  style?: IStyle.ITextStyle;
  offsetX?: number;
  offsetY?: number;
}

export interface ITagGuide {
  type?: 'tag';
  top?: boolean;
  position?: object | Array<number | string> | func;
  content?: string;
  direct?: string;
  side?: number;
  offsetX?: number;
  offsetY?: number;
  background?: object;
  textStyle?: IStyle.ITextStyle;
  withPoint?: boolean;
  pointStyle?: IStyle.IPointStyle;
}

interface IRegionStyle {
  lineWidth?: number;
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
}

export interface IRectGuide {
  type?: 'rect';
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
}

export interface IArcGuide {
  type?: 'arc';
  top?: boolean;
  start?: object | Array<number | string> | func;
  end?: object | Array<number | string> | func;
  style?: object;
}

export type IGuide = ILineGuide | ITextGuide | ITagGuide | IRectGuide | IArcGuide | IHtmlGuide;
type IGuideConfig = IGuide | IGuide[];

export default IGuideConfig;
