import IEdge from './IEdge';
import IGraph from './IGraph';
import INode from './INode';
import ITooltip from './ITooltip';
import IZoom from './IZoom';

interface INodeData {
  id: string;
  [key: string]: any;
}

interface IEdgeData {
  source: string;
  target: string;
  value?: number;
  [key: string]: any;
}

interface IGraphData {
  nodes: INodeData[];
  edges?: IEdgeData[];
}

interface ITreeData {
  [key: string]: any;
}

interface IConfig {
  data: IGraphData | ITreeData;
  graph: IGraph;
  node?: INode;
  edge?: IEdge;
  zoom?: IZoom;
  plugin?: any;
  tooltip?: any;
}

export {
  IConfig,
  IGraph,
  INode,
  IEdge,
  IZoom,
  ITooltip,
};
