import { AfterViewInit, Component, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import viser from 'viser';

function generateRandomNum() {
  return (Math.floor(new Date().getTime() + Math.random() * 10000)).toString();
}

function retain(obj, attr) {
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

@Component({
  providers: [],
  selector: 'LiteChart',
  template: `<div #chartDom></div>`
})

export class LiteChart implements AfterViewInit, OnChanges {
  @Input() data: any;
  @Input() dataMapping?: any;
  @Input() dataPre?: any;
  @Input() width?: number;
  @Input() height?: number;
  @Input() dataView?: string;
  @Input() gemo?: string;
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
  @Input() pie?: any;
  @Input() sector?: any;
  @Input() line?: any;
  @Input() smoothLine?: any;
  @Input() dashLine?: any;
  @Input() area?: any;
  @Input() stackArea?: any;
  @Input() smoothArea?: any;
  @Input() bar?: any;
  @Input() stackBar?: any;
  @Input() dodgeBar?: any;
  @Input() point?: any;
  @Input() waterfall?: any;
  @Input() funnel?: any;
  @Input() pyramid?: any;
  @Input() radialBar?: any;
  @Input() schema?: any;
  @Input() box?: any;
  @Input() candle?: any;
  @Input() polygon?: any;
  @Input() contour?: any;
  @Input() heatmap?: any;
  @Input() edge?: any;
  @ViewChild('chartDom') chartDiv;

  config: any = {};
  views: any = {};
  chart: any = null;
  viewId: string;

  constructor() {
    this.viewId = generateRandomNum();
  }

  combineViewConfig(props, config) {
    if (props.data) {
      config.data = props.data;
    }

    if (props.dataMapping) {
      config.dataMapping = props.dataMapping;
    }

    if (props.dataPre) {
      config.dataPre = props.dataPre;
    }

    if (props.scale) {
      config.scale = props.scale;
    }

    if (props.tooltip) {
      config.tooltip = props.tooltip;
    } else {
      config.tooltip = true;
    }

    if (props.legend) {
      config.legend = props.legend;
    } else {
      config.legend = true;
    }

    if (props.axis) {
      config.axis = props.axis;
    } else {
      config.axis = true;
    }

    if (props.guide) {
      config.guide = props.guide;
    }

    return config;
  }

  combineChartConfig(props, config) {
    const chartRetain = [
      'height', 'width', 'animate', 'forceFit',
      'background', 'plotBackground', 'padding',
    ];

    config.chart = retain(props, chartRetain);

    return config;
  }

  combineSeriesConfig(props, config) {
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
      'point',
      'waterfall',
      'funnel',
      'pyramid',
      'radialBar',
      'schema',
      'box',
      'candle',
      'polygon',
      'contour',
      'heatmap',
      'edge'
    ];

    for (const res of regSeries) {
      if (props[res]) {
        config.series = {
          ...config.series,
          quickType: res,
        };
        break;
      }
    }

    return config;
  }

  ngAfterViewInit() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.initChart();
  }

  getProps(allProps) {
    const strippingProperties = ['chart', 'chartDiv', 'config', 'context', 'viewId', 'views',
      'constructor', 'combineViewConfig', 'combineChartConfig', 'combineContentConfig',
      'ngAfterViewInit', 'getProps', 'combineSeriesConfig', 'getViewChartConfig', 'initChart', 'ngOnChanges', 'renderChart'];

    if (allProps) {
      const properties = {};
      for (const key in allProps) {
        if (strippingProperties.indexOf(key) === -1) {
          properties[key] = allProps[key];
        }
      }
      return properties;
    }
    return allProps;
  }

  getViewChartConfig(config) {
    const chartProperties = ['forceFit', 'height', 'width', 'container'];
    const chart = {};
    if (config.chart) {
      for (const key in config.chart) {
        if (chartProperties.indexOf(key) > -1) {
          chart[key] = config.chart[key];
        }
      }
    }
    return chart;
  }

  initChart(rerender?) {
    const name = this.constructor.name;
    const props = this.getProps(this);
    this.combineChartConfig(props, this.config);
    this.combineViewConfig(props, this.config);
    this.combineSeriesConfig(props, this.config);
    this.config.chart = this.getViewChartConfig(this.config);
    this.renderChart(rerender);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.chart) {
      return;
    }
    this.initChart(true);
  }

  renderChart(rerender?) {
    this.config.chart.container = this.chartDiv.nativeElement;
    if (rerender) {
      this.chart.repaint(this.config);
    } else {
      this.chart = viser(this.config);
    }
  }
}
