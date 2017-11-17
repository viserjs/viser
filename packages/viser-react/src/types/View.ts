interface View {
  data?: any;
  dataDef?: object[];
  dataPre?: {
    connector?: string;
    source?: any;
    transform?: object[] | object;
  };
  scale?: object[];
  dataView?: string;
}

export default View;
