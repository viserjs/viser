import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import { default as LiteProps } from '../types/Lite';
import viser from 'viser';

const isReact16 = ReactDOM.createPortal !== undefined;

const createPortal: any = isReact16
  ? ReactDOM.createPortal
  : ReactDOM.unstable_renderSubtreeIntoContainer;

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

class Props {}

export default class LiteChart extends React.Component<LiteProps, any> {
  chart: any;
  elm: any;
  container: any;
  config: object = {};
  displayName: string = '';

  constructor(props) {
    super(props);
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

    const displayName = this.displayName;

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

  createChartInstance(config) {
    let elm = this.elm;

    if (elm) {
      ReactDOM.unmountComponentAtNode(elm);
    }

    if (this.chart) {
      this.chart.destroy();
    }

    this.combineChartConfig(this.props, this.config);
    this.combineViewConfig(this.props, this.config);

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

  repaintChartInstance(config) {
    this.combineChartConfig(this.props, this.config);
    this.combineViewConfig(this.props, this.config);

    if (!isReact16) {
      createPortal(this, <div>{this.props.children}</div>, this.elm);
    } else {
      createPortal(this.props.children, this.elm);
    }

    this.chart.repaint(this.config);
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

  portalRef = container => {
    if (!this.container) {
      this.container = container;
    }
  };

  render() {
    return <div ref={this.portalRef}>{this.props.children}</div>;
  }
}
