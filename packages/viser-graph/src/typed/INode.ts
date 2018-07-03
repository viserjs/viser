export default interface INode {
  shape?: string;
  size?: number;
  label?: (obj: any) => {};
  style?: any;
}
