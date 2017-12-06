import * as _ from 'lodash';

const regEventName = /on(.+)(MouseEnter|MouseMove|MouseLeave|Click|DdlClick|MouseDown|MouseUp|TouchStart|TouchMove|TouchEnd)/;

export function setSEvent (chart: any, itemname: string, keyname: string, content: any) {
  if (_.isEmpty(keyname)) { return; }

  const parseEventItem = regEventName.exec(keyname);
  if (!parseEventItem || parseEventItem.length <= 2) { return; }

  const lowerEventItem = parseEventItem[1].toLowerCase();
  const lowerEventName = parseEventItem[2].toLowerCase();
  const eventItem = `${itemname}-${lowerEventItem}`;

  chart.on(`${eventItem}:${lowerEventName}`, content);
}

export function setEvent (chart: any, name: string, item: any) {
  if (_.isEmpty(item)) { return; }

  const events = Object.keys(item).filter((entry) => /^on/.test(entry));
  if (_.isEmpty(events)) { return; }

  events.forEach(entry => {
    const eventName = entry.slice(2, entry.length);
    const eventLowerCase = eventName.toLowerCase();
    const content = item[entry];
    if (name) {
      chart.on(`${name}:${eventLowerCase}`, content);
    } else {
      chart.on(eventLowerCase, content);
    }
  });
}
