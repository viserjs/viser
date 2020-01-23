type func = (ev: any, graph: any) => void;

export default interface IEvent {
  onClick?: func;
  onDbclick?: func;

  onMousedown?: func;
  onMousemove?: func;
  onMouseenter?: func;
  onMouseleave?: func;
  onMouseup?: func;

  onDragstart?: func;
  onDrag?: func;
  onDragend?: func;
  onDragleave?: func;
  onDragenter?: func;

  onContextmenu?: func;
  onBeforepaint?: func;
  onBeforelayout?: func;
  onAfterlayout?: func;
}
