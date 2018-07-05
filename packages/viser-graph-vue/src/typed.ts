const graphProps = [
  'id', 'container', 'height', 'width', 'animate', 'fitView', 'fitViewPadding',
  'type', 'data', 'layout',
];
const zoomProps = ['min', 'max'];
const nodePros = ['shape', 'size', 'label'];
const edgeProps = ['shape'];
const eventProps = [
  'onMouseDown', 'onMouseMove', 'onMouseUp',
  'onClick', 'onDbClick',
  'onTouchStart', 'onTouchMove', 'onTouchEnd',
  'onPlotEnter', 'onPlotMove', 'onPlotLeave',
  'onPlotClick', 'onPlotDbClick',
  'onAfterchange',
  'onDragstart', 'onDrag', 'onDragend',
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
