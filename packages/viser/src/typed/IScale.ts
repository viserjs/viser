type func = () => void;

interface ICommonScale {
  dataKey: string;
  formatter?: func;
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

export type ILinearScale = ICommonScale | ILinearCommonScale;

interface ISCatScale {
  values?: string;
}

export type ICatScale = ILinearCommonScale | ISCatScale;

interface ISLogScale {
  base?: number;
}

export type ILogScale = ICommonScale | ILinearCommonScale |  ISLogScale;

interface ISPowScale {
  exponent?: number;
}

export type IPowScale = ICommonScale | ILinearCommonScale |  ISPowScale;

interface ISTimeScale {
  type: 'time';
  mask?: string;
}

export type ITimeScale = ICommonScale | ILinearCommonScale |  ISTimeScale;

interface ISTimeCatScale {
  type: 'timeCat';
  nice?: boolean;
  mask?: string;
  values?: string;
}

export type ITimeCatScale = ILinearCommonScale &  ISTimeCatScale;

export type IScale = ILinearScale | ICatScale | ILogScale | IPowScale | ITimeScale | ITimeCatScale;

type IScaleConfig = IScale | IScale[];

export default IScaleConfig;
