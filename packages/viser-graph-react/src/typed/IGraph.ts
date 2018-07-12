type voidFunc = () => void;
type calFunc = (nodes: any[], edges: any[]) => {
  // nodes 节点集
  // edges 边集
  // 在此处进行布局
};

interface ILayoutObject {
  auto: boolean; // 是否在画布数据变更后自动布局 默认 是true
  processer: voidFunc | any; // 布局处理器
}

type func = (ev: any, graph: any) => void;

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
  layout?: ILayoutObject | calFunc;
  onClick?: func;
  onAfterchange?: func;
  onMousedown?: func;
  onMousemove?: func;
  onMouseleave?: func;
  onMouseup?: func;
  onDblclick?: func;
  onTouchstart?: func;
  onTouchmove?: func;
  onTouchend?: func;
  onPlotenter?: func;
  onPlotmove?: func;
  onPlotleave?: func;
  onPlotclick?: func;
  onPlotdblclick?: func;
  onDragstart?: func;
  onDrag?: func;
  onDragend?: func;
}
