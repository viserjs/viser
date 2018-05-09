import Slider from './Slider';

export default (config: any) => {
  const plugins = {} as any;

  for (const pluginName in config) {
    if (config.hasOwnProperty(pluginName)) {
      const pluginConfig = config[pluginName];
      switch (pluginName) {
        case 'slider':
          plugins.slider = Slider(pluginConfig);
          break;
        default:
          break;
      }
    }
  }

  return plugins;
};
