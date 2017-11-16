import { AfterViewInit, Component, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import viser from 'viser';

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
  @Input() dataDef: object[];
  @Input() dataPre?: any;
  @Input() width?: number;
  @Input() height?: number;
  @Input() dataView?: string;
  @Input() color?: any[];
  @Input() label?: boolean;
  @Input() radius?: number;
  @Input() innerRadius?: number;
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
    this.initChart();
  }

  getProps() {
    return this;
  }

  initChart() {
    const name = this.constructor.name;
    const props = this.getProps();
    this.combineViewConfig(this, this.context.config);
    this.combineContentConfig(name, this, this.context.config);
    if (this.constructor.name === 'Chart') {
      this.renderChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.chart) {
      return;
    }
  }

  /**
   * 渲染图表
   */
  renderChart() {
    this.context.config.chart.container = this.chartDiv.nativeElement;
    this.chart = viser(this.context.config);
  }
}
