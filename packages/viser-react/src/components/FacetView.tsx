import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IView } from 'viser';

function generateRandomNum() {
  return (Math.floor(new Date().getTime() + Math.random() * 10000)).toString();
}

export default class FacetView extends React.Component<IView, any> {
  static childContextTypes = {
    hasInViews: PropTypes.bool,
    viewId: PropTypes.string,
    viewType: PropTypes.string,
  };

  static contextTypes = {
    centralizedUpdates: PropTypes.func,
    hasInViews: PropTypes.bool,
    viewType: PropTypes.string,
  };

  displayName = 'FacetView';

  constructor(props: IView) {
    super(props);

    this.state = {
      hasInViews: true,
      viewId: this.props.viewId || generateRandomNum(),
      viewType: 'facet',
    };
  }

  getChildContext() {
    return {
      hasInViews: this.state.hasInViews,
      viewId: this.state.viewId,
      viewType: this.state.viewType,
    };
  }

  componentDidUpdate() {
    this.context.centralizedUpdates(this);
  }

  componentDidMount() {
    this.context.centralizedUpdates(this);
  }

  render() {
    return this.props.children;
  }
}
