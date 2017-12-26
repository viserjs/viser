import * as IStyle from './IStyle';

type func = () => void;
type formatterFunc = (val: number) => string | number;
type eventFunc = (ev: any) => void;

export interface ILegend {
  dataKey?: string;
  show?: boolean;
  position?: 'top' | 'right' | 'bottom' | 'left';
  title?: null | object;
  custom?: boolean;
  offset?: number;
  offsetX?: number;
  offsetY?: number;
  items?: object[];
  itemGap?: number;
  titleGap?: number;
  itemMarginBottom?: number;
  itemsGroup?: object[];
  layout?: 'horizontal' | 'vertical';
  allowAllCanceled?: boolean;
  backPadding?: number[];
  itemWidth?: number;
  unCheckColor?: string;
  background?: object;
  itemFormatter?: formatterFunc;
  marker?: string | func;
  textStyle?: IStyle.ITextStyle;
  checkable?: boolean;
  clickable?: boolean;
  hoverable?: boolean;
  useHtml?: boolean;
  autoWrap?: boolean;
  autoPosition?: boolean;
  container?: any;
  containerTpl?: string;
  itemTpl?: string | func;
  selectedMode?: 'single' | 'multiple';
  reversed?: boolean;
  onHover?: eventFunc;
  onClick?: eventFunc;
  onTitleMouseDown?: eventFunc;
  onTitleMouseMove?: eventFunc;
  onTitleMouseLeave?: eventFunc;
  onTitleMouseUp?: eventFunc;
  onTitleClick?: eventFunc;
  onTitleDbClick?: eventFunc;
  onTitleTouchStart?: eventFunc;
  onTitleTouchMove?: eventFunc;
  onTitleTouchEnd?: eventFunc;
  onItemMouseDown?: eventFunc;
  onItemMouseMove?: eventFunc;
  onItemMouseLeave?: eventFunc;
  onItemMouseUp?: eventFunc;
  onItemClick?: eventFunc;
  onItemDbClick?: eventFunc;
  onItemTouchStart?: eventFunc;
  onItemTouchMove?: eventFunc;
  onItemTouchEnd?: eventFunc;
  onMarkerMouseDown?: eventFunc;
  onMarkerMouseMove?: eventFunc;
  onMarkerMouseLeave?: eventFunc;
  onMarkerMouseUp?: eventFunc;
  onMarkerClick?: eventFunc;
  onMarkerDbClick?: eventFunc;
  onMarkerTouchStart?: eventFunc;
  onMarkerTouchMove?: eventFunc;
  onMarkerTouchEnd?: eventFunc;
  onTextMouseDown?: eventFunc;
  onTextMouseMove?: eventFunc;
  onTextMouseLeave?: eventFunc;
  onTextMouseUp?: eventFunc;
  onTextClick?: eventFunc;
  onTextDbClick?: eventFunc;
  onTextTouchStart?: eventFunc;
  onTextTouchMove?: eventFunc;
  onTextTouchEnd?: eventFunc;
}

type ILegendConfig = boolean | ILegend;

export default ILegendConfig;
