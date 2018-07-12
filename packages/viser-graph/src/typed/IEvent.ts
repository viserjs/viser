type func = (ev: any, graph: any) => void;

export default interface IEvent {
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
