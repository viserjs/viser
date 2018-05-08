import * as PropTypes from 'prop-types';
import * as React from 'react';
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
  public static childContextTypes = {
    centralizedUpdates: PropTypes.func,
  };

  public container: any;
  public config: any = {};

  constructor(props: any) {
    super(props);
  }

  public getChildContext() {
    return {
      centralizedUpdates: this.centralizedUpdates,
    };
  }

  public combineContentConfig(displayName: string, props: any, config: any) {
    const realName = firstLowerCase(displayName);
    const nameLowerCase = displayName.toLowerCase();

    config[nameLowerCase] = props;
  }

  public centralizedUpdates = (unit: any) => {
    const config = this.config;
    const props = unit.props;
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
      config,
    );
  }

  public createSliderInstance(config: any) {
    viser.Plugin(config);
  }

  public clearConfigData() {
    this.config = {};
  }

  public componentDidMount() {
    this.createSliderInstance(this.config);
    this.clearConfigData();
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
