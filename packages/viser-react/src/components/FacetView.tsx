import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IView } from 'viser';

const isReact16 = (ReactDOM as any).createPortal !== undefined;

function generateRandomNum() {
  return (Math.floor(new Date().getTime() + Math.random() * 10000)).toString();
}

export default class FacetView extends React.Component<IView, any> {
  public static childContextTypes = {
    hasInViews: PropTypes.bool,
    viewId: PropTypes.string,
    viewType: PropTypes.string,
  };

  public static contextTypes = {
    centralizedUpdates: PropTypes.func,
    hasInViews: PropTypes.bool,
    viewType: PropTypes.string,
  };

  public displayName = 'FacetView';

  constructor(props: IView) {
    super(props);

    this.state = {
      hasInViews: true,
      viewId: this.props.viewId || generateRandomNum(),
      viewType: 'facet',
    };
  }

  public getChildContext() {
    return {
      hasInViews: this.state.hasInViews,
      viewId: this.state.viewId,
      viewType: this.state.viewType,
    };
  }

  public componentDidUpdate() {
    this.context.centralizedUpdates(this);
  }

  public componentDidMount() {
    this.context.centralizedUpdates(this);
  }

  public render() {
    if (isReact16) {
      return this.props.children as React.ReactElement<any>;
    } else {
      return React.Children.only(this.props.children);
    }
  }
}
