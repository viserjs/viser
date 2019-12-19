import * as CSS from 'csstype';

interface IOffset {
  left?: string;
  top?: string;
}

interface INodeConfig {
  size?: number | number[];
  anchorPoints?: any[];
  style?: CSS.Properties;
  label?: string;
  labelCfg?: any;
  shape?: string;
}

export {
  IOffset,
  INodeConfig,
};
