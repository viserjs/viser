import { IMain } from 'viser';

interface ISLite {
  pie?: boolean;
  sector?: boolean;
  line?: boolean;
  smoothLine?: boolean;
  dashLine?: boolean;
  area?: boolean;
  stackArea?: boolean;
  smoothArea?: boolean;
  bar?: boolean;
  stackBar?: boolean;
  dodgeBar?: boolean;
  interval?: boolean;
  stackInterval?: boolean;
  dodgeInterval?: boolean;
  point?: boolean;
  waterfall?: boolean;
  funnel?: boolean;
  pyramid?: boolean;
  radialBar?: boolean;
  schema?: boolean;
  box?: boolean;
  candle?: boolean;
  polygon?: boolean;
  contour?: boolean;
  heatmap?: boolean;
  edge?: boolean;
  sankey?: boolean;
  jitterPoint?: boolean;
}

type IRLiteChart = ISLite & IMain & {
  [key:string]: any
};

export default IRLiteChart;
