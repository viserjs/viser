import * as CSS from 'csstype';

interface IOffset {
  left?: string;
  top?: string;
}

interface INodeConfig {
  size?: string;
  anchorPoints?: any[];
  style?: CSS.Properties;
  label?: string;
  labelCfg?: any;
}

export {
  IOffset,
  INodeConfig,
};
