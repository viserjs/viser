import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IFacet } from 'viser';

export default class Facet extends React.Component<IFacet, any> {
  static contextTypes = {
    centralizedUpdates: PropTypes.func,
    hasInViews: PropTypes.bool,
    viewId: PropTypes.string,
  };

  displayName = 'Facet';

  constructor(props: IFacet) {
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
