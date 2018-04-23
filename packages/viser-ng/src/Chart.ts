import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import viser, { IScale } from 'viser';
import { ChartContext } from './chartService';
import { IRChart } from './typed/IRChart';

function firstLowerCase(str: string) {
  return str.replace(/^\S/, (s: any) => {
    return s.toLowerCase();
  });
}

function generateRandomNum() {
  return (Math.floor(new Date().getTime() + Math.random() * 10000)).toString();
}

function isOwnEmpty(obj: any) {
  for (const name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false;
    }
  }
  return true;
}

function retain(obj: any, attr: string[]) {
  const newObj = Object.create(null);

  for (const item in obj) {
    if (obj.hasOwnProperty(item)) {
      const arrAttr = Array.isArray(attr) ? attr : [attr];

      if (arrAttr.indexOf(item) >= 0) {
        newObj[item] = obj[item];
      }
    }
  }

  return newObj;
}

function omit(obj: any, attr: string) {
  const newObj = Object.create(null);

  for (const item in obj) {
    if (obj.hasOwnProperty(item)) {
      const arrAttr = Array.isArray(attr) ? attr : [attr];

      if (arrAttr.indexOf(item) < 0) {
        newObj[item] = obj[item];
      }
    }
  }

  return newObj;
}

function uniqComponentIdArray(configs: Array<any>) {
  const componentIds: any = {};
  const newConfigs = [];
  for (let i = (configs.length - 1); i >= 0; i--) {
    const config = configs[i];
    if (!componentIds[config.componentId]) {
      newConfigs.push(config);
      componentIds[config.componentId] = true;
    }
  }
  newConfigs.sort((ca: any, cb: any) => {
    return parseInt(ca.componentId, 10) - parseInt(cb.componentId, 10)
  });
  return newConfigs;
}

type eventFunc = (chart: any, ev: any) => void;

interface IBackground {
  stroke?: string;
  strokeOpacity?: number;
  lineWidth?: number;
  fill?: string;
  fillOpactiy?: number;
  radius?: number;
}

@Component({
  providers: [ChartContext],
  selector: 'v-chart',
  template: `<div #chartDom></div>`
})
export class Chart implements AfterViewInit, OnChanges {
  @Input() data?: any;
  @Input() height?: number;
  @Input() width?: number;
  @Input() animate?: boolean | object;
  @Input() forceFit?: boolean;
  @Input() background?: IBackground;
  @Input() plotBackground?: IBackground;
  @Input() padding?: number | object | number[];
  @Input() scale?: IScale;
  @Input() onMouseDown?: eventFunc;
  @Input() onMouseMove?: eventFunc;
  @Input() onMouseLeave?: eventFunc;
  @Input() onMouseUp?: eventFunc;
  @Input() onClick?: eventFunc;
  @Input() onDbClick?: eventFunc;
  @Input() onTouchStart?: eventFunc;
  @Input() onTouchMove?: eventFunc;
  @Input() onTouchEnd?: eventFunc;
  @Input() onPlotEnter?: eventFunc;
  @Input() onPlotMove?: eventFunc;
  @Input() onPlotLeave?: eventFunc;
  @Input() onPlotClick?: eventFunc;
  @Input() onPlotDbClick?: eventFunc;
  @ViewChild('chartDom') chartDiv?: any;
  config: any = {};
  private viewId: string = generateRandomNum();
  private componentId = generateRandomNum();
  private elem: any;
  private vcRef: any;

  constructor(private context: ChartContext, elem: ElementRef, vcRef: ViewContainerRef) {
    this.context = context;
    this.elem = elem;
    this.vcRef = vcRef;

    const name = this.getComponentName();
    const viewType = this.getViewType();

    const hasInViews = ['v-facet-view', 'v-view'].indexOf(viewType) !== -1;
    if (['FacetView', 'View'].indexOf(name) > -1) {
      this.context.lastFacetId = this.viewId || this.componentId;
    } else if (hasInViews) {
      this.viewId = this.context.lastFacetId;
    }
  }

  combineViewConfig(props: IRChart, config: any) {
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

  combineChartConfig(props: any, config: any) {
    const chartRetain = [
      'height', 'width', 'animate', 'forceFit',
      'background', 'plotBackground', 'padding',
      'onMouseDown', 'onMouseMove', 'onMouseUp',
      'onClick', 'onDbClick',
      'onTouchStart', 'onTouchMove', 'onTouchEnd',
      'onPlotEnter', 'onPlotMove', 'onPlotLeave',
      'onPlotClick', 'onPlotDbClick'
    ];
    config.chart = retain(props, chartRetain);
  }

  convertValueToNum(props: any) {
    const numberProps: any = {};
    const numberKeys = ['radius', 'innerRadius', 'size', 'offsetX', 'offsetY', 'cols', 'padding', 'opacity', 'startAngle', 'endAngle'];
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
  combineContentConfig(displayName: string, props: IRChart, config: any) {
    const realName = firstLowerCase(displayName);
    const nameLowerCase = displayName.toLowerCase();

    const regSeries = [
      'pie',
      'sector',
      'line',
      'smoothLine',
      'dashLine',
      'area',
      'stackArea',
      'smoothArea',
      'bar',
      'stackBar',
      'dodgeBar',
      'interval',
      'stackInterval',
      'dodgeInterval',
      'point',
      'funnel',
      'pyramid',
      'schema',
      'box',
      'candle',
      'polygon',
      'contour',
      'heatmap',
      'edge',
      'sankey',
      'errorBar',
      'jitterPoint',
      'path',
    ];

    if (regSeries.indexOf(realName) < 0 && isOwnEmpty(props)) {
      config[nameLowerCase] = true;
    } else if (regSeries.indexOf(realName) >= 0) {
      if (!config.series) {
        config.series = [];
      }
      config.series.push({
        quickType: realName,
        ...props,
        componentId: this.componentId
      });
      config.series = uniqComponentIdArray(config.series);
    } else if (nameLowerCase === 'axis') {
      if (!config.axis) {
        config.axis = [];
      }
      config.axis.push({
        ...props,
        componentId: this.componentId
      });
      config.axis = uniqComponentIdArray(config.axis);
    } else if (nameLowerCase === 'series') {
      if (!config.series) {
        config.series = [];
      }
      config.series.push({
        ...props,
        componentId: this.componentId
      });
      config.series = uniqComponentIdArray(config.series);
    } else if (nameLowerCase === 'guide') {
      if (!config.guide) {
        config.guide = [];
      }
      config.guide.push({
        ...props,
        componentId: this.componentId
      });
      config.guide = uniqComponentIdArray(config.guide);
    } else if (nameLowerCase === 'legend') {
      if (!config.legend) {
        config.legend = [];
      }
      config.legend.push({
        ...props,
        componentId: this.componentId
      });
      config.legend = uniqComponentIdArray(config.legend);
    } else {
      config[nameLowerCase] = props;
    }

    return config;
  }

  changeViewConfig() {
    const views = this.context.views;
    const facetviews = this.context.facetviews;
    const config = this.context.config;

    if (!isOwnEmpty(views)) {
      config.views = [];

      for (const item in views) {
        if (views.hasOwnProperty(item)) {
          config.views.push(views[item]);
        }
      }
    }

    if (!isOwnEmpty(facetviews)) {
      config.facet.views = [];

      for (const item in facetviews) {
        if (facetviews.hasOwnProperty(item)) {
          config.facet.views.push(facetviews[item]);
        }
      }
    }
  }

  ngAfterViewInit() {
    if (this.context.chart) {
      this.context.chart.destroy();
    }
    this.initChart();
  }

  getProps(allProps: any) {
    const strippingProperties = ['chart', 'chartDiv', 'config', 'context', 'viewId','facetviews', 'componentId', 'elem', 'vcRef',
      'constructor', 'combineViewConfig', 'convertValueToNum', 'combineChartConfig', 'combineContentConfig',
      'ngOnInit', 'ngAfterViewInit', 'getProps', 'changeViewConfig', 'getViewType', 'getViewChartConfig', 'initChart', 'ngOnChanges', 'renderChart'];
    if (['FacetView', 'View'].indexOf(this.getComponentName()) < 0) {
      strippingProperties.push('viewId');
    }
    if (allProps) {
      const properties: {
        [key: string]: string
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

  getViewChartConfig(config: any) {
    const chartProperties = ['forceFit', 'height', 'width', 'container'];
    const chart: {
      [key: string]: string
    } = {};
    if (config.chart) {
      for (const key in config.chart) {
        if (chartProperties.indexOf(key) > -1) {
          chart[key] = config.chart[key];
        }
      }
    }
    return chart;
  }

  getViewType() {
    return this.vcRef.parentInjector.elDef.element.name;
  }

  /**
   * 获取当前组件的类名
   * https://github.com/angular/angular-cli/issues/5168
   */
  getComponentName() {
    const viewName = this.elem.nativeElement.tagName.toLowerCase();
    const names = viewName.split('-');
    names.shift(); // 去掉v-
    const upperCaseNames = names.map((name: string) => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    });
    return upperCaseNames.join('');
  }

  initChart(rerender?: boolean) {
    const name = this.getComponentName();
    const props = this.getProps(this);
    const config = this.context.config;
    const views = this.context.views;
    const viewType = this.getViewType();
    const hasInViews = ['v-facet-view', 'v-view'].indexOf(viewType) !== -1;
    const viewId = this.viewId || this.componentId;

    if (name === 'Chart') {
      this.combineChartConfig(props, this.context.config);
      this.combineViewConfig(props, this.context.config);
      this.renderChart(rerender);
    } else if (name === 'Facet') {
      const options = omit(props, 'children');
      config.facet = options;
    } else if (name === 'FacetView') {
      if (!this.context.facetviews[viewId]) {
        this.context.facetviews[viewId] = { viewId };
      }
      this.combineViewConfig(props, this.context.facetviews[viewId]);
    } else if (name === 'View') {
      if (!this.context.views[viewId]) {
        this.context.views[viewId] = { viewId };
      }
      this.combineViewConfig(props, this.context.views[viewId]);
    } else {
      if (!hasInViews) {
        this.combineContentConfig(name, props, config);
      } else {
        if (viewType === 'v-view') {
          if (!this.context.views[viewId]) {
            this.context.views[viewId] = { viewId };
          }
          this.combineContentConfig(name, props, this.context.views[viewId]);
        } else if (viewType === 'v-facet-view') {
          if (!this.context.facetviews[viewId]) {
            this.context.facetviews[viewId] = { viewId };
          }
          this.combineContentConfig(
            name,
            props,
            this.context.facetviews[viewId],
          );
        }
      }
    }
    if (rerender) {
      this.renderChart(true);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initChart(true);
  }

  renderChart(rerender?: boolean) {
    this.changeViewConfig();
    const name = this.getComponentName();

    if (rerender) {
      if (this.context.timer) {
        window.clearTimeout(this.context.timer);
        this.context.timer = null;
      }
      this.context.timer = setTimeout(() => {
        if (this.context.chart) {
          this.context.chart.repaint(this.context.config);
        } else {
          this.context.config.chart.container = this.context.chartDivElement;
          this.context.chart = viser(this.context.config);
        }
      }, 90);
    } else if (!this.context.chart && name === 'Chart') {
      this.context.config.chart.container = this.chartDiv.nativeElement;
      this.context.chartDivElement = this.chartDiv.nativeElement;
      this.context.chart = viser(this.context.config);
    }
  }
}
