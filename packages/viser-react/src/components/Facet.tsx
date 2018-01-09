import * as React from 'react';
import * as ReactDOM from "react-dom";
import * as PropTypes from 'prop-types';
import { IFacet } from 'viser';

const isReact16 = ReactDOM.createPortal !== undefined;

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
    if (isReact16) {
      return this.props.children;
    } else {
      return React.Children.only(this.props.children);
    }
  }
}
