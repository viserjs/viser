import * as d3 from 'd3-format';
import * as _ from 'lodash';

export const supportD3Formatter = (obj: any) => {
  for (const item in obj) {
    if (obj.hasOwnProperty(item)) {
      const formatter = _.get(obj[item], 'formatter');

      if (_.isString(formatter)) {
        obj[item].formatter = (val: number) => {
          return d3.format(formatter)(val);
        };
      }
    }
  }

  return obj;
};
