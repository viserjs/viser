type formatterFunc = (val: number) => string | number;

interface ICommonScale {
  dataKey: string;
  type?: string;
  formatter?: string | formatterFunc;
  range?: number[];
  alias?: string;
  tickCount?: number;
  ticks?: number[];
}

interface ILinearCommonScale {
  nice?: boolean;
  min?: number;
  max?: number;
  tickInterval?: number;
}

export type ILinearScale = ICommonScale & ILinearCommonScale;

interface ISCatScale {
  values?: string;
}

export type ICatScale = ILinearCommonScale & ISCatScale;

interface ISTimeCatScale {
  nice?: boolean;
  mask?: string;
  values?: string;
}

export type ITimeCatScale = ILinearCommonScale &  ISTimeCatScale;

export type IScale = ILinearScale | ICatScale | ITimeCatScale;

type IScaleConfig = IScale | IScale[];

export default IScaleConfig;
