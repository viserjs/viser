import * as React from 'react';
import * as PropTypes from 'prop-types';

function generateRandomNum() {
  return (Math.floor(new Date().getTime() + Math.random() * 10000)).toString();
}

class Props {}

class SubPlugin<T = {}> extends React.Component<Props & T, any> {
  static childContextTypes = {
    containerId: PropTypes.string,
  };

  static contextTypes = {
    centralizedUpdates: PropTypes.func,
  };

  displayName = 'SubPlugin';

  constructor(props: Props & T) {
    super(props);
    this.state = {
      containerId: (this.props as any).container || generateRandomNum(),
    };
  }

  getChildContext() {
    return {
      containerId: this.state.containerId,
    };
  }

  componentDidUpdate() {
    this.context.centralizedUpdates(this);
  }

  componentDidMount() {
    this.context.centralizedUpdates(this);
  }

  render() {
    const containerId = this.state.containerId;
    return <div id={containerId}></div> as React.ReactElement<any>;
  }
}

export class Slider extends SubPlugin<any> { displayName = 'Slider'; }