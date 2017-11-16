import * as React from 'react';
import * as PropTypes from 'prop-types';
import { default as FacetProps } from '../types/Facet';

export default class Facet extends React.Component<FacetProps, any> {
  static contextTypes = {
    centralizedUpdates: PropTypes.func,
    hasInViews: PropTypes.bool,
    viewId: PropTypes.string,
  };

  displayName = 'Facet';

  constructor(props) {
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
