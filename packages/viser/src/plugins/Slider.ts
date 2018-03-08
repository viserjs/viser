declare const require: any;
const G2 = require('@antv/g2');
const Slider = require('@antv/g2-plugin-slider');

export default (config: any) => {
  if (!document.getElementById(config.container)) {
    console.error('plugin slider container not defined');
    return;
  }
  document.getElementById(config.container).innerHTML = '';
  const sliderInstance = new Slider(config);
  sliderInstance.render();
}
