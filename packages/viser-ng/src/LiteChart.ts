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

    if (props.gemo) {
      config.series = {
        quickType: props.gemo,
      };
    }

    if (props.series) {
      const series = Array.isArray(props.series) ? props.series[0] : props.series;
      config.series = {
        ...config.series,
        ...series,
      };
    }

    return config;
  }

  combineChartConfig(props, config) {
    const chartOmit = [
      'data',
      'dataMapping',
      'dataView',
      'dataPre',
      'children',
      'container',
      'id',
      'scale',
      'legend',
      'tooltip',
      'axis',
      'guide',
    ];

    config.chart = omit(props, chartOmit);
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
      'ngAfterViewInit', 'getProps', 'getViewChartConfig', 'initChart', 'ngOnChanges', 'renderChart'];

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
    console.log('======', this.config);
    if (rerender) {
      this.chart.repaint(this.config);
    } else {
      this.chart = viser(this.config);
    }
  }
}
