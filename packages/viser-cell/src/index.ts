import * as _ from 'lodash';
import CommonChart from './core/CommonChart';
import IAxisConfig, { IAxis } from './typed/IAxis';
import IChart from './typed/IChart';
import ICoord, { IPolarCoord, IRectCoord } from './typed/ICoord';
import IGuideConfig, { IArcGuide, IGuide, ILineGuide, IRectGuide, ITagGuide, ITextGuide } from './typed/IGuide';
import ILegendConfig, { ILegend } from './typed/ILegend';
import IMain from './typed/IMain';
import IScale from './typed/IScale';
import ISeriesConfig, { ISeries } from './typed/ISeries';
import ITooltipConfig, { ITooltip } from './typed/ITooltip';
import * as CustomizeUtils from './utils/CustomizeUtils';
declare const require: any;
// tslint:disable-next-line:no-var-requires
const F2 = require('@antv/f2');

export {
  IAxis,
  IAxisConfig,
  IChart,
  ICoord,
  IRectCoord,
  IPolarCoord,
  IGuide,
  IGuideConfig,
  ILineGuide,
  ITextGuide,
  ITagGuide,
  IRectGuide,
  IArcGuide,
  ILegend,
  ILegendConfig,
  ISeries,
  ISeriesConfig,
  ITooltip,
  ITooltipConfig,
  IScale,
  IMain,
};

export const registerAnimation = CustomizeUtils.registerAnimation;
export const registerShape = CustomizeUtils.registerShape;
export const registerGesture = CustomizeUtils.registerGesture;
export const Global = F2.Global;

function hasDataCondition(config: any) {
  let hasData = false;

  if (!_.isEmpty(config.data)) {
    hasData = true;
  }

  if (!_.isNil(config.views)) {
    if (_.isPlainObject(config.views) && !_.isEmpty(config.views.data)) {
      hasData = true;
    }

    if (_.isArray(config.views)) {
      for (const item of config.views) {
        if (!_.isEmpty(item.data)) {
          hasData = true;
        }
      }
    }
  }

  return hasData;
}

export default function(config: any) {
  if (_.isNil(config) || _.isEmpty(config)) { return; }

  const hasData = hasDataCondition(config);
  if (!hasData) { return; }
  const commonChart = new CommonChart(config);
  commonChart.render();

  return commonChart;
}
