/* tslint:disable */
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { ISlider } from 'viser';

function generateRandomNum() {
  return (Math.floor(new Date().getTime() + Math.random() * 10000)).toString();
}

class Props {
  container?: string;
}

class SubPlugin<T = {}> extends React.Component<Props & T, any> {
  public static childContextTypes = {
    containerId: PropTypes.string,
  };

  public static contextTypes = {
    centralizedUpdates: PropTypes.func,
  };

  public displayName = 'SubPlugin';

  constructor(props: Props & T) {
    super(props);
    this.state = {
      containerId: props.container || 'viser-slider-' + generateRandomNum(),
    };
  }

  public getChildContext() {
    return {
      containerId: this.state.containerId,
    };
  }

  public componentDidUpdate() {
    this.context.centralizedUpdates(this);
  }

  public componentDidMount() {
    this.context.centralizedUpdates(this);
  }

  public render() {
    const containerId = this.state.containerId;
    return <div id={containerId}></div> as React.ReactElement<any>;
  }
}

export class Slider extends SubPlugin<ISlider> { public displayName = 'Slider'; }
