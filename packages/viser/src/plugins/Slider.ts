const Slider = require('@antv/g2-plugin-slider');

export default (config: any) => {
  if (!document.getElementById(config.container)) {
    console.error('plugin slider container not defined');
    return;
  }
  const sliderInstance = new Slider(config);
  sliderInstance.render();
}