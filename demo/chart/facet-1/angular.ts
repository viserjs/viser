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
    <v-chart [forceFit]="forceFit" [height]="600" [data]="chartData" [scale]="scale">
      <v-tooltip></v-tooltip>
      <v-facet type="rect" [fields]="fields">
        <v-facet-view>
          <v-point position="carat*price" color="cut" [opacity]="opacity" [size]="size"></v-point>
        </v-facet-view>
      </v-facet>
      <v-axis></v-axis>
    </v-chart>
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
