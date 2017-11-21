export interface IDataMapping {
  dataKey: string;
  mark: string;
}

type IDataMappingConfig = IDataMapping & IDataMapping[];

export default IDataMappingConfig;
