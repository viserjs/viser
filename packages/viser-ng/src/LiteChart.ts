import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import viser, { IAxis, ICoord, IFacet, IGuide, ILegend, IScale, ISeries, ITooltip, IViewConfig } from 'viser';

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
  template: `<div #chartDom></div>`,
})

export class LiteChart implements AfterViewInit, OnChanges {
  @Input() public data: any;
  @Input() public width?: number;
  @Input() public height?: number;
  @Input() public gemo?: string;
  @Input() public color?: any[];
  @Input() public label?: boolean;
  @Input() public radius?: number;
  @Input() public innerRadius?: number;
  @Input() public forceFit?: boolean;
  @Input() public fields?: any;
  @Input() public type?: any;
  @Input() public opacity?: any;
  @Input() public size?: any;
  @Input() public coord?: ICoord;
  @Input() public scale?: IScale;
  @Input() public axis?: IAxis;
  @Input() public guide?: IGuide;
  @Input() public series?: ISeries;
  @Input() public tooltip?: ITooltip;
  @Input() public facet?: IFacet;
  @Input() public legend?: ILegend;
  @Input() public theme?: string;
  @Input() public pie?: boolean;
  @Input() public sector?: boolean;
  @Input() public line?: boolean;
  @Input() public smoothLine?: boolean;
  @Input() public dashLine?: boolean;
  @Input() public area?: boolean;
  @Input() public stackArea?: boolean;
  @Input() public smoothArea?: boolean;
  @Input() public bar?: boolean;
  @Input() public stackBar?: boolean;
  @Input() public dodgeBar?: boolean;
  @Input() public point?: boolean;
  @Input() public funnel?: boolean;
  @Input() public pyramid?: boolean;
  @Input() public schema?: boolean;
  @Input() public box?: boolean;
  @Input() public candle?: boolean;
  @Input() public polygon?: boolean;
  @Input() public contour?: boolean;
  @Input() public heatmap?: boolean;
  @Input() public edge?: boolean;
  @Input() public sankey?: boolean;
  @Input() public errorBar?: boolean;
  @ViewChild('chartDom') public chartDiv?: any;
  public config: any = {};
  public views: IViewConfig = {};
  public chart: any = null;

  public combineViewConfig(props: any, config: any) {
    if (props.data) {
      config.data = props.data;
    }

    if (props.scale) {
      config.scale = props.scale;
    }

    if (props.guide) {
      config.guide = props.guide;
    }

    config.tooltip = props.tooltip ? props.tooltip : true;
    config.legend = props.legend ? props.legend : true;
    config.axis = props.axis ? props.axis : true;

    return config;
  }

  public combineChartConfig(props: any, config: any) {
    const chartRetain = [
      'height', 'width', 'animate', 'forceFit',
      'background', 'plotBackground', 'padding',
    ];

    config.chart = retain(props, chartRetain);

    return config;
  }

  public combineSeriesConfig(props: any, config: any) {
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
      'jitterPoint',
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

  public ngAfterViewInit() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.initChart();
  }

  public getProps(allProps: any) {
    const strippingProperties = ['chart', 'chartDiv', 'config', 'context', 'constructor',
      'combineViewConfig', 'combineChartConfig', 'combineContentConfig', 'ngAfterViewInit', 'getProps',
      'combineSeriesConfig', 'getViewChartConfig', 'initChart', 'ngOnChanges', 'renderChart'];

    if (allProps) {
      const properties: {
        [key: string]: any,
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

  public getViewChartConfig(config: any) {
    const chartProperties = ['forceFit', 'height', 'width', 'container'];
    const chart: {
      [key: string]: any,
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

  public initChart(rerender?: any) {
    const props = this.getProps(this);
    this.combineChartConfig(props, this.config);
    this.combineViewConfig(props, this.config);
    this.combineSeriesConfig(props, this.config);
    this.config.chart = this.getViewChartConfig(this.config);
    this.renderChart(rerender);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (!this.chart) {
      return;
    }
    this.initChart(true);
  }

  public renderChart(rerender?: any) {
    this.config.chart.container = this.chartDiv.nativeElement;
    if (rerender) {
      this.chart.repaint(this.config);
    } else {
      this.chart = viser(this.config);
    }
  }
}
