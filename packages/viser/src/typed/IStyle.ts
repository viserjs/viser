export interface ITextStyle {
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string;
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
  lineWidth?: number;
  lineHeight?: number;
  lineDash?: number[];
  length?: number;
}
