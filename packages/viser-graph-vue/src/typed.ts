const graphProps = [
  'data', 'type', 'nodeStateStyles', 'edgeStateStyles',
  'defaultNode', 'defaultEdge', 'plugins', 'layout',
  'fixedRoot', 'moveTo', 'focusItem', 'hideItem', 'showItem',
  'events', 'modes', 'width', 'height',
];

const zoomProps = ['min', 'max', 'current'];
const nodePros = ['formatter'];
const edgeProps = ['shape', 'color', 'label', 'formatter', 'events'];

const eventProps = [
  'onMouseDown', 'onMouseMove', 'onMouseUp', 'onMouseenter', 'onMouseleave',
  'onClick', 'onDbClick',
  'onDragstart', 'onDrag', 'onDragend', 'onDragleave', 'onDragenter',
  'onContextmenu', 'onBeforepaint', 'onBeforelayout', 'onAfterlayout',
];

const props: any = graphProps.concat(zoomProps).concat(eventProps)
  .concat(nodePros).concat(edgeProps);

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
