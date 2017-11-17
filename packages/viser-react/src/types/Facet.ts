import * as Style from './Style';

interface IColTitleProps {
  offsetY?: number;
  style?: Style.ITextStyle;
}

interface IRowTitleProps {
  offsetX?: number;
  style?: Style.ITextStyle;
}

interface IFacet {
  type: string;
  fields?: string[];
  showTitle?: boolean;
  autoSetAxis?: boolean;
  padding?: number;
  colTitle?: IColTitleProps;
  rowTitle?: IRowTitleProps;
  eachView?: () => void;
}

export default IFacet;
