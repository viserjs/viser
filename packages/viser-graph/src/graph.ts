import * as G6 from '@antv/g6';
import { IConfig } from './typed';

export class ViserGraph {
  public config: any;
  public graph: any;
  constructor(config: IConfig) {
    this.config = config;
  }

  public render() {
    this.setGraph();
    this.setNode();
    this.setEdge();
    this.setEvent();

    this.setData();

    this.setZoom();
  }

  public setGraph() {
    if (!this.config.graph.container) {
      console.error('please set container');
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
        minZoom: this.config.zoom.min,
        maxZoom: this.config.zoom.max,
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
      console.error('please set data');
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

  public setZoom() {
    if (!this.config.zoom || !this.config.zoom.current) {
      return;
    }
    this.graph.zoom(this.config.zoom.current);
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
