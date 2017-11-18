import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from '../../../packages/viser-ng/src/index';
import { data, dataDef, dataPre, scale } from './data'

@Component({
  selector: '#mount',
  template: `
  <Chart [forceFit]="forceFit" [height]="height" [data]="data" [dataPre]="dataPre" [dataDef]="dataDef" [scale]="scale">
    <Tooltip></Tooltip>
    <Axis></Axis>
    <StackBar [ngStyle]="{ stroke: '#fff', lineWidth: 1 }" ></StackBar>
  </Chart>
  `
})

class AppComponent {
  forceFit: boolean= true;
  height: number = 400;
  data = data;
  dataDef = dataDef;
  scale = scale;
  fields = ['cut', 'clarity'];
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ViserModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
