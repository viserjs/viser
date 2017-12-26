export interface IDataPre {
  connector?: object;
  transform?: object | object[];
  geoKey?: string;
}
export interface IDataPreFunc extends IDataPre {
  (dv: any): IDataPre;
}

type IDataPreConfig = IDataPre | IDataPreFunc;

export default IDataPreConfig;
