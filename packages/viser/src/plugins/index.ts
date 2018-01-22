const Slider = require('@antv/g2-plugin-slider');

export default (config: any) => {
  for (let pluginName in config) {
    const pluginConfig = config[pluginName];
    switch (pluginName) {
      case "slider":
        const s = new Slider(pluginConfig);
        s.render();
        break;

      default:
        // code...
        break;
    }
  }
};