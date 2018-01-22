import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin } from '../../../viser/src/index';

function firstLowerCase(str: string) {
  return str.replace(/^\S/, (s: any) => {
    return s.toLowerCase();
  });
}

export default class PluginComponent extends React.Component<any, any> {
  static childContextTypes = {
    centralizedUpdates: PropTypes.func,
  };

  container: any;
  config: any = {};

  constructor(props: any) {
    super(props);
  }

  getChildContext() {
    return {
      centralizedUpdates: this.centralizedUpdates,
    };
  }

  combineContentConfig(displayName: string, props: any, config: any) {
    const realName = firstLowerCase(displayName);
    const nameLowerCase = displayName.toLowerCase();

    config[nameLowerCase] = props;

  }

  centralizedUpdates = (unit: any) => {
    const config = this.config;
    const props = unit.props;
    const displayName = unit.displayName;
    const hasInViews = unit.context.hasInViews;

    this.combineContentConfig(
      displayName,
      props,
      config
    );
  };

  createSliderInstance(config: any) {
    Plugin(config);
  }

  clearConfigData() {
    this.config = {};
  }

  componentDidMount() {
    this.createSliderInstance(this.config);
    this.clearConfigData();
  }

  componentDidUpdate(props: any) {

  }

  componentWillReceiveProps() {

  }

  componentWillUnmount() {

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
