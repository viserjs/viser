
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

interface ILineGuideProps {
  type?: 'line';
  top?: boolean;
  zIndex?: number;
  start?: object | number[] | func;
  end?: object | number[] | func;
  lineStyle: Style.ILineStyle;
  text: ILineText;
}

interface ITextGuideProps {
  type?: 'text';
  top?: boolean;
  zIndex?: number;
  position: object | number[] | func;
  content?: string;
  style?: Style.ITextStyle;
  offsetX?: number;
  offsetY?: number;
}

interface IImageGuideProps {
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

interface IRegionGuideProps {
  type?: 'region';
  top?: boolean;
  start?: object | number[] | func;
  end?: object | number[] | func;
  style?: IRegionStyle;
}

interface IHtmlGuideProps {
  type?: 'html';
  position: object | number[] | func;
  alignX?: 'left' | 'middle' | 'right';
  alignY?: 'top' | 'middle' | 'bottom';
  offsetX?: number;
  offsetY?: number;
  html?: string;
  zIndex?: number;
}

interface IArcGuideProps {
  type?: 'arc';
  top?: boolean;
  start?: object | number[] | func;
  end?: object | number[] | func;
  style?: object;
}

type Guide = ILineGuideProps | ITextGuideProps | IImageGuideProps | IRegionGuideProps | IArcGuideProps;

export default Guide;
