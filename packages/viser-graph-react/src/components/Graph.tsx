import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ViserGraph } from '../../../viser-graph/src';

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

function isOwnEmpty(obj: object) {
  for (const name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false;
    }
  }
  return true;
}

export default class Graph extends React.Component<any, any> {
  public static childContextTypes = {
    centralizedUpdates: PropTypes.func,
  };

  public chart: any;
  public container: any;
  public config: any = {};

  constructor(props: any) {
    super(props);
    this.config.data = props.data;
  }

  public getChildContext() {
    return {
      centralizedUpdates: this.centralizedUpdates,
    };
  }

  public combineChartConfig(props: any) {
    const chartRetain = [
      'height', 'width', 'animate',
      'fitView', 'fitViewPadding', 'type', 'layout',
    ];
    this.config.graph = retain(props, chartRetain);

    const eventRetain = [
      'onMouseDown', 'onMouseMove', 'onMouseUp',
      'onClick', 'onDbClick',
      'onTouchStart', 'onTouchMove', 'onTouchEnd',
      'onPlotEnter', 'onPlotMove', 'onPlotLeave',
      'onPlotClick', 'onPlotDbClick',
      'onAfterchange',
    ];

    this.config.events = retain(props, eventRetain);
  }

  public combineContentConfig(displayName: string, props: any, config: any) {
    const realName = firstLowerCase(displayName);
    const nameLowerCase = displayName.toLowerCase();

    const regSeries = [
      'zoom',
      'node',
      'edge',
    ];
    // tslint:disable-next-line:prefer-conditional-expression
    if (((regSeries.indexOf(realName) < 0) && isOwnEmpty(props))) {
      config[nameLowerCase] = true;
    } else {
      config[nameLowerCase] = props;
    }

    return config;
  }

  public centralizedUpdates = (unit: any) => {
    const config = this.config;
    const props = unit.props;
    const displayName = unit.displayName;
    this.combineContentConfig(displayName, props, config);
  }

  public createChartInstance() {
    if (this.chart) {
      this.chart.destroy();
    }

    this.combineChartConfig(this.props);

    this.config.graph.container = this.container;
    this.chart = new ViserGraph(this.config).render();
  }

  public repaintChartInstance() {
    this.combineChartConfig(this.props);

    if (this.chart) {
      this.chart.repaint(this.config);
    } else {
      this.config.graph.container = this.container;
      this.chart = new ViserGraph(this.config).render();
    }
  }

  public clearConfigData() {
    this.config = {};
  }

  public componentDidMount() {
    this.createChartInstance();
    this.clearConfigData();
  }

  public componentDidUpdate(props: any) {
    this.repaintChartInstance();
    this.clearConfigData();
  }

  public componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    this.container = null;
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
