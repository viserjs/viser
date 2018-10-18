import * as React from 'react';
import {
  Chart,
  registerShape,
  View,
  Tooltip,
  Legend,
  Coord,
  StackBar,
  StackInterval,
} from 'viser-react';

const data = [
  {
    type: '分类一',
    value: 20,
  },
  {
    type: '分类二',
    value: 18,
  },
  {
    type: '分类三',
    value: 32,
  },
  {
    type: '分类四',
    value: 15,
  },
  {
    type: 'Other',
    value: 15,
  },
];

let sum = 0;
data.forEach(function(obj) {
  sum += obj.value;
});
const chartWidth = window.innerWidth;
const chartHeight = 500;
const others = [
  {
    otherType: 'Other1',
    value: 2,
  },
  {
    otherType: 'Other2',
    value: 3,
  },
  {
    otherType: 'Other3',
    value: 5,
  },
  {
    otherType: 'Other4',
    value: 2,
  },
  {
    otherType: 'Other5',
    value: 3,
  },
];

registerShape('interval', 'otherShape', {
  draw: function draw(cfg, container) {
    const points = cfg.points;
    let path = [];
    path.push(['M', points[0].x, points[0].y]);
    path.push(['L', points[1].x, points[1].y]);
    path.push(['L', points[2].x, points[2].y]);
    path.push(['L', points[3].x, points[3].y]);
    path.push('Z');

    path = this.parsePath(path);
    // 将点转换成画布上的点
    const parsePoints = this.parsePoints(points);
    const linePath = [
      ['M', parsePoints[3].x, parsePoints[3].y],
      ['L', chartWidth * 0.7, 20],
      ['M', parsePoints[2].x, parsePoints[2].y],
      ['L', chartWidth * 0.7, chartHeight - 70],
    ];
    // 绘制线
    container.addShape('path', {
      attrs: {
        path: linePath,
        stroke: cfg.color,
        lineWidth: 1,
      },
    });
    return container.addShape('path', {
      attrs: {
        fill: cfg.color,
        path: path,
      },
    });
  },
});
export default class App extends React.Component {
  render() {
    return (
      <Chart
        width={chartWidth}
        height={chartHeight}
        padding={[20, 0, 'auto', 0]}
      >
        <Legend dataKey="type" />
        <Tooltip />
        <View start={{ x: 0, y: 0 }} end={{ x: 0.5, y: 1 }} data={data}>
          <Coord type="theta" startAngle={-333} endAngle={27} />
          <StackInterval
            position="value"
            color="type"
            shape={[
              'type',
              type => {
                if (type === 'other') {
                  return 'otherShape';
                }
                return 'rect';
              },
            ]}
            label={[
              'type',
              {
                offset: -20,
                textStyle: {
                  rotate: 0,
                },
              },
            ]}
          />
        </View>
        <View
          start={{ x: 0.6, y: 0 }}
          end={{ x: 1, y: 1 }}
          data={others}
          scale={[
            {
              dataKey: 'value',
              nice: false,
            },
          ]}
        >
          <StackBar
            position="1*value"
            color={['otherType', '#fcd7de-#f04864']}
            label={['otherType', { offset: -20 }]}
          />
        </View>
      </Chart>
    );
  }
}
