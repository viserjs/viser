import { AfterViewInit, Component, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import viser, { IViewConfig, ICoord, IDataPre, IScale, IAxis, IGuide, ISeries, ITooltip, IFacet, ILegend } from 'viser';

function generateRandomNum() {
  return (Math.floor(new Date().getTime() + Math.random() * 10000)).toString();
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

@Component({
  providers: [],
  selector: 'v-liteChart',
  template: `<div #chartDom></div>`
})

export class LiteChart implements AfterViewInit, OnChanges {
  @Input() data: any;
  @Input() width?: number;
  @Input() height?: number;
  @Input() dataView?: string;
  @Input() gemo?: string;
  @Input() color?: any[];
  @Input() label?: boolean;
  @Input() radius?: number;
  @Input() innerRadius?: number;
  @Input() forceFit?: boolean;
  @Input() fields?: any;
  @Input() type?: any;
  @Input() opacity?: any;
  @Input() size?: any;
  @Input() coord?: ICoord;
  @Input() dataPre?: IDataPre;
  @Input() scale?: IScale;
  @Input() axis?: IAxis;
  @Input() guide?: IGuide;
  @Input() series?: ISeries;
  @Input() tooltip?: ITooltip;
  @Input() calData?: any;
  @Input() facet?: IFacet;
  @Input() legend?: ILegend;
  @Input() pie?: boolean;
  @Input() sector?: boolean;
  @Input() line?: boolean;
  @Input() smoothLine?: boolean;
  @Input() dashLine?: boolean;
  @Input() area?: boolean;
  @Input() stackArea?: boolean;
  @Input() smoothArea?: boolean;
  @Input() bar?: boolean;
  @Input() stackBar?: boolean;
  @Input() dodgeBar?: boolean;
  @Input() point?: boolean;
  @Input() funnel?: boolean;
  @Input() pyramid?: boolean;
  @Input() schema?: boolean;
  @Input() box?: boolean;
  @Input() candle?: boolean;
  @Input() polygon?: boolean;
  @Input() contour?: boolean;
  @Input() heatmap?: boolean;
  @Input() edge?: boolean;
  @Input() sankey?: boolean;
  @Input() errorBar?: boolean;
  @ViewChild('chartDom') chartDiv?: any;
  config: any = {};
  views: IViewConfig = {};
  chart: any = null;
  viewId: string;

  constructor() {
    this.viewId = generateRandomNum();
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

  combineChartConfig(props: any, config: any) {
    const chartRetain = [
      'height', 'width', 'animate', 'forceFit',
      'background', 'plotBackground', 'padding',
    ];

    config.chart = retain(props, chartRetain);

    return config;
  }

  combineSeriesConfig(props: any, config: any) {
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
      'errobBar',
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

  getProps(allProps: any) {
    const strippingProperties = ['chart', 'chartDiv', 'config', 'context', 'viewId', 'views', 'constructor',
      'combineViewConfig', 'combineChartConfig', 'combineContentConfig', 'ngAfterViewInit', 'getProps',
      'combineSeriesConfig', 'getViewChartConfig', 'initChart', 'ngOnChanges', 'renderChart'];

    if (allProps) {
      const properties: {
        [key: string]: any
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
      [key: string]: any
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

  renderChart(rerender?: any) {
    this.config.chart.container = this.chartDiv.nativeElement;
    if (rerender) {
      this.chart.repaint(this.config);
    } else {
      this.chart = viser(this.config);
    }
  }
}
