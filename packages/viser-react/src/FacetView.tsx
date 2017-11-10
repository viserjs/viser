import * as React from 'react';
import * as PropTypes from 'prop-types';

class Props {
}

function generateRandomNum() {
  return (+(new Date()) + parseInt(Math.random() * 10000, 10)).toString();
}

export default class FacetView extends React.Component<Props, any> {
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

  constructor(props: Props) {
    super(props);

    this.state = {
      hasInViews: true,
      viewId: generateRandomNum(),
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
    return <div>{this.props.children}</div>;
  }
}
