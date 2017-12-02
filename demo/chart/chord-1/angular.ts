import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from '../../../packages/viser-ng/src/index';
import { data, dataPre, scale } from './data';

@Component({
  selector: '#mount',
  template: `
  <div>
    <Chart [forceFit]="forceFit" [height]="height" [data]="data" [dataPre]="dataPre" [scale]="scale">
      <View viewId="2" dataView="edges">
        <Coord type="polar" direction="yReverse"></Coord>
        <Edge position="x*y" color="source" shape="arc" opacity="0.5" tooltip="source*target*value"></Edge>
      </View>
      <View viewId="3" dataView="nodes">
        <Coord type="polar" direction="yReverse" ></Coord>
        <Polygon position="x*y" color="id" [label]="label" ></Polygon>
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
  scale = scale;
  label = [
    'name', {
      labelEmit: true,
      textStyle: {
        fill: '#8c8c8c'
      },
    }
  ];
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
