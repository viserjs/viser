import * as IStyle from './IStyle';

export interface IAxis {
  dataKey?: string;
  show?: boolean;
  line?: IStyle.ILineStyle;
  position?: string;
  labelOffset?: number;
  tickLine?: IStyle.ILineStyle;
  grid?: (text: string, index: number) => any;
  label?: (text: string, index: number, total: number) => any;
}

type IAxisConfig = boolean | IAxis | IAxis[];

export default IAxisConfig;
