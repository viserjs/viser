import * as React from 'react';
import * as PropTypes from 'prop-types';

class Props {}

export default class SubComponent extends React.Component<Props, any> {
  static contextTypes = {
    centralizedUpdates: PropTypes.func,
    hasInViews: PropTypes.bool,
    viewId: PropTypes.string,
    viewType: PropTypes.string,
  };

  displayName = 'SubComponent';

  constructor(props: Props) {
    super(props);
  }

  componentDidUpdate() {
    this.context.centralizedUpdates(this);
  }

  componentDidMount() {
    this.context.centralizedUpdates(this);
  }

  render() {
    return null;
  }
}
