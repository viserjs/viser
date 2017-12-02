import { AfterViewInit, Component, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import viser from 'viser';
import { ChartContext } from './chartService';
import IRChart from './typed/IRChart';

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
  chart: any = null;
  viewId: string;

  constructor(private context: ChartContext) {
    this.viewId = context.viewId;
    this.context = context;
  }

  // 同 React Version
  combineViewConfig(props: IRChart, config: any) {
    if (props.data) {
      config.data = props.data;
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

  // 同 React Version
  combineChartConfig(props: any, config: any) {
    const chartRetain = [
      'height', 'width', 'animate', 'forceFit',
      'background', 'plotBackground', 'padding',
    ];
    config.chart = retain(props, chartRetain);
  }

  // 同 React Version
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
      'edge',
      'sankey',
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

  // 同 React Version
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
    if (this.chart) {
      this.chart.destroy();
    }
    this.initChart();
  }

  getProps(allProps: any) {
    const strippingProperties = ['chart', 'chartDiv', 'config', 'context', 'viewId', 'views', 'facetviews',
      'constructor', 'combineViewConfig', 'combineChartConfig', 'combineContentConfig',
      'ngAfterViewInit', 'getProps', 'changeViewConfig', 'getViewChartConfig', 'initChart', 'ngOnChanges', 'renderChart'];

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
    const config = this.context.config;
    const views = this.context.views;
    // this.context.config.chart = this.getViewChartConfig(this.context.config);
    if (name === 'Chart') {
      this.combineChartConfig(props, this.context.config);
      this.combineViewConfig(props, this.context.config);
      this.renderChart(rerender);
    } else if (name === 'Facet') {
      const options = omit(props, 'children');
      config.facet = options;
    } else if (name === 'FacetView') {
      const viewId = generateRandomNum();
      if (!this.context.facetviews[viewId]) {
        this.context.facetviews[viewId] = { viewId };
      }
      const facetview = this.context.facetviews[viewId];
      this.combineContentConfig(
        name,
        props,
        facetview
      );
      this.combineViewConfig(props, facetview);
      // 将 FacetView 下面的子集生成的 json 赋值给 facetViews
      this.context.facetviews[viewId] = {
        ...config,
        ...facetview
      };
      // 清理多余的 facetview 为 true
      delete this.context.facetviews[viewId].facetview;
      this.context.config = {};
    } else if (name === 'View') {
      const viewId = generateRandomNum();
      if (!this.context.views[viewId]) {
        this.context.views[viewId] = { viewId };
      }
      const view = this.context.views[viewId];
      this.combineContentConfig(name, props, view);
      this.combineViewConfig(props, view);
      this.context.views[viewId] = {
        ...config,
        ...view
      };
      // 清理多余的 facetview 为 true
      delete this.context.views[viewId].view;
      this.context.config = {};
    } else {
      this.combineContentConfig(name, props, config);
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
    this.changeViewConfig();
    if (rerender) {
      this.chart.repaint(this.context.config);
    } else {
      this.chart = viser(this.context.config);
    }
  }
}
