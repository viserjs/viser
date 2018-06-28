import { ViserGraph } from '../../../packages/viser-graph/src';

const data = {
  roots: [{
    label: 'root',
    id:1,
    children: [{
      label: 'child1',
      children: [
        {
          label: 'child\n1.1'
        }
      ]
    }, {
      label: 'child2'
    }]
  }]
};

new ViserGraph({
  graph: {
    container: 'mount',
    width: 500,
    height: 500,
    fitView: 'cc',
    fitViewPadding: true,
    animate: true,
    type: 'tree',
  },
  data,
  zoom: {
    min: 1,
    max: 10,
  },
  events: {
    onClick: function(ev, graph) {
      console.log('click', ev, graph);
    }
  },
}).render();

