import Slider from './Slider';

export default (config: any) => {
  const plugins = {} as any;
  for (let pluginName in config) {
    const pluginConfig = config[pluginName];
    switch (pluginName) {
      case "slider":
        plugins.slider = Slider(pluginConfig);
        break;

      default:
        break;
    }
  }

  return plugins;
};