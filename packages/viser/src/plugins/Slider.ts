declare const require: any;
// tslint:disable-next-line:no-var-requires
const Slider = require('@antv/g2-plugin-slider');

import ISliderConfig from '../typed/ISlider';

export default (config: ISliderConfig) => {
  const container = document.getElementById(config.container);
  if (!container) {
    console.error('plugin slider container not defined');
    return;
  }

  container.innerHTML = '';
  const sliderInstance = new Slider(config);
  sliderInstance.render();
};
