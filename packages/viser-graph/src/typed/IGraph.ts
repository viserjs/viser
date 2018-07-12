type calFunc = (nodes: any[], edges: any[]) => {};

interface ILayoutObject {
  auto: boolean;
  processer: any;
}

export default interface IGraph {
  container: any;
  width?: number | string;
  height?: number | string;
  fitView?: 'tl' | 'lc' | 'bl' | 'cc' | 'tc' | 'tr' | 'rc' | 'br' | 'bc' | 'autoZoom';
  fitViewPadding?: boolean | number | number[];
  animate?: boolean;
  minZoom?: number;
  maxZoom?: number;
  type?: 'tree' | 'graph';
  modes?: any;
  mode?: string;
  plugins?: any[];
  layout?: ILayoutObject | calFunc;
}
