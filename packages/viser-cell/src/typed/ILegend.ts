import * as IStyle from './IStyle';

type func = () => void;
type formatterFunc = (val: number) => string | number;
type eventFunc = (ev: any, chart: any) => void;

export interface ILegend {
  dataKey?: string;
  show?: boolean;
  position?: string;
  align?: string;
  verticalAlign?: string;
  itemWidth?: number | 'auto';
  showTitle?: boolean;
  titleStyle?: IStyle.ITextStyle;
  offsetX?: number;
  offsetY?: number;
  titleGap?: number;
  itemGap?: number;
  itemMarginBottom?: number;
  wordSpace?: number;
  unCheckColor?: string;
  itemFormatter?: formatterFunc;
  marker?: string | object | func;
  nameStyle?: IStyle.ITextStyle;
  valueStyle?: IStyle.ITextStyle;
  custom?: boolean;
  onClick?: eventFunc;
}

type ILegendConfig = boolean | ILegend;

export default ILegendConfig;
