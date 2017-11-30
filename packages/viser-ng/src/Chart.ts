import { AfterViewInit, Component, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import viser from 'viser';
import { ChartContext } from './chartService';

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

interface IBackground {
  stroke: string;
  strokeOpacity: number;
  lineWidth: number;
  fill: string;
  fillOpactiy: number;
  radius: number
}

@Component({
  providers: [ChartContext],
  selector: 'Chart',
  template: `<div #chartDom></div>`
})
export class Chart implements AfterViewInit, OnChanges {
  @Input() data?: any;
  @Input() dataMapping?: object[];
  @Input() dataPre?: {
    connector?: string;
    source?: any;
    transform?: object[] | object;
  };
  @Input() height?: number;
  @Input() width?: number;
  @Input() animate?: boolean;
  @Input() forceFit?: boolean;
  @Input() background?: any;
  @Input() plotBackground?: any;
  @Input() padding?: number | object | number[];
  @Input() scale?: object[];
  @Input() dataView?: string;
  @ViewChild('chartDom') chartDiv?: any;

  config: any = {};
  views: any = {};
  chart: any = null;
  viewId: string;

  constructor(private context: ChartContext) {
    this.viewId = context.viewId;
    this.context = context;
  }

  combineViewConfig(props: any, config: any) {
    if (props.data) {
      config.data = props.data;
    }
    if (props.dataMapping) {
      config.dataMapping = props.dataMapping;
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

  combineChartConfig(props: any, config: any) {
    const chartRetain = [
      'height', 'width', 'animate', 'forceFit',
      'background', 'plotBackground', 'padding',
    ];
    config.chart = retain(props, chartRetain);
  }

  combineContentConfig(displayName: string, props: any, config: any) {
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
      'edge',
      'sankey',
    ];

    if (regSeries.indexOf(nameLowerCase) >= 0) {
      if (!config.series) {
        config.series = [];
      }

      config.series.push({
        quickType: firstLowerCase(displayName),
        ...props
      });
    } else if (isOwnEmpty(props)) {
      config[nameLowerCase] = true;
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

  getProps(allProps: any) {
    const strippingProperties = ['chart', 'chartDiv', 'config', 'context', 'viewId', 'views',
      'constructor', 'combineViewConfig', 'combineChartConfig', 'combineContentConfig',
      'ngAfterViewInit', 'getProps', 'getViewChartConfig', 'initChart', 'ngOnChanges', 'renderChart'];

    if (allProps) {
      const properties: {
        [key: string]: string
      } = {};
      for (const key in allProps) {
        if (strippingProperties.indexOf(key) === -1) {
          properties[key] = allProps[key];
        }
      }
      return properties;
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

  initChart(rerender?: any) {
    const name = this.constructor.name;
    const props = this.getProps(this);
    this.combineContentConfig(name, props, this.context.config);
    this.combineChartConfig(props, this.context.config);
    this.combineViewConfig(props, this.context.config);
    this.context.config.chart = this.getViewChartConfig(this.context.config);
    if (this.constructor.name === 'Chart') {
      this.renderChart(rerender);
    } else if (this.constructor.name === 'Facet') {
      this.context.config.facet.views = {
        ...this.context.config.facet.views,
        ...this.context.config,
        series: this.context.config.series && this.context.config.series[0]
      };
      delete this.context.config.series;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.chart) {
      return;
    }
    this.initChart(true);
  }

  renderChart(rerender?: any) {
    this.context.config.chart.container = this.chartDiv.nativeElement;
console.log(this.context.config)
    if (rerender) {
      this.chart.repaint(this.context.config);
    } else {
      this.chart = viser(this.context.config);
    }
  }
}
