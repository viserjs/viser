import * as G6 from '@antv/g6';

export class ViserGraph {
  public config: any;
  public graph: any;
  constructor(config: any) {
    this.config = config;
  }

  public render() {
    this.setGraph();
    this.setNode();
    this.setEdge();
    this.setEvent();

    this.setData();
  }

  public setGraph() {
    if (!this.config.graph.container) {
      console.error('请设置容器');
      return;
    }
    let graphConfig = {};
    if (this.config.graph) {
      graphConfig = {
        ...graphConfig,
        ...this.config.graph,
      };
    }

    if (this.config.zoom) {
      graphConfig = {
        ...graphConfig,
        ...this.config.zoom,
      };
    }

    switch (this.config.graph.type) {
      case 'tree':
        this.graph = new G6.Tree(graphConfig);
        break;
      case 'graph':
        this.graph = new G6.Graph(graphConfig);
        break;
      default:
        this.graph = new G6.Graph(graphConfig);
    }

  }

  public setData() {
    if (!this.config.data) {
      console.error('请设置数据');
      return ;
    }
    this.graph.read(this.config.data);
  }

  public setNode() {
    if (!this.config.node) {
      return;
    }
    delete this.config.node.componentId;
    const nodes = this.graph.node(this.config.node);
    if (this.config.node.label) {
      nodes.label((obj) => {
        return obj.name;
      });
    }
  }

  public setEdge() {
    if (!this.config.edge) {
      return;
    }
    delete this.config.edge.componentId;
    this.graph.edge(this.config.edge);
  }

  public setEvent() {
    Object.keys(this.config.events || []).forEach((k) => {
      const eventName = k.replace('on', '').toLocaleLowerCase();
      this.graph.on(eventName, (ev: any) => {
        this.config.events[k](ev, this.graph);
      });
    });
  }
}

export const registerNode = G6.registerNode;
export const registerEdge = G6.registerEdge;
export const registerGuide = G6.registerGuide;
export const Layouts = G6.Layouts;
export const Util = G6.Util;
