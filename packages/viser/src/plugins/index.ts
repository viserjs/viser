import Slider from './Slider';

export default (config: any) => {
  for (let pluginName in config) {
    const pluginConfig = config[pluginName];
    switch (pluginName) {
      case "slider":
        Slider(pluginConfig);
        break;

      default:
        break;
    }
  }
};