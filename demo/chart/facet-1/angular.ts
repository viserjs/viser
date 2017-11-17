import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from '../ng';
import { chartData, dataDef, scale } from './data'

@Component({
  selector: '#mount',
  template: `
  <div>
    <Chart [forceFit]="forceFit" [height]="600" [data]="chartData" [dataDef]="dataDef" [scale]="scale">
      <Facet type="rect" [fields]="fields">
        <FacetView>
          <Axis></Axis>
          <Tooltip></Tooltip>
          <Point opacity="0.3" size="3"></Point>
        </FacetView>
      </Facet>
    </Chart>
  </div>
  `
})

export class AppComponent {
  forceFit: boolean= true;
  height: number = 600;
  chartData = chartData;
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
  bootstrap: [AppComponent]
})

export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
