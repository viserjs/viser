import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from '../../../packages/viser-ng/src/index';
import { data, dataPre, scale } from './data'

@Component({
  selector: '#mount',
  template: `
  <div>
    <Chart [forceFit]="forceFit" [height]="height" [data]="data" [dataPre]="dataPre">
      <View viewId="2" dataView="edges" [scale]="scale">
        <Sankey position="x*y" [style]="sankeyStyle" color="#333" opacity="0.1" tooltip="value"></Sankey>
      </View>
      <View viewId="3" dataView="nodes" [scale]="scale">
        <Polygon position="x*y" color="name" [style]="polygonStyle" [label]="label"></Polygon>
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
  sankeyStyle = { curvature: 0.5 };
  polygonStyle = { stroke: '#ccc' };
  viewDataMapping = { column: 'x', row: 'y', color: 'name' };
  scale = scale;
  label = [
    'name', {
      textStyle: {
        fill: 'black',
        textAlign: 'left'
      },
      offset: 0,
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
