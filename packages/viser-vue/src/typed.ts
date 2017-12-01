const props: any = [
  'dataKey', 'position', 'title', 'tick', 'subTick', 'grid', 'labels', 'line', 'tickLine',
  // chart
  'id', 'container', 'height', 'width', 'animate', 'forceFit', 'background', 'plotBackground', 'padding',
  // coord
  'type', 'direction', 'radius', 'innerRadius', 'startAngle', 'endAngle',
  // dataPre
  'connector', 'transform', 'geoKey',
  // facet
  'type', 'fields', 'showTitle', 'autoSetAxis', 'padding', 'colTitle', 'rowTitle', 'eachView',
  // guide
  'type', 'position', 'autoRotate', 'vStyle', 'content', 'offsetX', 'offsetY', 'top', 'zIndex', 'start', 'end', 'lineStyle', 'text', 'src', 'width', 'heigth', 'alignX', 'alignY', 'html',
  // legend
  'dataKey', 'position', 'title', 'offsetX', 'offsetY', 'itemGap', 'itemMarginBottom', 'itemWidth', 'unCheckColor', 'background',
  'allowAllCanceled', 'itemFormatter', 'marker', 'textStyle', 'clickable', 'hoverable', 'selectedMode', 'onHover', 'onClick',
  // main
  'data', 'viewId', 'scale', 'dataPre', 'dataView', 'forceFit',
  // series
  'quickType', 'position', 'gemo', 'adjust', 'color', 'shape', 'size', 'opacity', 'label', 'tooltip', 'vStyle', 'select', 'active', 'animate',
  // tooltip
  'showTitle', 'offset', 'crosshairs', 'containerTpl', 'itemTpl', 'inPlot', 'follow', 'shared', 'position',
  // lite
  'pie', 'sector', 'line', 'smoothLine', 'dashLine', 'area', 'stackArea', 'smoothArea', 'bar', 'stackBar', 'dodgeBar', 'interval', 'stackInterval', 'dodgeInterval',
  'point', 'funnel', 'pyramid', 'radialBar', 'schema', 'box', 'candle', 'polygon', 'contour', 'heatmap', 'edge', 'sankey',
];

function unique(array: any) {
  let res = [];
  for (let i = 0, len = array.length; i < len; i++) {
    const current = array[i];
    if (res.indexOf(current) === -1) {
      res.push(current);
    }
  }

  return res;
}

function changeObj(array: any) {
  const uniqueProps = unique(array);
  const propsObject: any = {};

  for (const res of uniqueProps) {
    propsObject[res] = null;
  }

  return propsObject;
}

export default changeObj(props);
