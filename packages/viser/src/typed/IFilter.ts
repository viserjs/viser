interface IFilter {
  dataKey: string;
  callback: (ev: any) => boolean;
}

type IFilterConfig = IFilter | IFilter[];

export default IFilterConfig;
