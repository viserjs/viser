import * as React from 'react';
import * as ReactDOM from "react-dom";
import * as PropTypes from 'prop-types';
import { IFacet } from 'viser';

const isReact16 = (ReactDOM as any).createPortal !== undefined;

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
    if (!this.props.children) {
      return null as React.ReactElement<any>;
    }

    if (isReact16) {
      return this.props.children as React.ReactElement<any>;
    } else {
      return React.Children.only(this.props.children);
    }
  }
}
