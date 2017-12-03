import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from '../../../packages/viser-ng/src/index';
import { chartData, scale } from './data'

@Component({
  selector: '#mount',
  template: `
  <div>
    <Chart [forceFit]="forceFit" [height]="600" [data]="chartData" [scale]="scale">
      <Tooltip></Tooltip>
      <Facet type="rect" [fields]="fields">
        <FacetView>
          <Point position="carat*price" color="cut" [opacity]="opacity" [size]="size"></Point>
        </FacetView>
      </Facet>
      <Axis></Axis>
    </Chart>
  </div>
  `
})

export class AppComponent {
  forceFit: boolean= true;
  height: number = 600;
  chartData = chartData;
  scale = scale;
  opacity = 0.3;
  size = 3;
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
  bootstrap: [AppComponent]
})

export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
