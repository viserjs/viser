export const firstLowerCase = (str: string) => {
  return str.replace(/^\S/, (s: any) => {
    return s.toLowerCase();
  });
};

export const generateRandomNum = () => {
  return (Math.floor(new Date().getTime() + Math.random() * 10000)).toString();
};

export const isOwnEmpty = (obj: any) => {
  for (const name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false;
    }
  }
  return true;
};

export const retain = (obj: any, attr: string[]) => {
  const newObj = Object.create(null);

  for (const item in obj) {
    if (obj.hasOwnProperty(item)) {
      const arrAttr = Array.isArray(attr) ? attr : [attr];

      if (arrAttr.indexOf(item) >= 0) {
        newObj[item] = obj[item];
      }
    }
  }

  return newObj;
};

export const omit = (obj: any, attr: string) => {
  const newObj = Object.create(null);

  for (const item in obj) {
    if (obj.hasOwnProperty(item)) {
      const arrAttr = Array.isArray(attr) ? attr : [attr];

      if (arrAttr.indexOf(item) < 0) {
        newObj[item] = obj[item];
      }
    }
  }

  return newObj;
};

export const uniqComponentIdArray = (configs: any[]) => {
  const componentIds: any = {};
  const newConfigs = [] as any;
  for (let i = (configs.length - 1); i >= 0; i--) {
    const config = configs[i];
    if (!componentIds[config.componentId]) {
      newConfigs.push(config);
      componentIds[config.componentId] = true;
    }
  }
  newConfigs.sort((ca: any, cb: any) => {
    return parseInt(ca.componentId, 10) - parseInt(cb.componentId, 10);
  });
  return newConfigs;
};
