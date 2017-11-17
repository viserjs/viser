import { AfterViewInit, Component, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import viser from '../../../packages/viser/src/index';

function firstLowerCase(str) {
  return str.replace(/^\S/, (s: any) => {
    return s.toLowerCase();
  });
}

function generateRandomNum() {
  return (Math.floor(new Date().getTime() + Math.random() * 10000)).toString();
}

function isOwnEmpty(obj) {
  for (const name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false;
    }
  }
  return true;
}

function omit(obj, attr) {
  const newObj = {};

  for (const item in obj) {
    if (obj.hasOwnProperty(item)) {
      const arrAttr = Array.isArray(attr) ? attr : [attr];

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < arrAttr.length; i++) {
        if (arrAttr[i] !== item) {
          newObj[item] = obj[item];
        }
      }
    }
  }

  return newObj;
}

/**
 * 组件内的全局 Context
 */
class Context {
  public viewId: string;
  public config: any = {};
  constructor() {
    this.viewId = generateRandomNum();
  }
}

/**
 * Chart 组件
 */
@Component({
  providers: [Context],
  selector: 'Chart',
  template: `<div #chartDom></div>`
})

export class Chart implements AfterViewInit, OnChanges {
  @Input() data: any;
  @Input() dataDef?: any;
  @Input() dataPre?: any;
  @Input() width?: number;
  @Input() height?: number;
  @Input() dataView?: string;
  @Input() color?: any[];
  @Input() label?: boolean;
  @Input() radius?: number;
  @Input() scale?: any;
  @Input() innerRadius?: number;
  @Input() forceFit?: boolean;
  @Input() fields?: any;
  @Input() type?: any;
  @Input() opacity?: any;
  @Input() size?: any;
  @ViewChild('chartDom') chartDiv;
  config: any = {};
  views: any = {};
  chart: any = null;
  viewId: string;
  context: any;
  constructor(context: Context) {
    this.viewId = context.viewId;
    this.context = context;
  }
  combineViewConfig(props, config) {
    if (props.data) {
      config.data = props.data;
    }
    if (props.dataDef) {
      config.dataDef = props.dataDef;
    }

    if (props.dataPre) {
      config.dataPre = props.dataPre;
    }

    if (props.dataView) {
      config.dataView = props.dataView;
    }

    if (props.scale) {
      config.scale = props.scale;
    }
  }
  combineChartConfig(props, config) {
    const chartOmit = ['data', 'dataDef', 'dataView', 'dataPre', 'children', 'container', 'id', 'scale'];
    config.chart = omit(props, chartOmit);
  }

  combineContentConfig(displayName, props, config) {
    const nameLowerCase = displayName.toLowerCase();

    const regSeries = [
      'pie',
      'sector',
      'line',
      'smoothline',
      'dashline',
      'area',
      'stackarea',
      'smootharea',
      'bar',
      'stackbar',
      'dodgebar',
      'point',
      'waterfall',
      'funnel',
      'pyramid',
      'radialbar',
      'schema',
      'box',
      'candle',
      'polygon',
      'contour',
      'heatmap',
      'edge'
    ];

    if (isOwnEmpty(props)) {
      config[nameLowerCase] = true;
    } else if (regSeries.indexOf(nameLowerCase) >= 0) {
      if (!config.series) {
        config.series = [];
      }

      config.series.push({
        quickType: firstLowerCase(displayName),
        ...props
      });
    } else if (nameLowerCase === 'axis') {
      if (!config.axis) {
        config.axis = [];
      }
      config.axis.push(props);
    } else if (nameLowerCase === 'series') {
      if (!config.series) {
        config.series = [];
      }
      config.series.push(props);
    } else if (nameLowerCase === 'guide') {
      if (!config.guide) {
        config.guide = [];
      }
      config.guide.push(props);
    } else {
      config[nameLowerCase] = props;
    }

    return config;
  }

  ngAfterViewInit() {

    if (this.chart) {
      this.chart.destroy();
    }
    this.initChart();
  }

  getProps() {
    return this;
  }

  initChart(rerender?) {
    const name = this.constructor.name;
    const props = this.getProps();
    this.combineContentConfig(name, this, this.context.config);
    this.combineChartConfig(this, this.context.config);
    this.combineViewConfig(this, this.context.config);
    if (this.constructor.name === 'Chart') {
      this.renderChart(rerender);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.chart) {
      return;
    }
    this.initChart(true);
  }

  /**
   * 渲染图表
   */
  renderChart(rerender?) {
    this.context.config.chart.container = this.chartDiv.nativeElement;
    this.context.config.facet = {
      type: 'rect',
      fields: ['cut', 'clarity'],
      views: {
        axis: true,
        tooltip: true,
        series: {
          quickType: 'point',
          opacity: 0.3,
          size: 3,
        }
      }
    };
    console.log(this.context.config, 'this.context.config');
    if (rerender) {
      this.chart.repaint(this.context.config);
    } else {
      this.chart = viser(this.context.config);
    }
  }
}