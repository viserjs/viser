export default interface IGraph {
  data: any;
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
  layout?: any;
}
