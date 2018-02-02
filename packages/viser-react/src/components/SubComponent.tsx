import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ICoord, ITooltip, ILegend, IGuide, IAxis, ISeries, IBrush } from 'viser';

class Props {}

class SubComponent<T = {}> extends React.Component<Props & T, any> {
  static contextTypes = {
    centralizedUpdates: PropTypes.func,
    hasInViews: PropTypes.bool,
    viewId: PropTypes.string,
    viewType: PropTypes.string,
  };

  displayName = 'SubComponent';

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

export class Coord extends SubComponent<ICoord> { displayName = 'Coord'; }
export class Tooltip extends SubComponent<ITooltip> { displayName = 'Tooltip'; }
export class Legend extends SubComponent<ILegend> { displayName = 'Legend'; }
export class Guide extends SubComponent<IGuide> { displayName = 'Guide'; }
export class Axis extends SubComponent<IAxis> { displayName = 'Axis'; }
export class Brush extends SubComponent<IBrush> { displayName = 'Brush'; }

export class Series extends SubComponent<ISeries> { displayName = 'Series'; }
export class Line extends SubComponent<ISeries> { displayName = 'Line'; }
export class Pie extends SubComponent<ISeries> { displayName = 'Pie'; }
export class Sector extends SubComponent<ISeries> { displayName = 'Sector'; }
export class SmoothLine extends SubComponent<ISeries> { displayName = 'SmoothLine'; }
export class DashLine extends SubComponent<ISeries> { displayName = 'DashLine'; }
export class Area extends SubComponent<ISeries> { displayName = 'Area'; }
export class StackArea extends SubComponent<ISeries> { displayName = 'StackArea'; }
export class SmoothArea extends SubComponent<ISeries> { displayName = 'SmoothArea'; }
export class Bar extends SubComponent<ISeries> { displayName = 'Bar'; }
export class StackBar extends SubComponent<ISeries> { displayName = 'StackBar'; }
export class DodgeBar extends SubComponent<ISeries> { displayName = 'DodgeBar'; }
export class Interval extends SubComponent<ISeries> { displayName = 'Interval'; }
export class StackInterval extends SubComponent<ISeries> { displayName = 'StackInterval'; }
export class DodgeInterval extends SubComponent<ISeries> { displayName = 'DodgeInterval'; }
export class Point extends SubComponent<ISeries> { displayName = 'Point'; }
export class Funnel extends SubComponent<ISeries> { displayName = 'Funnel'; }
export class Pyramid extends SubComponent<ISeries> { displayName = 'Pyramid'; }
export class Schema extends SubComponent<ISeries> { displayName = 'Schema'; }
export class Box extends SubComponent<ISeries> { displayName = 'Box'; }
export class Candle extends SubComponent<ISeries> { displayName = 'Candle'; }
export class Polygon extends SubComponent<ISeries> { displayName = 'Polygon'; }
export class Contour extends SubComponent<ISeries> { displayName = 'Contour'; }
export class Heatmap extends SubComponent<ISeries> { displayName = 'Heatmap'; }
export class Edge extends SubComponent<ISeries> { displayName = 'Edge'; }
export class Sankey extends SubComponent<ISeries> { displayName = 'Sankey'; }
export class ErrorBar extends SubComponent<ISeries> { displayName = 'ErrorBar'; }
export class JitterPoint extends SubComponent<ISeries> { displayName = 'JitterPoint'; }
export class Path extends SubComponent<ISeries> { displayName = 'Path'; }
