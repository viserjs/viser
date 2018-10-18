import * as React from 'react';
// import * as $ from 'jquery';
import { Chart, Axis, Brush, View, Point } from 'viser-react';
import { data } from './data';

let tempChart;
// 将chart实例存储在tempChart变量里
export default class App extends React.Component {
  onBrushstart(ev) {
    // 使用brush实例不可使用箭头函数硬性绑定App实例
    const x = ev.x,
      y = ev.y;
    const chart = tempChart.chart.chartInstance;
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
    const data = ev.data,
      viewInstance = tempChart.chart.viewInstance,
      view2 = viewInstance[Object.keys(viewInstance)[1]];
    view2.filterShape(function(obj) {
      return data.indexOf(obj) > -1;
    });
  }
  render() {
    return (
      <div>
        <Chart forceFit={true} height={500} ref={node => (tempChart = node)}>
          <View
            data={data}
            end={{
              x: 0.45,
              y: 1,
            }}
          >
            <Axis />
            <Point position="Horsepower*Miles_per_Gallon" />
          </View>
          <View
            data={data}
            start={{
              x: 0.55,
              y: 0,
            }}
          >
            <Axis />
            <Point position="Acceleration*Displacement" />
          </View>
          <Brush
            canvas={null}
            dragable={true}
            onBrushstart={this.onBrushstart}
            onBrushmove={this.onBrushmove}
            onDragmove={this.onBrushmove}
          />
        </Chart>
      </div>
    );
  }
}
