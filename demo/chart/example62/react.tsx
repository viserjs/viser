import * as React from 'react';
import { Chart, Brush, Legend, Facet, Tooltip } from 'viser-react';
import { data } from './data';

const style = window.document.createElement('style');
style.innerHTML = `
#toolbar button{
  margin:0 5px;
  padding:5px;
  cursor:pointer;
}
`;
window.document.getElementsByTagName('head')[0].appendChild(style);
let chart, brush;
export default class App extends React.Component {
  state = {
    showTooltip: true,
    type: 'XY',
  };
  eachView = (view, facet) => {
    view.axis(facet.colField, {
      label: null,
      line: {
        lineWidth: 1,
        stroke: '#000',
      },
      tickLine: {
        lineWidth: 1,
        stroke: '#000',
        length: 4,
      },
    });
    view.axis(facet.rowField, {
      label: null,
      line: {
        lineWidth: 1,
        stroke: '#000',
      },
      tickLine: {
        lineWidth: 1,
        stroke: '#000',
        length: 4,
      },
    });
    if (facet.rowIndex === facet.colIndex) {
      view
        .point()
        .position(facet.colField + '*' + facet.colField)
        .color('Species', ['#880000', '#008800', '#000088'])
        .opacity(0.5)
        .shape('circle')
        .size(3)
        .active(false);
    } else {
      view
        .point()
        .position([facet.colField, facet.rowField])
        .color('Species', ['#880000', '#008800', '#000088'])
        .opacity(0.5)
        .shape('circle')
        .size(3)
        .active(false);
    }
    if ([0, 1, 2, 3].indexOf(facet.rowIndex) > -1 && facet.colIndex === 0) {
      view.guide().text({
        position: [3.7, 'median'],
        content: facet.rowValue,
        style: {
          rotate: -90,
          fontSize: 12,
          fill: '#999',
          textAlign: 'center',
        },
      });
    }
    if ([0, 1, 2, 3].indexOf(facet.colIndex) > -1 && facet.rowIndex === 3) {
      view.guide().text({
        position: ['median', 'min'],
        content: facet.colValue,
        style: {
          fontSize: 12,
          fill: '#999',
          textAlign: 'center',
        },
        offsetY: 20,
      });
    }
  };
  onBrushstart = ev => {};
  setBrushType(e) {
    console.log('brush', brush);
    console.log('chart', chart);
    // const type=e.target.id;
    // console.log(type);
    // if (type === 'clear') {
    //   brush.container.clear();
    //   // brush.canvas.draw();
    // } else {
    //   this.setState({type});
    // }
  }
  render() {
    const { showTooltip } = this.state;
    const scale = [
      {
        dataKey: 'Species',
        sync: true,
      },
    ];
    return (
      <div>
        <div id="toolbar" style={{ textAlign: 'center' }}>
          <button id="XY" onClick={this.setBrushType}>
            矩形选择
          </button>
          <button id="X" onClick={this.setBrushType}>
            横向选择
          </button>
          <button id="Y" onClick={this.setBrushType}>
            纵向选择
          </button>
          <button id="POLYGON" onClick={this.setBrushType}>
            圈选
          </button>
          <button id="clear" onClick={this.setBrushType}>
            清除选择
          </button>
        </div>
        <Chart
          ref={node => (chart = node)}
          forceFit={true}
          height={600}
          data={data}
          scale={scale}
        >
          <Legend hoverable={false} />
          {showTooltip && <Tooltip />}
          <Facet
            type="matrix"
            fields={['SepalLength', 'SepalWidth', 'PetalLength', 'PetalWidth']}
            eachView={this.eachView}
          />
          <Brush
            canvas={null}
            ref={node => (brush = node)}
            dragable={true}
            type={this.state.type}
            onBrushstart={this.onBrushstart}
          />
        </Chart>
      </div>
    );
  }
}
