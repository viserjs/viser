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
    <v-chart [forceFit]="forceFit" [height]="height" [data]="data" [dataPre]="dataPre" [scale]="scale">
      <v-view viewId="2" dataView="edges">
        <v-coord type="polar" direction="yReverse"></v-coord>
        <v-edge position="x*y" color="source" shape="arc" opacity="0.5" tooltip="source*target*value"></v-edge>
      </v-view>
      <v-view viewId="3" dataView="nodes">
        <v-coord type="polar" direction="yReverse" ></v-coord>
        <v-polygon position="x*y" color="id" [label]="label" ></v-polygon>
      </v-view>
    </v-chart>
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
