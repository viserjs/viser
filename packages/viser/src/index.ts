import CommonChart from './core/CommonChart';
import IAxisConfig, { IAxis } from './typed/IAxis';
import IBrush from './typed/IBrush';
import IChart from './typed/IChart';
import ICoord, { IPolarCoord, IRectCoord } from './typed/ICoord';
import IFacet from './typed/IFacet';
import IGuideConfig, { IGuide, ILineGuide, ITextGuide, IImageGuide, IRegionGuide, IArcGuide } from './typed/IGuide';
import ILegendConfig, { ILegend } from './typed/ILegend';
import ISeriesConfig, { ISeries } from './typed/ISeries';
import ITooltipConfig, { ITooltip } from './typed/ITooltip';
import IViewConfig, { IView } from './typed/IView';
import IScale from './typed/IScale';
import IMain from './typed/IMain';
import * as CustomizeUtils from './utils/CustomizeUtils';
import * as _ from 'lodash';
const G2 = require('@antv/g2');

export {
  IAxis,
  IAxisConfig,
  IBrush,
  IChart,
  ICoord,
  IRectCoord,
  IPolarCoord,
  IFacet,
  IGuide,
  IGuideConfig,
  ILineGuide,
  ITextGuide,
  IImageGuide,
  IRegionGuide,
  IArcGuide,
  ILegend,
  ILegendConfig,
  ISeries,
  ISeriesConfig,
  ITooltip,
  ITooltipConfig,
  IView,
  IViewConfig,
  IScale,
  IMain,
};

export const registerAnimation = CustomizeUtils.registerAnimation;
export const registerShape = CustomizeUtils.registerShape;
export const Global = G2.Global;

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
      for (let item of config.views) {
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
  console.log(config);
  const commonChart = new CommonChart(config);
  commonChart.render();

  return commonChart;
}

export { default as Plugin } from './plugins/index';
