import Coord from './Coord';
import Tooltip from './Tooltip';
import Legend from './Legend';
import Axis from './Axis';
import Guide from './Guide';
import Series from './Series';

interface IBackground {
  stroke: string;
  strokeOpacity: number;
  lineWidth: number;
  fill: string;
  fillOpactiy: number;
  radius: number
}

interface Lite {
  data: any;
  dataMapping: object[];
  dataPre?: {
    connector?: string;
    source?: any;
    transform?: object[] | object;
  };
  height: number;
  width?: number;
  animate?: boolean;
  forceFit?: boolean;
  background?: IBackground;
  plotBackground?: IBackground;
  padding?: number | object | number[];
  scale?: object[];
  coord?: Coord;
  tooltip?: boolean | Tooltip;
  legend?: boolean | Legend;
  axis?: boolean | Axis;
  guide?: Guide;
  series?: Series;
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
}

export default Lite;
