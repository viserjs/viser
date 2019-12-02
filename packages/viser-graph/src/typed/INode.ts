import { INodeConfig } from './common';
import IEvent from './IEvent';
export default interface INode {
  /** 生成node config */
  formatter?: (node: any) => INodeConfig;

  events?: IEvent;
}
