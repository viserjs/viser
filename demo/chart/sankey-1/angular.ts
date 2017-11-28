import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from '../../../packages/viser-ng/src/index';
import { data, dataMapping, dataPre, scale } from './data'

@Component({
  selector: '#mount',
  template: `
  <div>
    <Chart dataView="edges" [forceFit]="forceFit" [height]="height" [data]="data" [dataPre]="dataPre" [dataMapping]="dataMapping" [scale]="scale">
      <Sankey [ngStyle]="{ curvature: 0.5 }" color="#333" opacity="0.1" tooltip="value"></Sankey>
      <View viewId="3" dataView="nodes" [dataMapping]="viewDataMapping">
        <Polygon [ngStyle]="{ stroke: '#ccc' }" [label]="label"></Polygon>
      </View>
    </Chart>
  </div>
  `
})

class AppComponent {
  forceFit: boolean= true;
  height: number = 600;
  data = data;
  dataPre = dataPre;
  dataMapping = dataMapping;
  viewDataMapping = { column: 'x', row: 'y', color: 'name' };
  scale = scale;
  label = {
    dataKey: 'name',
    textStyle: {
      fill: 'black',
      textAlign: 'left'
    },
    offset: 0,
  };
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
