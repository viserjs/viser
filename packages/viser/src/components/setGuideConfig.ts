import * as _ from 'lodash';

// add two type of guide line
// parallel and normal
function setGuideLine(chart, item) {
  if (item.quickType === 'parallel') {
    const data = item.data;
    chart.guide().line({
      start: ['min', data],
      end: ['max', data],
    });
  } else if (item.quickType === 'normal') {
    const data = item.data;
    chart.guide().line({
      start: [data, 'min'],
      end: [data, 'max'],
    });
  } else {
    chart.guide().line(item);
  }
}

// add two type of guide line
// parallel and normal
function setGuideArc(chart, item) {
  if (item.quickType === 'parallel') {
    const data = item.data;
    chart.guide().arc({
      start: ['min', data],
      end: ['max', data],
    });
    chart.guide().arc({
      start: ['max', data],
      end: ['min', data],
    });
  } else if (item.quickType === 'normal') {
    const data = item.data;
    chart.guide().line({
      start: [data, 'min'],
      end: [data, 'max'],
    });
  } else {
    chart.guide().arc(item);
  }
}

export const process = (chart, config) => {
  let guide = config.guide;
  const isArr = Array.isArray(guide);

  if (_.isEmpty(guide)) { return chart; }

  guide = Array.isArray(guide) ? guide : [guide];

  guide.forEach((res: any) => {
    if (res.type === 'line') {
      setGuideLine(chart, res);
    } else if (res.type === 'region') {
      chart.guide().region(res);
    } else if (res.type === 'arc') {
      setGuideArc(chart, res);
    } else if (res.type === 'text') {
      chart.guide().text(res);
    } else if (res.type === 'tag') {
      chart.guide().tag(res);
    } else if (res.type === 'html') {
      chart.guide().html(res);
    }
  });

  return chart;
};
