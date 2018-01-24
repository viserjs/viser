import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';

type eventFunc = (ev: any, chart: any) => void;

@Component({
  selector: 'v-brush',
  template: `<div #chartDom></div>`,
})

class Brush extends Chart {
  @Input() canvas: any;
  @Input() startPoint?: object;
  @Input() brushing?: boolean;
  @Input() dragging?: boolean;
  @Input() brushShape?: any;
  @Input() container?: any;
  @Input() polygonPath?: string;
  @Input() style?: object;
  @Input() type?: string;
  @Input() dragable?: boolean;
  @Input() dragoffX?: number;
  @Input() dragoffY?: number;
  @Input() inPlot?: boolean;
  @Input() xField?: string;
  @Input() yField?: string;
  @Input() filter?: boolean;
  @Input() onBrushstart?: eventFunc;
  @Input() onBrushmove?: eventFunc;
  @Input() onBrushend?: eventFunc;
  @Input() onDragstart?: eventFunc;
  @Input() onDragmove?: eventFunc;
  @Input() onDragend?: eventFunc;
}

export { Brush };
