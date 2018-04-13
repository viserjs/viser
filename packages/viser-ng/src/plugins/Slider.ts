import { Component, Input, ViewContainerRef } from '@angular/core';
import { PluginComponent } from './Plugin';
import { PluginContext } from './PluginService';

function generateRandomNum() {
  return (Math.floor(new Date().getTime() + Math.random() * 10000)).toString();
}

@Component({
  selector: 'v-slider',
  template: `<div id="{{context.container}}"></div>`,
})
class Slider extends PluginComponent {
  @Input() xAxis: any;
  @Input() yAxis: any;
  @Input() data: any;
  @Input() width?: number | string;
  @Input() height?: number | string;
  @Input() padding?: number | number[];
  @Input() start?: string;
  @Input() end?: string;
  @Input() minSpan?: number;
  @Input() maxSpan?: number;
  @Input() scales?: any;
  @Input() backgroundChart?: any;
  @Input() onChange?: any;
}

export { Slider };
