import * as React from 'react';
import * as PropTypes from 'prop-types';

class Props {}

class SubPlugin<T = {}> extends React.Component<Props & T, any> {
  static contextTypes = {
    centralizedUpdates: PropTypes.func,
  };

  displayName = 'SubPlugin';

  constructor(props: Props & T) {
    super(props);
  }

  componentDidUpdate() {
    this.context.centralizedUpdates(this);
  }

  componentDidMount() {
    this.context.centralizedUpdates(this);
  }

  render() {
    return null as React.ReactElement<any>;
  }
}

export class Slider extends SubPlugin<any> { displayName = 'Slider'; }