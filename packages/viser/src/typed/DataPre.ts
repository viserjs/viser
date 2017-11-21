export interface IDataPre {
  connector?: string;
  source?: any;
  transform?: object | object[];
  useDataView?: boolean;
  geoKey?: string;
}

type IDataPreProps = IDataPre;

export default IDataPreProps;
