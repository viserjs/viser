import { Component, Input } from '@angular/core';
import { PluginComponent } from './Plugin';

@Component({
  selector: 'v-slider',
  template: `<div></div>`,
})

class Slider extends PluginComponent {
  @Input() container?: any;
  @Input() height?: any;
  @Input() width?: any;
  @Input() padding?: any;
  @Input() start?: any;
  @Input() end?: any;
  @Input() data?: any;
  @Input() xAxis?: any;
  @Input() yAxis?: any;
  @Input() scales?: any;
  @Input() onChange?: any;
}

export { Slider };