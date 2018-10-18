import 'zone.js';
import 'reflect-metadata';
import { Component, NgModule, Renderer, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from 'viser-ng';
import { data } from './data';

let tempChart: any;

@Component({
  selector: '#mount',
  template: `
    <div>
      <v-chart
        [forceFit]="true"
        height="500"
        #chart
      >
        <v-view
          [data]="data"
          [end]="{x:0.45,y:1}"
        >
          <v-axis></v-axis>
          <v-point position="Horsepower*Miles_per_Gallon"></v-point>
        </v-view>
        <v-view
          [data]="data"
          [start]="{x:0.55,y:0}"
        >
          <v-axis></v-axis>
          <v-point position="Acceleration*Displacement"></v-point>
        </v-view>
        <v-brush
          [dragable]="true"
          [onBrushstart]="onBrushstart"
          [onBrushmove]="onBrushmove"
          [onDragmove]="onBrushmove"
        ></v-brush>
      </v-chart>
    </div>
  `,
})
class AppComponent {
  data: any = data;
  @ViewChild('chart')
  chart: any;

  ngAfterViewInit() {
    tempChart = this.chart;
  }
  onBrushstart(ev) {
    if (!tempChart) {
      return;
    }
    const x = ev.x,
      y = ev.y,
      chart = tempChart.context.chart.chartInstance;

    const views = chart.getViewsByPoint({
      x: x,
      y: y,
    });
    if (views.length > 1) {
      (this as any).chart = views[1];
      const coord = views[1].get('coord');
      (this as any).plot = {
        start: coord.start,
        end: coord.end,
      };
      (this as any).xScale = views[1].getXScale();
      (this as any).yScale = views[1].getYScales()[0];
    }
  }
  onBrushmove(ev) {
    if (!tempChart) {
      return;
    }
    const data = ev.data;
    const viewInstance = tempChart.context.chart.viewInstance;
    const view2 = viewInstance[Object.keys(viewInstance)[1]];
    view2.filterShape(function(obj) {
      return data.indexOf(obj) > -1;
    });
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ViserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export default class AppModule {}
