import * as Style from './Style';
import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';

@Component({
  selector: 'Series',
  template: `<div #chartDom></div>`,
})
class Series extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'Pie',
  template: `<div #chartDom></div>`,
})
class Pie extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'Sector',
  template: `<div #chartDom></div>`,
})
class Sector extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'Line',
  template: `<div #chartDom></div>`,
})
class Line extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'SmoothLine',
  template: `<div #chartDom></div>`,
})
class SmoothLine extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'DashLine',
  template: `<div #chartDom></div>`,
})
class DashLine extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'Area',
  template: `<div #chartDom></div>`,
})
class Area extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'StackArea',
  template: `<div #chartDom></div>`,
})
class StackArea extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'SmoothArea',
  template: `<div #chartDom></div>`,
})
class SmoothArea extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'Bar',
  template: `<div #chartDom></div>`,
})
class Bar extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'StackBar',
  template: `<div #chartDom></div>`,
})
class StackBar extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'DodgeBar',
  template: `<div #chartDom></div>`,
})
class DodgeBar extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'Interval',
  template: `<div #chartDom></div>`,
})
class Interval extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'StackInterval',
  template: `<div #chartDom></div>`,
})
class StackInterval extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'DodgeInterval',
  template: `<div #chartDom></div>`,
})
class DodgeInterval extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'Point',
  template: `<div #chartDom></div>`,
})
class Point extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'Funnel',
  template: `<div #chartDom></div>`,
})
class Funnel extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'Pyramid',
  template: `<div #chartDom></div>`,
})
class Pyramid extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'Schema',
  template: `<div #chartDom></div>`,
})
class Schema extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'Box',
  template: `<div #chartDom></div>`,
})
class Box extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'Candle',
  template: `<div #chartDom></div>`,
})
class Candle extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'Polygon',
  template: `<div #chartDom></div>`,
})
class Polygon extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'Contour',
  template: `<div #chartDom></div>`,
})
class Contour extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'Heatmap',
  template: `<div #chartDom></div>`,
})
class Heatmap extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'Edge',
  template: `<div #chartDom></div>`,
})
class Edge extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'Sankey',
  template: `<div #chartDom></div>`,
})
class Sankey extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'ErrorBar',
  template: `<div #chartDom></div>`,
})
class ErrorBar extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: any;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

export {
  Series,
  Pie,
  Sector,
  Line,
  SmoothLine,
  DashLine,
  Area,
  StackArea,
  SmoothArea,
  Bar,
  StackBar,
  DodgeBar,
  Interval,
  StackInterval,
  DodgeInterval,
  Point,
  Funnel,
  Pyramid,
  Schema,
  Box,
  Candle,
  Polygon,
  Contour,
  Heatmap,
  Edge,
  Sankey,
  ErrorBar,
};
