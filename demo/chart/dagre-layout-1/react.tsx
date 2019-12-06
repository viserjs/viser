import * as React from 'react';
import { Graph, Node, Edge, } from '../../../packages/viser-graph-react/src/index';

const data = {
  nodes: [{
    id: '1',
    type: 'alps',
    name: 'alps_file1',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  },
  {
    id: '2',
    type: 'alps',
    name: 'alps_file2',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  },
  {
    id: '3',
    type: 'alps',
    name: 'alps_file3',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  },
  {
    id: '4',
    type: 'sql',
    name: 'sql_file1',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  },
  {
    id: '5',
    type: 'sql',
    name: 'sql_file2',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  },
  {
    id: '6',
    type: 'feature_etl',
    name: 'feature_etl_1',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  },
  {
    id: '7',
    type: 'feature_etl',
    name: 'feature_etl_1',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  },
  {
    id: '8',
    type: 'feature_extractor',
    name: 'feature_extractor',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  }],
  edges: [{
    source: '1',
    target: '2'
  },
  {
    source: '1',
    target: '3'
  },
  {
    source: '2',
    target: '4'
  },
  {
    source: '3',
    target: '4'
  },
  {
    source: '4',
    target: '5'
  },
  {
    source: '5',
    target: '6'
  },
  {
    source: '6',
    target: '7'
  },
  {
    source: '6',
    target: '8'
  }]
};


const graph = {
  data,
  container: 'mount',
  width: 500,
  height: 500,
  layout: {
    type: 'dagre',
    nodesepFunc: d => {
      if (d.id === '3') {
        return 500;
      }
      return 50;
    },
    ranksep: 70
  },
  pixelRatio: 2,
  defaultNode: {
    shape: 'sql'
  },
  defaultEdge: {
    shape: 'polyline',
    style: {
      radius: 20,
      offset: 45,
      endArrow: true,
      lineWidth: 2,
      stroke: '#C2C8D5'
    }
  },
  modes: {
    default: [ 'drag-canvas', 'zoom-canvas', 'click-select', {
      type: 'tooltip',
      formatText(model) {
        const cfg = model.conf;
        const text = [];
        cfg.forEach(row => {
          text.push(row.label + ':' + row.value + '<br>');
        });
        return text.join('\n');
      },
      shouldUpdate: e => {
        // 如果移动到节点文本上显示，不是文本上不显示
        if (e.target.type !== 'text') {
          return false;
        }
        return true;
      }
    }]
  },
  fitView: true,
  onDragstart : (e) => {
    refreshDragedNodePosition(e);
  },
  onDrag : (e) => {
    refreshDragedNodePosition(e);
  },
  onDragend: (e) => {
    refreshDragedNodePosition(e);
  },
};

const node = {
  formatter: node => {
    return {
      // size: 15,
      // style: {
      //   fill: '#C6E5FF',
      //   stroke: '#5B8FF9'
      // },
      // shape: 'square',
      label: node.name
    }
  }
}

const edge = {
  formatter: () => {

    return { 
       shape: 'polyline',
    style: {
      radius: 20,
      offset: 45,
      endArrow: true,
      lineWidth: 2,
      stroke: '#C2C8D5'
    }
    }
  },
}

const refreshDragedNodePosition = (e) => {
  const model = e.item.get('model');
  model.fx = e.x;
  model.fy = e.y;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Graph {...graph}>
          <Node {...node}/>
          <Edge {...edge}/> 
        </Graph>
      </div>
    );
  }
}
