import * as IStyle from './IStyle';

type func = () => void;
type formatterFunc = (val: number) => string | number;

export interface ILegend {
  dataKey?: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  title?: null | object;
  offsetX?: number;
  offsetY?: number;
  itemGap?: number;
  itemMarginBottom?: number;
  itemWidth?: number;
  unCheckColor?: string;
  background?: object;
  allowAllCanceled?: boolean;
  itemFormatter?: formatterFunc;
  marker?: string | func;
  textStyle?: IStyle.ITextStyle;
  clickable?: boolean;
  hoverable?: boolean;
  selectedMode?: 'single' | 'multiple';
  onHover?: func;
  onClick?: func;
}

type ILegendConfig = boolean | ILegend;

export default ILegendConfig;
