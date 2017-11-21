
import * as Style from './Style';

type func = () => void;

interface ILineText {
  position?: string | number | 'start' | 'center' | 'end';
  autoRotate?: number;
  style?: Style.ILineStyle;
  content?: string;
  offsetX?: number;
  offsetY?: number;
}

export interface ILineGuide {
  type?: 'line';
  top?: boolean;
  zIndex?: number;
  start?: object | number[] | func;
  end?: object | number[] | func;
  lineStyle: Style.ILineStyle;
  text: ILineText;
}

export interface ITextGuide {
  type?: 'text';
  top?: boolean;
  zIndex?: number;
  position: object | number[] | func;
  content?: string;
  style?: Style.ITextStyle;
  offsetX?: number;
  offsetY?: number;
}

export interface IImageGuide {
  type?: 'image';
  top?: boolean;
  zIndex?: number;
  start?: object | number[] | func;
  end?: object | number[] | func;
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
  start?: object | number[] | func;
  end?: object | number[] | func;
  style?: IRegionStyle;
}

export interface IHtmlGuide {
  type?: 'html';
  position: object | number[] | func;
  alignX?: 'left' | 'middle' | 'right';
  alignY?: 'top' | 'middle' | 'bottom';
  offsetX?: number;
  offsetY?: number;
  html?: string;
  zIndex?: number;
}

export interface IArcGuide {
  type?: 'arc';
  top?: boolean;
  start?: object | number[] | func;
  end?: object | number[] | func;
  style?: object;
}

export type IGuide = ILineGuide | ITextGuide | IImageGuide | IRegionGuide | IArcGuide;
type IGuideProps = IGuide & IGuide[];

export default IGuideProps;
