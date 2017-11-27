import * as Style from './Style';
import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';

type func = () => void;

interface ILabelSeries {
  dataKey?: string;
  offset?: number;
  textStyle?: Style.ITextStyle;
  callback?: func;
}

interface ITooltipSeries {
  dataKey?: string;
  callback?: func;
}

@Component({
  selector: 'Series',
  template: `<div #chartDom></div>`,
})
class Series extends Chart {
  @Input() position?: string | string[];
  @Input() quickType?: string;
  @Input() gemo?: string;
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'Pie',
  template: `<div #chartDom></div>`,
})
class Pie extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'Sector',
  template: `<div #chartDom></div>`,
})
class Sector extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'Line',
  template: `<div #chartDom></div>`,
})
class Line extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'SmoothLine',
  template: `<div #chartDom></div>`,
})
class SmoothLine extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'DashLine',
  template: `<div #chartDom></div>`,
})
class DashLine extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'Area',
  template: `<div #chartDom></div>`,
})
class Area extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'StackArea',
  template: `<div #chartDom></div>`,
})
class StackArea extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'SmoothArea',
  template: `<div #chartDom></div>`,
})
class SmoothArea extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'Bar',
  template: `<div #chartDom></div>`,
})
class Bar extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'StackBar',
  template: `<div #chartDom></div>`,
})
class StackBar extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'DodgeBar',
  template: `<div #chartDom></div>`,
})
class DodgeBar extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'Point',
  template: `<div #chartDom></div>`,
})
class Point extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'Waterfall',
  template: `<div #chartDom></div>`,
})
class Waterfall extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'Funnel',
  template: `<div #chartDom></div>`,
})
class Funnel extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'Pyramid',
  template: `<div #chartDom></div>`,
})
class Pyramid extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'RadialBar',
  template: `<div #chartDom></div>`,
})
class RadialBar extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'Schema',
  template: `<div #chartDom></div>`,
})
class Schema extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'Box',
  template: `<div #chartDom></div>`,
})
class Box extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'Candle',
  template: `<div #chartDom></div>`,
})
class Candle extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'Polygon',
  template: `<div #chartDom></div>`,
})
class Polygon extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'Contour',
  template: `<div #chartDom></div>`,
})
class Contour extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'Heatmap',
  template: `<div #chartDom></div>`,
})
class Heatmap extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'Edge',
  template: `<div #chartDom></div>`,
})
class Edge extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
}

@Component({
  selector: 'Sankey',
  template: `<div #chartDom></div>`,
})
class Sankey extends Chart {
  @Input() position?: string | string[];
  @Input() adjust?: string;
  @Input() color?: string;
  @Input() shape?: string;
  @Input() size?: number;
  @Input() opacity?: number;
  @Input() label?: string | ILabelSeries;
  @Input() tooltip?: boolean | string | ITooltipSeries;
  @Input() style?: object;
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
  Point,
  Waterfall,
  Funnel,
  Pyramid,
  RadialBar,
  Schema,
  Box,
  Candle,
  Polygon,
  Contour,
  Heatmap,
  Edge,
  Sankey,
};
