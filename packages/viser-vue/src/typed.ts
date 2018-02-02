const props: any = [
  // axis
  'dataKey', 'position', 'title', 'tick', 'subTick', 'grid', 'labels', 'line', 'tickLine', 'subTickCount', 'subTickLine',
  // chart
  'id', 'container', 'height', 'width', 'animate', 'forceFit', 'background', 'plotBackground', 'padding',
  // coord
  'type', 'direction', 'radius', 'innerRadius', 'startAngle', 'endAngle',
  // facet
  'type', 'fields', 'rowField', 'colField', 'colValue', 'rowValue', 'colIndex', 'rowIndex', 'showTitle', 'autoSetAxis', 'padding', 'colTitle', 'rowTitle', 'eachView', 'cols', 'rows', 'padding', 'line', 'lineSmooth', 'transpose', 'views',
  // guide
  'type', 'position', 'autoRotate', 'vStyle', 'content', 'offsetX', 'offsetY', 'top', 'zIndex', 'start', 'end', 'lineStyle', 'line', 'text', 'src', 'width', 'heigth', 'alignX', 'alignY', 'html',
  // legend
  'dataKey', 'show', 'position', 'title', 'titleGap', 'offset', 'offsetX', 'offsetY', 'items', 'itemGap', 'itemsGroup', 'itemMarginBottom', 'itemWidth', 'unCheckColor', 'background',
  'allowAllCanceled', 'itemFormatter', 'marker', 'textStyle', 'clickable', 'hoverable', 'selectedMode', 'onHover', 'onClick', 'reversed', 'layout', 'backPadding', 'useHtml',
  'autoWrap', 'autoPosition', 'container', 'containerTpl', 'itemTpl', 'legendMarker', 'legendListItem',
  // main
  'data', 'viewId', 'scale', 'forceFit',
  // series
  'quickType', 'position', 'gemo', 'adjust', 'color', 'shape', 'size', 'opacity', 'label', 'tooltip', 'vStyle', 'select', 'active', 'animate',
  // tooltip
  'x', 'y', 'items', 'showTitle', 'offset', 'timeStamp', 'crosshairs', 'containerTpl', 'itemTpl', 'inPlot', 'plotRange', 'follow', 'shared', 'position', 'enterable', 'g2Tooltip', 'onShow', 'onHide', 'onChange',
  // lite
  'pie', 'sector', 'line', 'smoothLine', 'dashLine', 'area', 'stackArea', 'smoothArea', 'bar', 'stackBar', 'dodgeBar', 'interval', 'stackInterval', 'dodgeInterval',
  'point', 'funnel', 'pyramid', 'schema', 'box', 'candle', 'polygon', 'contour', 'heatmap', 'edge', 'sankey', 'errorBar', 'jitterPoint',
  // brush
  'canvas', 'startPoint', 'brushing', 'dragging', 'brushShape', 'container', 'polygonPath', 'type', 'dragable', 'dragoffX', 'dragoffY', 'inPlot', 'xField', 'yField', 'filter',
  'onBrushstart', 'onBrushmove', 'onBrushend', 'onDragstart', 'onDragmove', 'onDragend',
  // slider
  'xAxis', 'yAxis', 'onChange', 'backgroundChart',
  // view
  'start', 'end',
  // event
  'onMouseDown', 'onMouseMove', 'onMouseLeave', 'onMouseUp', 'onClick', 'onDbClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onPlotEnter', 'onPlotMove', 'onPlotLeave', 'onPlotClick', 'onPlotDbClick',
  'onTitleMouseDown', 'onTitleMouseMove', 'onTitleMouseLeave', 'onTitleMouseUp', 'onTitleClick', 'onTitleDbClick', 'onTitleTouchStart', 'onTitleTouchMove', 'onTitleTouchEnd',
  'onItemMouseDown', 'onItemMouseMove', 'onItemMouseLeave', 'onItemMouseUp', 'onItemClick', 'onItemDbClick', 'onItemTouchStart', 'onItemTouchMove', 'onItemTouchEnd',
  'onMarkerMouseDown', 'onMarkerMouseMove', 'onMarkerMouseLeave', 'onMarkerMouseUp', 'onMarkerClick', 'onMarkerDbClick', 'onMarkerTouchStart', 'onMarkerTouchMove', 'onMarkerTouchEnd',
  'onTextMouseDown', 'onTextMouseMove', 'onTextMouseLeave', 'onTextMouseUp', 'onTextClick', 'onTextDbClick', 'onTextTouchStart', 'onTextTouchMove', 'onTextTouchEnd',
  'onLabelMouseDown', 'onLabelMouseMove', 'onLabelMouseLeave', 'onLabelMouseUp', 'onLabelClick', 'onLabelDbClick', 'onLabelTouchStart', 'onLabelTouchMove', 'onLabelTouchEnd',
  'onTicksMouseDown', 'onTicksMouseMove', 'onTicksMouseLeave', 'onTicksMouseUp', 'onTicksClick', 'onTicksDbClick', 'onTicksTouchStart', 'onTicksTouchMove', 'onTicksTouchEnd',
  'onLineMouseDown', 'onLineMouseMove', 'onLineMouseLeave', 'onLineMouseUp', 'onLineClick', 'onLineDbClick', 'onLineTouchStart', 'onLineTouchMove', 'onLineTouchEnd',
  'onGridMouseDown', 'onGridMouseMove', 'onGridMouseLeave', 'onGridMouseUp', 'onGridClick', 'onGridDbClick', 'onGridTouchStart', 'onGridTouchMove', 'onGridTouchEnd',
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
