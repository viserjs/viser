interface IBackground {
  stroke: string;
  strokeOpacity: number;
  lineWidth: number;
  fill: string;
  fillOpactiy: number;
  radius: number
}

interface Chart {
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
  dataView?: string;
}

export default Chart;
