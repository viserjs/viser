import * as React from 'react';
import * as PropTypes from 'prop-types';

class Props {
  type?: string
  fields?: string[]
}

export default class Facet extends React.Component<Props, any> {
  static contextTypes = {
    centralizedUpdates: PropTypes.func,
    hasInViews: PropTypes.bool,
    viewId: PropTypes.string,
  };

  displayName = 'Facet';

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
    return <div>{this.props.children}</div>;
  }
}
