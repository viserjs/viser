export const camelCase: any = (() => {
  const DEFAULT_REGEX = /[-_]+(.)?/g;

  function toUpper(match: string, group1: string) {
    return group1 ? group1.toUpperCase() : '';
  }
  return (str: string, delimiters?: string) => {
    return str.replace(
      delimiters ? new RegExp('[' + delimiters + ']+(.)?', 'g') : DEFAULT_REGEX,
      toUpper,
    );
  };
})();
export const safePush = (obj: any, key: string, value: any) => {
  if (!obj[key]) {
    obj[key] = [];
  }

  cleanUndefined(value);

  obj[key].push(value);
};

export const oneObjectMoreArray = (obj: any, key: string, value: any) => {
  if (!obj[key]) {
    obj[key] = value;
    return;
  }

  if (obj[key] && obj[key].constructor.name === 'Object') {
    obj[key] = [obj[key]];
  }

  let indexOfSameObject = -1;
  if (value && value.viewId) {
    obj[key].forEach((o: any, i: number) => {
      if (o && o.viewId && o.viewId === value.viewId) {
        indexOfSameObject = i;
      }
    });
  } else if (value && value.componentId) {
    obj[key].forEach((o: any, i: number) => {
      if (o && o.componentId && o.componentId === value.componentId) {
        indexOfSameObject = i;
      }
    });
  }

  if (indexOfSameObject === -1) {
    obj[key].push(value);
  } else {
    obj[key][indexOfSameObject] = {
      ...obj[key][indexOfSameObject],
      ...value,
    };
  }
};

export const cleanUndefined = (value: any) => {
  const newValue = { ...value };

  // delete value's undefined key
  for (const key in newValue) {
    if (newValue[key] === undefined) {
      delete newValue[key];
    }
  }

  return newValue;
};

export const isAllUndefined = (value: any) => {
  return Object.keys(value).every((key) => value[key] === undefined);
};

export const camelize = (str: string) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
    return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
};

/**
 * special props for vue
 */
export const normalizeProps = (props: any, include: string[] = [], exclude: string[] = []) => {
  const newProps = { ...props };

  if (newProps.vStyle) {
    newProps.style = newProps.vStyle;
    delete newProps.vStyle;
  }

  if (exclude.length) {
    exclude.forEach((propsKey) => {
      delete newProps[propsKey];
    });
  }

  if (include.length) {
    Object.keys(newProps).forEach((propsKey) => {
      if (include.indexOf(propsKey) === -1) {
        delete newProps[propsKey];
      }
    });
  }

  return newProps;
};

export const generateRandomNum = () => {
  return (Math.floor(new Date().getTime() + Math.random() * 10000)).toString();
};
