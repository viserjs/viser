import IEvent from './IEvent';

export default interface IEdge {
  shape?: string;
  color?: string;
  label?: string;

  formatter?: any;

  events?: IEvent;
}
