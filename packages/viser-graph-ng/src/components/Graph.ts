import { AfterViewInit, Component, ElementRef, Input,
  OnChanges, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { ViserGraph } from 'viser-graph';
import { GraphContext } from './GraphService';
import { generateRandomNum, retain } from './utils';

@Component({
  providers: [GraphContext],
  selector: 'v-graph',
  template: `<div #GraphDom></div>`,
})

export class Graph implements AfterViewInit, OnChanges {
  @Input() public data?: any;
  @Input() public height?: number;
  @Input() public width?: number;
  @Input() public animate?: boolean | object;
  @Input() public fitView?: boolean;
  @Input() public fitViewPadding?: any;
  @Input() public type?: any;
  @Input() public layout?: any;
  @Input() public onMouseDown?: any;
  @Input() public onMouseMove?: any;
  @Input() public onMouseUp?: any;
  @Input() public onClick?: any;
  @Input() public onDbClick?: any;
  @Input() public onTouchStart?: any;
  @Input() public onTouchMove?: any;
  @Input() public onTouchEnd?: any;
  @Input() public onPlotEnter?: any;
  @Input() public onPlotMove?: any;
  @Input() public onPlotLeave?: any;
  @Input() public onPlotClick?: any;
  @Input() public onPlotDbClick?: any;
  @Input() public onAfterchange?: any;
  @Input() public onDragstart?: any;
  @Input() public onDrag?: any;
  @Input() public onDragend?: any;

  @ViewChild('GraphDom', { static: true }) public graphDiv!: ElementRef<HTMLDivElement>;
  private componentId = generateRandomNum();
  private elem: any;

  constructor(private context: GraphContext, elem: ElementRef, vcRef: ViewContainerRef) {
    this.context = context;
    this.elem = elem;
  }

  public ngAfterViewInit() {
    if (this.context.graph) {
      this.context.graph.destroy();
    }
    this.initGraph();
  }

  public ngOnChanges(changes: SimpleChanges) {
    this.initGraph(true);
  }

  private combineViewConfig(props: any, config: any) {
    if (props.data) {
      config.data = props.data;
    }

    if (props.scale) {
      config.scale = props.scale;
    }

    if (props.start) {
      config.start = props.start;
    }

    if (props.end) {
      config.end = props.end;
    }
  }

  private combineGraphConfig(props: any, config: any) {
    const GraphRetain = [
      'height', 'width', 'fitView', 'fitViewPadding',
      'animate', 'type', 'data', 'layout',
    ];
    config.graph = retain(props, GraphRetain);

    const eventRetain = [
      'onMouseDown', 'onMouseMove', 'onMouseUp',
      'onClick', 'onDbClick',
      'onTouchStart', 'onTouchMove', 'onTouchEnd',
      'onPlotEnter', 'onPlotMove', 'onPlotLeave',
      'onPlotClick', 'onPlotDbClick',
      'onAfterchange',
      'onDragstart', 'onDrag', 'onDragend',
    ];

    config.events = retain(props, eventRetain);

    config.data = props.data;
  }

  private convertValueToNum(props: any) {
    const numberProps: any = {};
    const numberKeys = ['radius', 'innerRadius', 'size', 'offsetX', 'offsetY', 'cols', 'padding',
      'opacity', 'startAngle', 'endAngle'];

    Object.keys(props).forEach((propKey) => {
      if (numberKeys.indexOf(propKey) > -1) {
        if (typeof props[propKey] === 'string') {
          let value = parseFloat(props[propKey]);
          value = isNaN(value) ? props[propKey] : value;
          numberProps[propKey] = value;
        }
      }
    });

    return numberProps;
  }

  private combineContentConfig(displayName: string, props: any, config: any) {
    const nameLowerCase = displayName.toLowerCase();

    if (nameLowerCase === 'zoom') {
      config.zoom = {
        ...props,
        componentId: this.componentId,
      };
    } else {
      config[nameLowerCase] = props;
    }

    return config;
  }

  private getProps(allProps: any) {
    const strippingProperties = [
      'Graph', 'graphDiv', 'config', 'context',
      'componentId', 'elem', 'vcRef', 'constructor', 'combineViewConfig', 'convertValueToNum',
      'combineGraphConfig', 'combineContentConfig', 'ngOnInit', 'ngAfterViewInit', 'getProps',
      'changeViewConfig', 'getViewType', 'getViewGraphConfig', 'initGraph', 'ngOnChanges', 'renderGraph',
      'getComponentName',
    ];

    if (allProps) {
      const properties: {
        [key: string]: string,
      } = {};
      for (const key in allProps) {
        if (strippingProperties.indexOf(key) === -1) {
          properties[key] = allProps[key];
        }
      }
      const numberProps = this.convertValueToNum(properties);
      return {
        ...properties,
        ...numberProps,
      };
    }
    return allProps;
  }

  /**
   * Get current class name
   * https://github.com/angular/angular-cli/issues/5168
   */
  private getComponentName() {
    const viewName = this.elem.nativeElement.tagName.toLowerCase();
    const names = viewName.split('-');
    names.shift(); // 去掉v-
    const upperCaseNames = names.map((name: string) => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    });
    return upperCaseNames.join('');
  }

  private initGraph(rerender?: boolean) {
    const name = this.getComponentName();
    const props = this.getProps(this);
    const config = this.context.config;

    if (name === 'Graph') {
      this.combineGraphConfig(props, this.context.config);
      this.combineViewConfig(props, this.context.config);
      this.renderGraph(rerender);
    } else {
      this.combineContentConfig(name, props, config);
    }
    if (rerender) {
      this.renderGraph(true);
    }
  }

  private renderGraph(rerender?: boolean) {
    const name = this.getComponentName();

    if (rerender) {
      if (this.context.timer) {
        window.clearTimeout(this.context.timer);
        this.context.timer = null;
      }
      this.context.timer = setTimeout(() => {
        if (this.context.graph) {
          this.context.graph.reRender(this.context.config);
        } else {
          this.context.config.graph.container = this.context.graphDivElement;
          this.context.graph = new ViserGraph(this.context.config);
          this.context.graph.render();
        }
      }, 90);
    } else if (!this.context.graph && name === 'Graph') {
      this.context.config.graph.container = this.graphDiv.nativeElement;
      this.context.graphDivElement = this.graphDiv.nativeElement;
      this.context.graph = new ViserGraph(this.context.config);
      this.context.graph.render();
    }
  }
}
