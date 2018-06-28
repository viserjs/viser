import * as PropTypes from 'prop-types';
import * as React from 'react';

class Props {}

// tslint:disable-next-line:max-classes-per-file
class SubComponent<T = {}> extends React.Component<Props & T, any> {
  public static contextTypes = {
    centralizedUpdates: PropTypes.func,
    hasInViews: PropTypes.bool,
    viewId: PropTypes.string,
    viewType: PropTypes.string,
  };

  public displayName = 'SubComponent';

  constructor(props: Props & T) {
    super(props);
  }

  public componentDidUpdate() {
    this.context.centralizedUpdates(this);
  }

  public componentDidMount() {
    this.context.centralizedUpdates(this);
  }

  public render() {
    return null;
  }
}

// tslint:disable-next-line:max-classes-per-file
export class Zoom extends SubComponent<any> { public displayName = 'Zoom'; }
// tslint:disable-next-line:max-classes-per-file
export class Node extends SubComponent<any> { public displayName = 'Node'; }
// tslint:disable-next-line:max-classes-per-file
export class Edge extends SubComponent<any> { public displayName = 'Edge'; }
