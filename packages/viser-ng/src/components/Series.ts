/* tslint:disable:max-classes-per-file */
import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';

type eventFunc = (ev: any, chart: any) => void;

@Component({
  selector: 'v-series',
  template: `<div #chartDom></div>`,
})
class Series extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
  @Input() public onLabelMouseDown?: eventFunc;
  @Input() public onLabelMouseMove?: eventFunc;
  @Input() public onLabelMouseLeave?: eventFunc;
  @Input() public onLabelMouseUp?: eventFunc;
  @Input() public onLabelClick?: eventFunc;
  @Input() public onLabelDblClick?: eventFunc;
  @Input() public onLabelTouchStart?: eventFunc;
  @Input() public onLabelTouchMove?: eventFunc;
  @Input() public onLabelTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-pie',
  template: `<div #chartDom></div>`,
})
class Pie extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-sector',
  template: `<div #chartDom></div>`,
})
class Sector extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-line',
  template: `<div #chartDom></div>`,
})
class Line extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-smooth-line',
  template: `<div #chartDom></div>`,
})
class SmoothLine extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-dash-line',
  template: `<div #chartDom></div>`,
})
class DashLine extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-area',
  template: `<div #chartDom></div>`,
})
class Area extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-stack-area',
  template: `<div #chartDom></div>`,
})
class StackArea extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-smooth-area',
  template: `<div #chartDom></div>`,
})
class SmoothArea extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-bar',
  template: `<div #chartDom></div>`,
})
class Bar extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-stack-bar',
  template: `<div #chartDom></div>`,
})
class StackBar extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-dodge-bar',
  template: `<div #chartDom></div>`,
})
class DodgeBar extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-interval',
  template: `<div #chartDom></div>`,
})
class Interval extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-stack-interval',
  template: `<div #chartDom></div>`,
})
class StackInterval extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-dodge-interval',
  template: `<div #chartDom></div>`,
})
class DodgeInterval extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-point',
  template: `<div #chartDom></div>`,
})
class Point extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-funnel',
  template: `<div #chartDom></div>`,
})
class Funnel extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-pyramid',
  template: `<div #chartDom></div>`,
})
class Pyramid extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-schema',
  template: `<div #chartDom></div>`,
})
class Schema extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-box',
  template: `<div #chartDom></div>`,
})
class Box extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-candle',
  template: `<div #chartDom></div>`,
})
class Candle extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-polygon',
  template: `<div #chartDom></div>`,
})
class Polygon extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-contour',
  template: `<div #chartDom></div>`,
})
class Contour extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-heatmap',
  template: `<div #chartDom></div>`,
})
class Heatmap extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-edge',
  template: `<div #chartDom></div>`,
})
class Edge extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-sankey',
  template: `<div #chartDom></div>`,
})
class Sankey extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-error-bar',
  template: `<div #chartDom></div>`,
})
class ErrorBar extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-jitter-point',
  template: `<div #chartDom></div>`,
})
class JitterPoint extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}

@Component({
  selector: 'v-path',
  template: `<div #chartDom></div>`,
})
class Path extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
}
@Component({
  selector: 'v-venn',
  template: `<div #chartDom></div>`,
})
class Venn extends Chart {
  @Input() public quickType?: string;
  @Input() public position?: string | string[];
  @Input() public gemo?: string;
  @Input() public adjust?: string | string[] | object[];
  @Input() public color?: any;
  @Input() public shape?: any;
  @Input() public size?: any;
  @Input() public opacity?: any;
  @Input() public label?: any;
  @Input() public tooltip?: any;
  @Input() public style?: object;
  @Input() public select?: any;
  @Input() public active?: boolean | object | [boolean, object];
  @Input() public animate?: boolean | object;
  @Input() public onMouseDown?: eventFunc;
  @Input() public onMouseMove?: eventFunc;
  @Input() public onMouseLeave?: eventFunc;
  @Input() public onMouseUp?: eventFunc;
  @Input() public onClick?: eventFunc;
  @Input() public onDblClick?: eventFunc;
  @Input() public onTouchStart?: eventFunc;
  @Input() public onTouchMove?: eventFunc;
  @Input() public onTouchEnd?: eventFunc;
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
  JitterPoint,
  Path,
  Venn,
};
