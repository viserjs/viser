import * as React from 'react';
import * as PropTypes from 'prop-types';
import { default as ViewProps } from '../types/View';

function generateRandomNum() {
  return (Math.floor(new Date().getTime() + Math.random() * 10000)).toString();
}

export default class View extends React.Component<ViewProps, any> {
  static childContextTypes = {
    hasInViews: PropTypes.bool,
    viewId: PropTypes.number,
  };

  static contextTypes = {
    centralizedUpdates: PropTypes.func,
    hasInViews: PropTypes.bool,
  };

  displayName = 'Views';

  constructor(props) {
    super(props);

    this.state = {
      hasInViews: true,
      viewId: generateRandomNum(),
    };
  }

  getChildContext() {
    return {
      hasInViews: this.state.hasInViews,
      viewId: this.state.viewId,
    };
  }

  componentDidUpdate() {
    this.context.centralizedUpdates(this);
  }

  componentDidMount() {
    this.context.centralizedUpdates(this);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}
