import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';

@Component({
  selector: 'v-series',
  template: `<div #chartDom></div>`,
})
class Series extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-pie',
  template: `<div #chartDom></div>`,
})
class Pie extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-sector',
  template: `<div #chartDom></div>`,
})
class Sector extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-line',
  template: `<div #chartDom></div>`,
})
class Line extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-smooth-line',
  template: `<div #chartDom></div>`,
})
class SmoothLine extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-dash-line',
  template: `<div #chartDom></div>`,
})
class DashLine extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-area',
  template: `<div #chartDom></div>`,
})
class Area extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-stack-area',
  template: `<div #chartDom></div>`,
})
class StackArea extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-smooth-area',
  template: `<div #chartDom></div>`,
})
class SmoothArea extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-bar',
  template: `<div #chartDom></div>`,
})
class Bar extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-stack-bar',
  template: `<div #chartDom></div>`,
})
class StackBar extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-dodge-bar',
  template: `<div #chartDom></div>`,
})
class DodgeBar extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-interval',
  template: `<div #chartDom></div>`,
})
class Interval extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-stack-interval',
  template: `<div #chartDom></div>`,
})
class StackInterval extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-dodge-interval',
  template: `<div #chartDom></div>`,
})
class DodgeInterval extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-point',
  template: `<div #chartDom></div>`,
})
class Point extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-funnel',
  template: `<div #chartDom></div>`,
})
class Funnel extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-pyramid',
  template: `<div #chartDom></div>`,
})
class Pyramid extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-schema',
  template: `<div #chartDom></div>`,
})
class Schema extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-box',
  template: `<div #chartDom></div>`,
})
class Box extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-candle',
  template: `<div #chartDom></div>`,
})
class Candle extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-polygon',
  template: `<div #chartDom></div>`,
})
class Polygon extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-contour',
  template: `<div #chartDom></div>`,
})
class Contour extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-heatmap',
  template: `<div #chartDom></div>`,
})
class Heatmap extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-edge',
  template: `<div #chartDom></div>`,
})
class Edge extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-sankey',
  template: `<div #chartDom></div>`,
})
class Sankey extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
  @Input() opacity?: any;
  @Input() label?: any;
  @Input() tooltip?: any;
  @Input() style?: object;
  @Input() select?: any;
  @Input() active?: boolean;
  @Input() animate?: boolean | object;
}

@Component({
  selector: 'v-error-bar',
  template: `<div #chartDom></div>`,
})
class ErrorBar extends Chart {
  @Input() quickType?: string;
  @Input() position?: string | string[];
  @Input() gemo?: string;
  @Input() adjust?: string | string[] | object[];
  @Input() color?: any;
  @Input() shape?: any;
  @Input() size?: number;
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
