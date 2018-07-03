import IEdge from './IEdge';
import IEvent from './IEvent';
import IGraph from './IGraph';
import INode from './INode';
import IZoom from './IZoom';

interface IConfig {
  data: any;
  graph: IGraph;
  node?: INode;
  edge?: IEdge;
  zoom?: IZoom;
  events?: IEvent;
}

export {
  IConfig,
  IGraph,
  INode,
  IEdge,
  IZoom,
};
