const graphProps = [
  'id', 'container', 'height', 'width', 'animate', 'fitView', 'fitViewPadding',
  'type', 'data', 'layout',
];
const zoomProps = ['min', 'max'];
const nodePros = ['shape', 'size', 'label'];
const edgeProps = ['shape'];
const eventProps = [
  'onMouseDown', 'onMouseMove', 'onMouseLeave', 'onMouseUp', 'onClick', 'onDbClick', 'onTouchStart',
  'onTouchMove', 'onTouchEnd', 'onPlotEnter', 'onPlotMove', 'onPlotLeave', 'onPlotClick', 'onPlotDbClick',
  'onTitleMouseDown', 'onTitleMouseMove', 'onTitleMouseLeave', 'onTitleMouseUp', 'onTitleClick', 'onTitleDbClick',
  'onTitleTouchStart', 'onTitleTouchMove', 'onTitleTouchEnd',
  'onItemMouseDown', 'onItemMouseMove', 'onItemMouseLeave', 'onItemMouseUp', 'onItemClick', 'onItemDbClick',
  'onItemTouchStart', 'onItemTouchMove', 'onItemTouchEnd',
  'onMarkerMouseDown', 'onMarkerMouseMove', 'onMarkerMouseLeave', 'onMarkerMouseUp', 'onMarkerClick',
  'onMarkerDbClick', 'onMarkerTouchStart', 'onMarkerTouchMove', 'onMarkerTouchEnd',
  'onTextMouseDown', 'onTextMouseMove', 'onTextMouseLeave', 'onTextMouseUp', 'onTextClick', 'onTextDbClick',
  'onTextTouchStart', 'onTextTouchMove', 'onTextTouchEnd',
  'onLabelMouseDown', 'onLabelMouseMove', 'onLabelMouseLeave', 'onLabelMouseUp', 'onLabelClick', 'onLabelDbClick',
  'onLabelTouchStart', 'onLabelTouchMove', 'onLabelTouchEnd',
  'onTicksMouseDown', 'onTicksMouseMove', 'onTicksMouseLeave', 'onTicksMouseUp', 'onTicksClick', 'onTicksDbClick',
  'onTicksTouchStart', 'onTicksTouchMove', 'onTicksTouchEnd',
  'onLineMouseDown', 'onLineMouseMove', 'onLineMouseLeave', 'onLineMouseUp', 'onLineClick', 'onLineDbClick',
  'onLineTouchStart', 'onLineTouchMove', 'onLineTouchEnd',
  'onGridMouseDown', 'onGridMouseMove', 'onGridMouseLeave', 'onGridMouseUp', 'onGridClick', 'onGridDbClick',
  'onGridTouchStart', 'onGridTouchMove', 'onGridTouchEnd',
  'onAfterchange',
];

const props: any = graphProps.concat(zoomProps).concat(eventProps).concat(nodePros).concat(edgeProps);

const unique = (array: any) => {
  const res = [] as any;
  for (let i = 0, len = array.length; i < len; i++) {
    const current = array[i];
    if (res.indexOf(current) === -1) {
      res.push(current);
    }
  }

  return res;
};

const changeObj = (array: any) => {
  const uniqueProps = unique(array);
  const propsObject: any = {};

  for (const res of uniqueProps) {
    propsObject[res] = null;
  }

  return propsObject;
};

export {
  changeObj,
  unique,
  props,
  graphProps,
  zoomProps,
  nodePros,
  edgeProps,
  eventProps,
};
