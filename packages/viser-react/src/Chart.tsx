import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';
// import viser from 'viser';
import viser from '../../viser/src/index';

const isReact16 = ReactDOM.createPortal !== undefined;

const createPortal = isReact16
  ? ReactDOM.createPortal
  : ReactDOM.unstable_renderSubtreeIntoContainer;

function firstLowerCase(str) {
  return str.replace(/^\S/, (s: any) => {
    return s.toLowerCase();
  });
}

class Props {
  data: any;
  dataDef: object[];
  dataPre?: {
    connector?: string;
    source?: any;
    transform?: object[] | object;
  };
  width?: number;
  height?: number;
  dataView?: string;
}

export default class Chart extends React.Component<Props, any> {
  static childContextTypes = {
    centralizedUpdates: PropTypes.func,
    hasInViews: PropTypes.bool,
    viewType: PropTypes.string,
  };

  chart: any;
  elm: any;
  container: any;
  config: any = {};
  views: any = {};
  facetviews: any = {};

  constructor(props: Props) {
    super(props);
  }

  getChildContext() {
    return {
      centralizedUpdates: this.centralizedUpdates,
      hasInViews: false,
      viewType: 'view',
    };
  }

  combineChartConfig(props, config) {
    const chartOmit = ['data', 'dataDef', 'dataView', 'dataPre', 'children', 'container', 'id', 'scale'];
    config.chart = _.omit(props, chartOmit);
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

    if (props.scale) {
      config.scale = props.scale;
    }
  }

  combineContentConfig(displayName, props, config) {
    const nameLowerCase = displayName.toLowerCase();

    const regSeries = ['pie', 'sector', 'line', 'smoothline', 'dashline', 'area',
    'stackarea', 'smootharea', 'bar', 'stackbar', 'dodgebar', 'point', 'waterfall',
    'funnel', 'pyramid', 'radialbar', 'schema', 'box', 'candle', 'polygon', 'contour',
    'heatmap', 'edge'];

    if (_.isEmpty(props)) {
      config[nameLowerCase] = true;
    } else if (regSeries.indexOf(nameLowerCase) >= 0) {
      if (!config.series) { config.series = []; }

      config.series.push({
        quickType: firstLowerCase(displayName),
        ...props,
      });
    } else if (nameLowerCase === 'axis') {
      if (!config.axis) { config.axis = []; }
      config.axis.push(props);
    } else if (nameLowerCase === 'series') {
      if (!config.series) { config.series = []; }
      config.series.push(props);
    } else if (nameLowerCase === 'guide') {
      if (!config.guide) { config.guide = []; }
      config.guide.push(props);
    } else {
      config[nameLowerCase] = props;
    }

    return config;
  }

  centralizedUpdates = (unit) => {
    const config = this.config;
    const views = this.views;
    const props = unit.props;
    const displayName = unit.displayName;
    const hasInViews = unit.context.hasInViews;

    if (displayName === 'Facet') {
      const options = _.omit(props, 'children');
      config.facet = options;
    } else if (displayName === 'FacetView') {
      const viewId = unit.state.viewId;
      if (!this.facetviews[viewId]) { this.facetviews[viewId] = { viewId }; }
      this.combineViewConfig(props, this.facetviews[viewId]);
    } else if (displayName === 'View') {
      const viewId = unit.state.viewId;
      if (!this.views[viewId]) { this.views[viewId] = { viewId }; }
      this.combineViewConfig(props, this.views[viewId]);
    } else {
      if (!hasInViews) {
        this.combineContentConfig(displayName, props, config);
      } else {
        const viewType = unit.context.viewType;
        const viewId = unit.context.viewId;

        if (viewType === 'view') {
          if (!this.views[viewId]) { this.views[viewId] = { viewId }; }
          this.combineContentConfig(displayName, props, this.views[viewId]);
        } else if (viewType === 'facet') {
          if (!this.facetviews[viewId]) { this.facetviews[viewId] = { viewId }; }
          this.combineContentConfig(displayName, props, this.facetviews[viewId]);
        }
      }
    }
  }

  changeViewConfig() {
    const views = this.views;
    const facetviews = this.facetviews;
    const config = this.config;

    if (!_.isEmpty(views)) {
      config.views = [];

      for (const item in views) {
        if (views.hasOwnProperty(item)) {
          config.views.push(views[item]);
        }
      }
    }

    if (!_.isEmpty(facetviews)) {
      config.facet.views = [];

      for (const item in facetviews) {
        if (facetviews.hasOwnProperty(item)) {
          config.facet.views.push(facetviews[item]);
        }
      }
    }
  }

  createChartInstance(config) {
    let elm = this.elm;

    if (elm) { ReactDOM.unmountComponentAtNode(elm); }
    if (this.chart) { this.chart.destroy(); }

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

    this.changeViewConfig();
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

    this.changeViewConfig();
    this.chart.repaint(this.config);
  }

  clearConfigData() {
    this.config = {};
    this.views = {};
  }

  componentDidMount() {
    this.createChartInstance(this.config);
  }

  componentDidUpdate() {
    this.clearConfigData();
    this.repaintChartInstance(this.config);
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    this.elm = this.container = null;
  }

  portalRef = (container) => {
    if (!this.container) {
      this.container = container;
    }
  }

  render() {
    return <div ref={this.portalRef}>{this.props.children}</div>;
  }
}
