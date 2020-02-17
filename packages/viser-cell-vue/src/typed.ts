const props: any = [
  // axis
  'dataKey', 'show', 'position', 'grid', 'label', 'line', 'tickLine', 'labelOffset',
  // chart
  'id', 'el', 'height', 'width', 'padding', 'pixelRatio', 'animate', 'padding',
  // coord
  'type', 'transposed', 'start', 'end', 'isRect', 'radius', 'innerRadius', 'startAngle', 'endAngle', 'isPolar', 'center', 'circleRadius',
  // guide
  'type', 'position', 'vStyle', 'content', 'offsetX', 'offsetY', 'top', 'start', 'end', 'alignX', 'alignY', 'html', 'direct', 'side', 'background', 'textStyle', 'withPoint', 'pointStyle',
  // legend
  'dataKey', 'show', 'showTitle', 'align', 'verticalAlign', 'position', 'titleGap', 'custom', 'offsetX', 'offsetY', 'itemGap', 'itemMarginBottom', 'itemWidth', 'unCheckColor',
  'itemFormatter', 'marker', 'textStyle', 'onClick', 'nameStyle', 'valueStyle', 'wordSpace',
  // main
  'data', 'scale',
  // series
  'quickType', 'position', 'gemo', 'adjust', 'color', 'shape', 'size', 'vStyle', 'animate',
  // tooltip
  'items', 'show', 'triggerOn', 'triggerOff', 'showTitle', 'showCrosshairs', 'crosshairsStyle', 'items', 'showTooltipMarker', 'background', 'titleStyle', 'nameStyle', 'valueStyle',
  'showItemMarker', 'itemMarkerStyle', 'custom', 'onShow', 'onHide', 'onChange',
  // lite
  'pie', 'sector', 'line', 'smoothLine', 'dashLine', 'area', 'stackArea', 'smoothArea', 'bar', 'stackBar', 'dodgeBar', 'interval', 'stackInterval', 'dodgeInterval',
  'point', 'schema', 'box', 'candle', 'polygon',
];

function unique(array: any) {
  const res = [];
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
