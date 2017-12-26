export interface IDataPre {
  connector?: object;
  transform?: object | object[];
  geoKey?: string;
}
export interface IDataPreFunc {
  (dv: any): IDataPre;
  connector?: object;
  transform?: object | object[];
  geoKey?: string;
}

type IDataPreConfig = IDataPre | IDataPreFunc;

export default IDataPreConfig;
