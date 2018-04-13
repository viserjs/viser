import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';
import * as viser from 'viser';

function firstLowerCase(str: string) {
  return str.replace(/^\S/, (s: any) => {
    return s.toLowerCase();
  });
}

function generateRandomNum() {
  return (Math.floor(new Date().getTime() + Math.random() * 10000)).toString();
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
    const props = _.clone(unit.props);
    const displayName = unit.displayName;
    if (displayName === 'Slider') {
      const container = props.container;
      if (!container || !document.getElementById(container)) {
        props.container = unit.state.containerId;
      }
    }
    this.combineContentConfig(
      displayName,
      props,
      config
    );
  };

  createSliderInstance(config: any) {
    viser.Plugin(config);
  }

  clearConfigData() {
    this.config = {};
  }

  componentDidMount() {
    this.createSliderInstance(this.config);
    this.clearConfigData();
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
