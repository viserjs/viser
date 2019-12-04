import { ViserGraph } from '../../../packages/viser-graph/src/index';

const data = {
  isRoot: true,
  id: 'Root',
  style: {
    fill: 'red'
  },
  children: [
    {
      id: 'SubTreeNode1',
      raw: {},
      children: [
        {
          id: 'SubTreeNode1.1'
        },
        {
          id: 'SubTreeNode1.2',
          children: [
            {
              id: 'SubTreeNode1.2.1'
            },
            {
              id: 'SubTreeNode1.2.2'
            },
            {
              id: 'SubTreeNode1.2.3'
            }
          ]
        }
      ]
    },
    {
      id: 'SubTreeNode2',
      children: [
        {
          id: 'SubTreeNode2.1'
        }
      ]
    }, {
      id: 'SubTreeNode3',
      children: [
        {
          id: 'SubTreeNode3.1'
        },
        {
          id: 'SubTreeNode3.2'
        },
        {
          id: 'SubTreeNode3.3'
        }
      ]
    }, {
      id: 'SubTreeNode4'
    }, {
      id: 'SubTreeNode5'
    }, {
      id: 'SubTreeNode6'
    }
  ]
};


let i = 0;
let count = 0;
new ViserGraph({
  data,
  graph: {
    container: 'mount',
    type: 'tree',
    width: 500,
    height: 500,
    pixelRatio: 2,
    renderer: 'svg',
    modes: {
      default: ['collapse-expand', 'drag-canvas']
    },
    fitView: true,
    layout: {
      type: 'compactBox',
      direction: 'LR',
      defalutPosition: [],
      getId(d) { return d.id; },
      getHeight() { return 16 },
      getWidth() { return 16 },
      getVGap() { return 50 },
      getHGap() { return 100 }
    }
  },
  node: {
    formatter: node => {
      return {
        size: 16,
        anchorPoints: [[0,0.5], [1,0.5]],
        style: {
          fill: '#40a9ff',
          stroke: '#096dd9'
        },
        label: node.id,
        labelCfg: {
          position: node.children && node.children.length > 0 ? 'left' : 'right'
        }
      }
    },
    events: {
      onClick: (evt: any, graph: any) => {
        const { item } = evt
        const nodeId = item.get('id');
        const model = item.getModel()
        const children = model.children;
        if(!children || children.length === 0) {
          const childData = [
            { 
              id: `child-data-${count}`,
              shape: 'rect', 
              children: [
                {
                  id: `x-${count}` 
                },
                {
                  id: `y-${count}` 
                }
              ] 
            },
            { 
              id: `child-data1-${count}`,
              children: [
                {
                  id: `x1-${count}` 
                },
                {
                  id: `y1-${count}` 
                }
              ] 
            }
          ];

          const parentData = graph.findDataById(nodeId);
          if (!parentData.children) {
            parentData.children = [];
          }
          // 如果childData是一个数组，则直接赋值给parentData.children
          // 如果是一个对象，则使用parentData.children.push(obj)
          parentData.children = childData
          graph.changeData()
          count++
        }
      }
    }
  },
  edge: {
    formatter: () => {
      i++;
      return {
        shape: 'cubic-horizontal',
        color: '#A3B1BF',
        label: i
      }
    },
  },
}).render();