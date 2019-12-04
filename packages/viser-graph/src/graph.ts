import * as G6 from '@antv/g6';
import * as _ from 'lodash';
import { IConfig, IGraph } from './typed';

export class ViserGraph {
  public config: any;
  public graph: any;
  constructor(config: IConfig) {
    console.log('config', config);
    this.config = config;
  }

  public reRender(config: any) {
    this.config = config;
    this.setData();
    this.setZoom();
  }

  public render() {
    this.setGraph();
    this.setNode();
    this.setEdge();
    this.setData();
    this.setZoom();
    this.graph.render();

    this.setEvent();
  }

  public setGraph() {
    if (!this.config.graph.container) {
      console.error('please set container');
      return;
    }
    let graphConfig: IGraph = {
      container: this.config.graph.container,
      ...this.config.graph,
    };

    if (this.config.zoom) {
      graphConfig = {
        ...graphConfig,
        minZoom: this.config.zoom.min,
        maxZoom: this.config.zoom.max,
      };
    }

    switch (this.config.graph.type) {
      case 'tree':
        this.graph = new G6.TreeGraph(graphConfig as G6.TreeGraphOptions);
        break;
      case 'graph':
        this.graph = new G6.Graph(graphConfig as G6.GraphOptions);
        break;
      default:
        this.graph = new G6.Graph(graphConfig as G6.TreeGraphOptions);
    }

  }

  public setData() {
    if (!this.config.data) {
      console.error('please set data');
      return ;
    }
    this.graph.data(this.config.data);
  }

  public setNode() {
    if (!this.config.node) {
      return;
    }
    delete this.config.node.componentId;
    if (_.get(this.config, 'node.formatter')) {
      this.graph.node(this.config.node.formatter);
    }
  }

  public setEdge() {
    if (!this.config.edge) {
      return;
    }
    delete this.config.edge.componentId;
    if (_.get(this.config, 'edge.formatter')) {
      this.graph.edge(this.config.edge.formatter);
    }
  }

  public setZoom() {
    if (!this.config.zoom || !this.config.zoom.current) {
      return;
    }
    this.graph.zoom(this.config.zoom.current);
  }

  public setEvent() {
    this.bindEvent(_.get(this.config, 'graph.events', {}), '');
    this.bindEvent(_.get(this.config, 'node.events', {}), 'node');
    this.bindEvent(_.get(this.config, 'edge.events', {}), 'edge');
  }

  protected bindEvent(events: any, type: string) {
    Object.keys(events || []).forEach((k) => {
      const eventName = k.replace('on', '').toLocaleLowerCase();
      this.graph.on(type === '' ? eventName : `${type}:${eventName}`, (ev: any) => {
        events[k](ev, this.graph);
      });
    });
  }
}
