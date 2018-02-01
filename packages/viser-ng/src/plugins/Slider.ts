import { Component, Input, ViewContainerRef } from '@angular/core';
import { PluginComponent } from './Plugin';
import {PluginContext} from './PluginService';

function generateRandomNum() {
  return (Math.floor(new Date().getTime() + Math.random() * 10000)).toString();
}

@Component({
  selector: 'v-slider',
  template: `<div id="{{context.container}}"></div>`,
})

class Slider extends PluginComponent {
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
  @Input() backgroundChart?: any;

}

export { Slider };
