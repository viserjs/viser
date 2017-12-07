export interface ITextStyle {
  fontSize?: string;
  textAlign?: string;
  fill?: string;
  fontWeight?: string;
  textBaseline?: 'top' | 'middle' | 'bottom';
  rotate?: number;
}

export interface ILineStyle {
  stroke?: string;
  lineWidth?: number;
  lineHeight?: number;
  lineDash?: number[];
}
