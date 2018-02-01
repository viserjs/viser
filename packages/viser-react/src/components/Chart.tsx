import * as React from 'react';
import * as PropTypes from 'prop-types';
import viser from 'viser';
import IRChart from '../typed/IRChart';

function firstLowerCase(str: string) {
  return str.replace(/^\S/, (s: any) => {
    return s.toLowerCase();
  });
}

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

function omit(obj: any, attr: any) {
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

function isOwnEmpty(obj: object) {
  for (const name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false;
    }
  }
  return true;
}

export default class Chart extends React.Component<IRChart, any> {
  static childContextTypes = {
    centralizedUpdates: PropTypes.func,
    hasInViews: PropTypes.bool,
    viewType: PropTypes.string
  };

  chart: any;
  container: any;
  config: any = {};
  views: any = {};
  facetviews: any = {};

  constructor(props: IRChart) {
    super(props);
  }

  getChildContext() {
    return {
      centralizedUpdates: this.centralizedUpdates,
      hasInViews: false,
      viewType: 'view',
    };
  }

  combineChartConfig(props: IRChart, config: any) {
    const chartRetain = [
      'height', 'width', 'animate', 'forceFit',
      'background', 'plotBackground', 'padding',
    ];
    config.chart = retain(props, chartRetain);
  }

  combineViewConfig(props: IRChart, config: any) {
    if (props.data) {
      config.data = props.data;
    }

    if (props.scale) {
      config.scale = props.scale;
    }

    if (props.start) {
      config.start = props.start;
    }

    if (props.end) {
      config.end = props.end;
    }

  }

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
      'jitterPoint',
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

  centralizedUpdates = (unit: any) => {
    const config = this.config;
    const views = this.views;
    const props = unit.props;
    const displayName = unit.displayName;
    const hasInViews = unit.context.hasInViews;

    if (displayName === 'Facet') {
      const options = omit(props, 'children');
      config.facet = options;
    } else if (displayName === 'FacetView') {
      const viewId = unit.state.viewId;
      if (!this.facetviews[viewId]) {
        this.facetviews[viewId] = { viewId };
      }
      this.combineViewConfig(props, this.facetviews[viewId]);
    } else if (displayName === 'View') {
      const viewId = unit.state.viewId;
      if (!this.views[viewId]) {
        this.views[viewId] = { viewId };
      }
      this.combineViewConfig(props, this.views[viewId]);
    } else {
      if (!hasInViews) {
        this.combineContentConfig(displayName, props, config);
      } else {
        const viewType = unit.context.viewType;
        const viewId = unit.context.viewId;

        if (viewType === 'view') {
          if (!this.views[viewId]) {
            this.views[viewId] = { viewId };
          }
          this.combineContentConfig(displayName, props, this.views[viewId]);
        } else if (viewType === 'facet') {
          if (!this.facetviews[viewId]) {
            this.facetviews[viewId] = { viewId };
          }
          this.combineContentConfig(
            displayName,
            props,
            this.facetviews[viewId]
          );
        }
      }
    }
  };

  changeViewConfig() {
    const views = this.views;
    const facetviews = this.facetviews;
    const config = this.config;

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

  createChartInstance(config: any) {
    if (this.chart) {
      this.chart.destroy();
    }

    this.combineChartConfig(this.props, this.config);
    this.combineViewConfig(this.props, this.config);

    config.chart.container = this.container;

    this.changeViewConfig();
    this.chart = viser(config);
  }

  repaintChartInstance(config: any) {
    this.combineChartConfig(this.props, this.config);
    this.combineViewConfig(this.props, this.config);

    this.changeViewConfig();

    if (this.chart) {
      this.chart.repaint(config);
    } else {
      config.chart.container = this.container;
      this.chart = viser(config);
    }
  }

  clearConfigData() {
    this.config = {};
    this.views = {};
  }

  componentDidMount() {
    this.createChartInstance(this.config);
    this.clearConfigData();
  }

  componentDidUpdate(props: IRChart) {
    this.repaintChartInstance(this.config);
    this.clearConfigData();
  }

  componentWillReceiveProps() {

  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    this.container = null;
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
