/* tslint:disable */
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { IAxis, IBrush, ICoord, IGuide, ILegend, ISeries, ITooltip } from '../../../viser/src/index';

class Props {}

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
    return null as any;
  }
}

export class Coord extends SubComponent<ICoord> { public displayName = 'Coord'; }
export class Tooltip extends SubComponent<ITooltip> { public displayName = 'Tooltip'; }
export class Legend extends SubComponent<ILegend> { public displayName = 'Legend'; }
export class Guide extends SubComponent<IGuide> { public displayName = 'Guide'; }
export class Axis extends SubComponent<IAxis> { public displayName = 'Axis'; }
export class Brush extends SubComponent<IBrush> { public displayName = 'Brush'; }

export class Series extends SubComponent<ISeries> { public displayName = 'Series'; }
export class Line extends SubComponent<ISeries> { public displayName = 'Line'; }
export class Pie extends SubComponent<ISeries> { public displayName = 'Pie'; }
export class Sector extends SubComponent<ISeries> { public displayName = 'Sector'; }
export class SmoothLine extends SubComponent<ISeries> { public displayName = 'SmoothLine'; }
export class DashLine extends SubComponent<ISeries> { public displayName = 'DashLine'; }
export class StackLine extends SubComponent<ISeries> { public displayName = 'StackLine'; }
export class Area extends SubComponent<ISeries> { public displayName = 'Area'; }
export class StackArea extends SubComponent<ISeries> { public displayName = 'StackArea'; }
export class SmoothArea extends SubComponent<ISeries> { public displayName = 'SmoothArea'; }
export class Bar extends SubComponent<ISeries> { public displayName = 'Bar'; }
export class StackBar extends SubComponent<ISeries> { public displayName = 'StackBar'; }
export class DodgeBar extends SubComponent<ISeries> { public displayName = 'DodgeBar'; }
export class Interval extends SubComponent<ISeries> { public displayName = 'Interval'; }
export class StackInterval extends SubComponent<ISeries> { public displayName = 'StackInterval'; }
export class DodgeInterval extends SubComponent<ISeries> { public displayName = 'DodgeInterval'; }
export class Point extends SubComponent<ISeries> { public displayName = 'Point'; }
export class Funnel extends SubComponent<ISeries> { public displayName = 'Funnel'; }
export class Pyramid extends SubComponent<ISeries> { public displayName = 'Pyramid'; }
export class Schema extends SubComponent<ISeries> { public displayName = 'Schema'; }
export class Box extends SubComponent<ISeries> { public displayName = 'Box'; }
export class Candle extends SubComponent<ISeries> { public displayName = 'Candle'; }
export class Polygon extends SubComponent<ISeries> { public displayName = 'Polygon'; }
export class Contour extends SubComponent<ISeries> { public displayName = 'Contour'; }
export class Heatmap extends SubComponent<ISeries> { public displayName = 'Heatmap'; }
export class Edge extends SubComponent<ISeries> { public displayName = 'Edge'; }
export class Sankey extends SubComponent<ISeries> { public displayName = 'Sankey'; }
export class ErrorBar extends SubComponent<ISeries> { public displayName = 'ErrorBar'; }
export class JitterPoint extends SubComponent<ISeries> { public displayName = 'JitterPoint'; }
export class Path extends SubComponent<ISeries> { public displayName = 'Path'; }
export class Venn extends SubComponent<ISeries> { public displayName = 'Venn'; }
