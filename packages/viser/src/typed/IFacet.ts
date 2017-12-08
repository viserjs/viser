import * as IStyle from './IStyle';

interface IColTitleProps {
  offsetY?: number;
  style?: IStyle.ITextStyle;
}

interface IRowTitleProps {
  offsetX?: number;
  style?: IStyle.ITextStyle;
}

interface IFacet {
  type: string;
  fields?: string[];
  rowField?: string | string[];
  colField?: string | string[];
  cols?: number;
  rows?: number;
  showTitle?: boolean;
  colTitle?: IColTitleProps;
  rowTitle?: IRowTitleProps;
  autoSetAxis?: boolean;
  padding?: number | number[];
  transpose?: boolean;
  line?: IStyle.ILineStyle;
  lineSmooth?: boolean;
  eachView?: (views: any, facet: any) => void;
}

export default IFacet;
