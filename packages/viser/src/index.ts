import * as _ from 'lodash';
import CommonChart from './core/CommonChart';
import IAxisConfig, { IAxis } from './typed/IAxis';
import IBrush from './typed/IBrush';
import IChart from './typed/IChart';
import ICoord, { IPolarCoord, IRectCoord } from './typed/ICoord';
import IFacet from './typed/IFacet';
import IGuideConfig, { IArcGuide, IGuide, IImageGuide, ILineGuide, IRegionGuide, ITextGuide } from './typed/IGuide';
import ILegendConfig, { ILegend } from './typed/ILegend';
import IMain from './typed/IMain';
import IScale from './typed/IScale';
import ISeriesConfig, { ISeries } from './typed/ISeries';
import ISlider from './typed/ISlider';
import ITooltipConfig, { ITooltip } from './typed/ITooltip';
import IViewConfig, { IView } from './typed/IView';
import * as CustomizeUtils from './utils/CustomizeUtils';
declare const require: any;
// tslint:disable-next-line:no-var-requires
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
  ISlider,
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

export { default as Plugin } from './plugins/index';
