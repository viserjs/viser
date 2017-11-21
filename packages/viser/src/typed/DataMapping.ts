export interface IDataMapping {
  dataKey: string;
  mark: string;
}

export interface IChangeDataMapping {
  dataKey: string;
  column?: string | string[];
  row?: string | string[];
  shape?: string | string[];
}


type IDataMappingProps = IDataMapping & IDataMapping[];

export default IDataMappingProps;
