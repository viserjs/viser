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
  showTitle?: boolean;
  autoSetAxis?: boolean;
  padding?: number;
  colTitle?: IColTitleProps;
  rowTitle?: IRowTitleProps;
  eachView?: (views: any, facet: any) => void;
}

export default IFacet;
