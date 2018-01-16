export interface ITextStyle {
  fontSize?: number | string;
  fontFamily?: string;
  fontWeight?: number | string;
  textAlign?: string;
  fill?: string;
  lineHeight?: number;
  textBaseline?: 'top' | 'middle' | 'bottom';
  rotate?: number;
  shadowBlur?: number;
  shadowColor?: string;
}

export interface ILineStyle {
  stroke?: string;
  strokeOpacity?: number;
  lineWidth?: number;
  lineHeight?: number;
  lineDash?: number[];
  length?: number;
  textAlign?: string;
}
