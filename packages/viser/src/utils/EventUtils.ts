import * as _ from 'lodash';

const regEventName = /on(.+)(MouseEnter|MouseMove|MouseLeave|Click|DdlClick|MouseDown|MouseUp|TouchStart|TouchMove|TouchEnd)/;

/**
 * [setSEvent]
 * ref: https://antv.alipay.com/zh-cn/g2/3.x/tutorial/chart-event.html
 * Set event for single element of components, like 'onTitleClick' on Tooltip.
 * Notice that the component's event like 'onClick' will not be include in this method. Please use 'setEvent' instead.
 */
export function setSEvent (chart: any, itemname: string, keyname: string, content: any) {
  if (_.isEmpty(keyname)) { return; }

  const parseEventItem = regEventName.exec(keyname);
  if (!parseEventItem || parseEventItem.length <= 2) { return; }

  const lowerEventItem = parseEventItem[1].toLowerCase();
  const lowerEventName = parseEventItem[2].toLowerCase();
  const eventItem = `${itemname}-${lowerEventItem}`;

  chart.on(`${eventItem}:${lowerEventName}`, (ev: any) => {
    if (content) {
      content(ev, chart);
    }
  });
}

/**
 * [setEvent]
 * ref: https://antv.alipay.com/zh-cn/g2/3.x/tutorial/chart-event.html
 * Set event for whole component, like 'onClick' on Tooltip.
 */
export function setEvent (chart: any, name: string, item: any) {
  if (_.isEmpty(item)) { return; }

  const events = Object.keys(item).filter((entry) => /^on/.test(entry));
  if (_.isEmpty(events)) { return; }

  events.forEach(entry => {
    const eventName = entry.slice(2, entry.length);
    const eventLowerCase = eventName.toLowerCase();
    const content = item[entry];
    if (name) {
      chart.on(`${name}:${eventLowerCase}`, (ev: any) => {
        if (content) {
          content(ev, chart);
        }
      });
    } else {
      chart.on(eventLowerCase, (ev: any) => {
        if (content) {
          content(ev, chart);
        }
      });
    }
  });
}
