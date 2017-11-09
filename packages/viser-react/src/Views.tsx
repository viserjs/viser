import * as React from 'react';
import * as PropTypes from 'prop-types';

class Props {
}

export default class Views extends React.Component<Props, any> {
  static childContextTypes = {
    hasInViews: PropTypes.bool,
    viewId: PropTypes.number,
  };

  static contextTypes = {
    centralizedUpdates: PropTypes.func,
    hasInViews: PropTypes.bool,
  };

  displayName = 'Views';

  constructor(props: Props) {
    super(props);

    this.state = {
      hasInViews: true,
      viewId: +(new Date()) + parseInt(Math.random() * 10000, 10),
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
