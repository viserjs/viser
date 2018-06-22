import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';

type eventFunc = (ev: any, chart: any) => void;

@Component({
  selector: 'v-brush',
  template: `<div #chartDom></div>`,
})

class Brush extends Chart {
  @Input() public canvas: any;
  @Input() public startPoint?: object;
  @Input() public brushing?: boolean;
  @Input() public dragging?: boolean;
  @Input() public brushShape?: any;
  @Input() public container?: any;
  @Input() public polygonPath?: string;
  @Input() public style?: object;
  @Input() public type?: string;
  @Input() public dragable?: boolean;
  @Input() public dragoffX?: number;
  @Input() public dragoffY?: number;
  @Input() public inPlot?: boolean;
  @Input() public xField?: string;
  @Input() public yField?: string;
  @Input() public filter?: boolean;
  @Input() public onBrushstart?: eventFunc;
  @Input() public onBrushmove?: eventFunc;
  @Input() public onBrushend?: eventFunc;
  @Input() public onDragstart?: eventFunc;
  @Input() public onDragmove?: eventFunc;
  @Input() public onDragend?: eventFunc;
}

export { Brush };
