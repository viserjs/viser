import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { PluginContext } from './PluginService';
import * as viser from 'viser';
import { Slider } from './Slider';

function firstLowerCase(str: string) {
  return str.replace(/^\S/, (s: any) => {
    return s.toLowerCase();
  });
}

@Component({
  providers: [PluginContext],
  selector: 'v-plugin',
  template: `<div>
    <v-slider></v-slider>
  </div>`
})

export class PluginComponent implements AfterViewInit, OnChanges {
  config: any = {};
  private vcRef: any;

  constructor(private context: PluginContext, vcRef: ViewContainerRef) {
    this.context = context;
    this.vcRef = vcRef;
  }

  ngAfterViewInit() {
    this.initPlugin();
  }

  combineContentConfig(displayName: string, props: any, config: any) {
    const realName = firstLowerCase(displayName);
    const nameLowerCase = displayName.toLowerCase();

    config[nameLowerCase] = props;
  }

  getProps(allProps: any) {
    const strippingProperties = ['chartDiv', 'combineContentConfig', 'config', 'constructor', 'context', 'vcRef',
      'getProps', 'initPlugin', 'renderPlugin',
      'ngOnInit', 'ngAfterViewInit', 'ngOnChanges'];
    if (allProps) {
      const properties: {
        [key: string]: string
      } = {};
      for (const key in allProps) {
        if (strippingProperties.indexOf(key) === -1) {
          properties[key] = allProps[key];
        }
      }
      return properties;
    }

    return allProps;
  }

  initPlugin() {
    const name = this.constructor.name;
    const props = this.getProps(this);
    this.config = this.context.config;

    if (name === 'PluginComponent'){
      this.renderPlugin(true);
    }else if (name === 'Slider') {
      props.container = this.context.container;
      this.combineContentConfig(name, props, this.config);
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    this.initPlugin();
  }

  renderPlugin(rerender?: boolean) {
    viser.Plugin(this.config);
  }
}
