import * as React from 'react';
import * as ReactDOM from 'react-dom';
import viser from 'viser';
import IRLiteChart from '../typed/IRLiteChart';

function retain(obj: any, attr: any) {
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

export default class LiteChart extends React.Component<IRLiteChart, any> {
  public chart: any;
  public elm: any;
  public container: any;
  public config: object = {};
  public displayName: string = '';

  constructor(props: IRLiteChart) {
    super(props);
  }

  public combineChartConfig(props: IRLiteChart, config: any) {
    const chartRetain = [
      'height',
      'width',
      'animate',
      'forceFit',
      'background',
      'plotBackground',
      'padding',
    ];

    config.chart = retain(props, chartRetain);

    return config;
  }

  public combineViewConfig(props: IRLiteChart, config: any) {
    if (props.data) {
      config.data = props.data;
    }

    if (props.dataPre) {
      config.dataPre = props.dataPre;
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

  public combineSeriesConfig(props: IRLiteChart, config: any) {
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

  public createChartInstance(config: any) {
    const elm = this.elm;

    if (elm) {
      ReactDOM.unmountComponentAtNode(elm);
    }

    if (this.chart) {
      this.chart.destroy();
    }

    this.combineChartConfig(this.props, this.config);
    this.combineViewConfig(this.props, this.config);
    this.combineSeriesConfig(this.props, this.config);

    const root = document.createElement('div');
    this.container.appendChild(root);

    config.chart.container = root;

    // fake element for rendering children
    this.elm = document.createElement('div');

    this.chart = viser(config);
  }

  public repaintChartInstance(config: any) {
    this.combineChartConfig(this.props, this.config);
    this.combineViewConfig(this.props, this.config);
    this.combineSeriesConfig(this.props, this.config);

    if (this.chart) {
      this.chart.repaint(config);
    } else {
      config.chart.container = this.container;
      this.chart = viser(config);
    }
  }

  public clearConfigData() {
    this.config = {};
  }

  public componentDidMount() {
    this.createChartInstance(this.config);
    this.clearConfigData();
  }

  public componentDidUpdate() {
    this.repaintChartInstance(this.config);
    this.clearConfigData();
  }

  public componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    this.elm = this.container = null;
  }

  public portalRef = (container: any) => {
    if (!this.container) {
      this.container = container;
    }
  }

  public render() {
    return <div ref={this.portalRef}>{this.props.children}</div>;
  }
}
