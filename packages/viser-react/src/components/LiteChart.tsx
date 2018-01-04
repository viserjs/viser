import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import IRLiteChart from '../typed/IRLiteChart';
import viser from 'viser';

const isReact16 = ReactDOM.createPortal !== undefined;

const createPortal: any = isReact16
  ? ReactDOM.createPortal
  : ReactDOM.unstable_renderSubtreeIntoContainer;

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
  chart: any;
  elm: any;
  container: any;
  config: object = {};
  displayName: string = '';

  constructor(props: IRLiteChart) {
    super(props);
  }

  combineChartConfig(props: IRLiteChart, config: any) {
    const chartRetain = [
      'height',
      'width',
      'animate',
      'forceFit',
      'background',
      'plotBackground',
      'padding'
    ];

    config.chart = retain(props, chartRetain);

    return config;
  }

  combineViewConfig(props: IRLiteChart, config: any) {
    if (props.data) {
      config.data = props.data;
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

  combineSeriesConfig(props: IRLiteChart, config: any) {
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
      'pointJitter',
    ];

    for (const res of regSeries) {
      if (props[res]) {
        config.series = {
          ...config.series,
          quickType: res
        };
        break;
      }
    }

    return config;
  }

  createChartInstance(config: any) {
    let elm = this.elm;

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

    if (!isReact16) {
      createPortal(this, <div>{this.props.children}</div>, this.elm);
    } else {
      createPortal(this.props.children, this.elm);
    }

    this.chart = viser(config);
  }

  repaintChartInstance(config: any) {
    this.combineChartConfig(this.props, this.config);
    this.combineViewConfig(this.props, this.config);
    this.combineSeriesConfig(this.props, this.config);

    if (!isReact16) {
      createPortal(this, <div>{this.props.children}</div>, this.elm);
    } else {
      createPortal(this.props.children, this.elm);
    }

    this.chart.repaint(config);
  }

  clearConfigData() {
    this.config = {};
  }

  componentDidMount() {
    this.createChartInstance(this.config);
    this.clearConfigData();
  }

  componentDidUpdate() {
    this.repaintChartInstance(this.config);
    this.clearConfigData();
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    this.elm = this.container = null;
  }

  portalRef = (container: any) => {
    if (!this.container) {
      this.container = container;
    }
  };

  render() {
    return <div ref={this.portalRef}>{this.props.children}</div>;
  }
}
