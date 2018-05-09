import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IFacet } from 'viser';

const isReact16 = (ReactDOM as any).createPortal !== undefined;

export default class Facet extends React.Component<IFacet, any> {
  public static contextTypes = {
    centralizedUpdates: PropTypes.func,
    hasInViews: PropTypes.bool,
    viewId: PropTypes.string,
  };

  public displayName = 'Facet';

  constructor(props: IFacet) {
    super(props);
  }

  public componentDidUpdate() {
    this.context.centralizedUpdates(this);
  }

  public componentDidMount() {
    this.context.centralizedUpdates(this);
  }

  public render() {
    if (!this.props.children) {
      return null;
    }

    if (isReact16) {
      return this.props.children as React.ReactElement<any>;
    } else {
      return React.Children.only(this.props.children);
    }
  }
}
