export interface IDataPre {
  connector?: string;
  source?: any;
  transform?: object | object[];
  useDataView?: boolean;
  geoKey?: string;
}

export default IDataPre;
