import * as viser from 'viser';
import Vue, { ComponentOptions } from 'vue';
import typedProps from './typed';

const regSeries = [
  'pie',
  'sector',
  'line',
  'smoothline',
  'dashline',
  'area',
  'point',
  'stackarea',
  'stackline',
  'smootharea',
  'bar',
  'stackbar',
  'dodgebar',
  'interval',
  'stackinterval',
  'dodgeinterval',
  'funnel',
  'pyramid',
  'schema',
  'box',
  'candle',
  'polygon',
  'contour',
  'heatmap',
  'edge',
  'sankey',
  'errorbar',
  'jitterpoint',
  'path',
  'venn',
];

const rootCharts = ['v-chart', 'v-lite-chart'];

const rootPlugin = ['v-plugin'];

const rootChartProps = ['data', 'scale', 'filter', 'viewId'];

const seriesProps = [
  'position',
  'quickType',
  'gemo',
  'adjust',
  'color',
  'shape',
  'size',
  'opacity',
  'label',
  'tooltip',
  'style',
  'animate',
];

const camelCase: any = (() => {
  const DEFAULT_REGEX = /[-_]+(.)?/g;

  function toUpper(match: string, group1: string) {
    return group1 ? group1.toUpperCase() : '';
  }
  return (str: string, delimiters?: string) => {
    return str.replace(
      delimiters ? new RegExp('[' + delimiters + ']+(.)?', 'g') : DEFAULT_REGEX,
      toUpper
    );
  };
})();

const baseChartComponent = {
  data() {
    return {
      isViser: true,
      jsonForD2: {},
    };
  },
  // Why use null? See https://github.com/vuejs/vue/issues/4792.
  props: typedProps,
  methods: {
    checkIsContainer(componentInstance: Vue) {
      if (
        (componentInstance as any).isViser &&
        rootCharts
          .concat(['v-view', 'v-facet', 'v-facet-view', 'v-plugin'])
          .indexOf(((componentInstance as any).$options as any)._componentTag) >
          -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * find nearest parent rechart component
     */
    findNearestRootComponent(componentInstance: Vue) {
      if (this.checkIsContainer(componentInstance)) {
        if (
          (componentInstance.$options as any)._componentTag === 'v-lite-chart'
        ) {
          throw Error('v-lite-chart should be no child elements.');
        }

        return componentInstance;
      }
      if (componentInstance.$parent) {
        return this.findNearestRootComponent(componentInstance.$parent);
      }
      return null;
    },
    createRootD2Json() {
      if (this.$options._componentTag === 'v-plugin') {
        return {
          ...cleanUndefined(normalizeProps(this._props, rootChartProps)),
          ...this.jsonForD2,
        };
      }

      const d2Json = {
        ...cleanUndefined(normalizeProps(this._props, rootChartProps)),
        chart: {
          container: this.$el,
          ...cleanUndefined(normalizeProps(this._props, null, rootChartProps)),
        },
        ...this.jsonForD2,
      };

      // liteChart handle tag-props
      if (this.$options._componentTag === 'v-lite-chart') {
        const existProps = cleanUndefined(this._props);
        Object.keys(existProps).forEach(propsKey => {
          const lowerCasePropsKey = propsKey.toLowerCase();
          if (regSeries.indexOf(lowerCasePropsKey) > -1) {
            safePush(d2Json, 'series', {
              quickType: propsKey,
              ...normalizeProps(existProps, seriesProps),
            });
          }
        });
        setIfNotExist(d2Json, 'axis', true);
        setIfNotExist(d2Json, 'legend', true);
        setIfNotExist(d2Json, 'tooltip', true);
      }

      return d2Json;
    },
    freshChart(isUpdate: boolean) {
      /**
       * refresh plugin
       */
      if (rootPlugin.indexOf(this.$options._componentTag) > -1) {
        const d2Json = this.createRootD2Json();
        if (!isUpdate) {
          this.plugins = viser.Plugin(d2Json);
        }
      } else if (rootCharts.indexOf(this.$options._componentTag) > -1) {
        /**
         * refresh chart
         */
        // hit top
        const d2Json = this.createRootD2Json();

        if (!isUpdate || !this.chart) {
          this.chart = viser.default(d2Json);
        } else {
          this.chart.repaint(d2Json);
        }
      } else if (this.$options._componentTag === 'v-view') {
        /**
         * refresh view
         */
        const nearestRootComponent = this.findNearestRootComponent(
          this.$parent
        );

        oneObjectMoreArray(nearestRootComponent.jsonForD2, 'views', {
          ...cleanUndefined(normalizeProps(this._props)),
          ...this.jsonForD2,
          viewId: this._uid,
        });
      } else if (this.$options._componentTag === 'v-facet-view') {
        /**
         * refresh facet-view
         */
        const nearestRootComponent = this.findNearestRootComponent(
          this.$parent
        );

        nearestRootComponent.jsonForD2.views = {
          ...cleanUndefined(normalizeProps(this._props)),
          ...this.jsonForD2,
        };
      } else if (this.$options._componentTag === 'v-facet') {
        /**
         * refresh facet
         */
        const nearestRootComponent = this.findNearestRootComponent(
          this.$parent
        );
        nearestRootComponent.jsonForD2.facet = {
          ...cleanUndefined(normalizeProps(this._props)),
          ...this.jsonForD2,
        };
      } else if (this.$options._componentTag === 'v-slider') {
        /**
         * refresh slider
         */
        const nearestRootComponent = this.findNearestRootComponent(
          this.$parent
        );
        const sliderOpts = cleanUndefined(normalizeProps(this._props));
        if (!cleanUndefined(normalizeProps(this._props)).container) {
          sliderOpts.container = 'viser-slider-' + generateRandomNum();
        }
        const sliderContainer = document.createElement('div');
        sliderContainer.id = sliderOpts.container;
        this.$parent.$el.appendChild(sliderContainer);

        nearestRootComponent.jsonForD2.slider = {
          ...sliderOpts,
          ...this.jsonForD2,
        };
      } else {
        /**
         * refresh others like axis, coord, guide, etc.
         */
        const nearestRootComponent = this.findNearestRootComponent(
          this.$parent
        );

        if (!nearestRootComponent) {
          throw Error(
            `${
              this.$options._componentTag
            } must be wrapped into v-chart or v-plugin`
          );
        }

        const rechartName = this.$options._componentTag
          .replace(/-/g, '')
          .slice(1);
        const rechartNameCamelCase = camelCase(
          this.$options._componentTag.slice(2)
        );

        if (isAllUndefined(this._props)) {
          nearestRootComponent.jsonForD2[rechartName] = true;
        } else if (regSeries.indexOf(rechartName) > -1) {
          safePush(nearestRootComponent.jsonForD2, 'series', {
            quickType: rechartNameCamelCase,
            ...cleanUndefined(normalizeProps(this._props)),
          });
        } else {
          oneObjectMoreArray(nearestRootComponent.jsonForD2, rechartName, {
            ...cleanUndefined(normalizeProps(this._props)),
            componentId: this._uid,
          });
        }
      }
    },
  },
  created() {
    // bubble from parent to child
  },
  mounted() {
    // bubble from child to parent
    (this as any).freshChart(false);
  },
  updated() {
    // bubble from child to parent
    (this as any).freshChart(true);
  },
  render(createElement: any): any {
    const isContainer = (this as any).checkIsContainer(this);
    if (isContainer) {
      return createElement('div', null, (this as any).$slots.default);
    }
    const props = cleanUndefined(normalizeProps((this as any)._props));

    return createElement(
      'div',
      { style: { display: 'none' } },
      Object.keys(props).map(key => {
        return '' + key + ':' + JSON.stringify(props[key]);
      })
    );
  },
} as ComponentOptions<any>;

const installMaps: any = {
  'v-chart': baseChartComponent,
  'v-tooltip': baseChartComponent,
  'v-legend': baseChartComponent,
  'v-axis': baseChartComponent,
  'v-brush': baseChartComponent,
  'v-view': baseChartComponent,
  'v-coord': baseChartComponent,
  'v-series': baseChartComponent,
  'v-facet': baseChartComponent,
  'v-facet-view': baseChartComponent,
  'v-lite-chart': baseChartComponent,
  'v-guide': baseChartComponent,
  'v-edge': baseChartComponent,
  'v-point': baseChartComponent,
  'v-pie': baseChartComponent,
  'v-bar': baseChartComponent,
  'v-stack-bar': baseChartComponent,
  'v-dodge-bar': baseChartComponent,
  'v-interval': baseChartComponent,
  'v-stack-interval': baseChartComponent,
  'v-dodge-interval': baseChartComponent,
  'v-schema': baseChartComponent,
  'v-line': baseChartComponent,
  'v-smooth-line': baseChartComponent,
  'v-dash-line': baseChartComponent,
  'v-sector': baseChartComponent,
  'v-area': baseChartComponent,
  'v-stack-area': baseChartComponent,
  'v-stack-line': baseChartComponent,
  'v-smooth-area': baseChartComponent,
  'v-funnel': baseChartComponent,
  'v-pyramid': baseChartComponent,
  'v-box': baseChartComponent,
  'v-candle': baseChartComponent,
  'v-polygon': baseChartComponent,
  'v-contour': baseChartComponent,
  'v-heatmap': baseChartComponent,
  'v-sankey': baseChartComponent,
  'v-error-bar': baseChartComponent,
  'v-jitter-point': baseChartComponent,
  'v-path': baseChartComponent,
  'v-venn': baseChartComponent,
  'v-plugin': baseChartComponent,
  'v-slider': baseChartComponent,
};

export default {
  install: (Vue: any, options: string[] | undefined) => {
    if (!options) {
      options = Object.keys(installMaps);
    }
    options.forEach((key: string) => {
      Vue.component(key, {
        ...installMaps[key],
        name: key,
      });
    });
  },
};

function safePush(obj: any, key: string, value: any) {
  if (!obj[key]) {
    obj[key] = [];
  }

  cleanUndefined(value);

  obj[key].push(value);
}

function oneObjectMoreArray(obj: any, key: string, value: any) {
  if (!obj[key]) {
    obj[key] = value;
    return;
  }

  if (obj[key] && obj[key].constructor.name === 'Object') {
    obj[key] = [obj[key]];
  }

  let indexOfSameObject = -1;
  if (value && value.viewId) {
    obj[key].forEach((o: any, i: number) => {
      if (o && o.viewId && o.viewId === value.viewId) {
        indexOfSameObject = i;
      }
    });
  } else if (value && value.componentId) {
    obj[key].forEach((o: any, i: number) => {
      if (o && o.componentId && o.componentId === value.componentId) {
        indexOfSameObject = i;
      }
    });
  }

  if (indexOfSameObject === -1) {
    obj[key].push(value);
  } else {
    obj[key][indexOfSameObject] = {
      ...obj[key][indexOfSameObject],
      ...value,
    };
  }
}

function cleanUndefined(value: any) {
  const newValue = { ...value };

  // delete value's undefined key
  for (const key in newValue) {
    if (newValue[key] === undefined) {
      delete newValue[key];
    }
  }

  return newValue;
}

function isAllUndefined(value: any) {
  return Object.keys(value).every((key: string) => value[key] === undefined);
}

/**
 * special props for vue
 */
function normalizeProps(
  props: any,
  include: string[] | null = null,
  expect: string[] | null = null
) {
  const newProps = { ...props };

  if (newProps.vStyle) {
    newProps.style = newProps.vStyle;
    delete newProps.vStyle;
  }

  if (expect !== null) {
    expect.forEach((propsKey: string) => {
      delete newProps[propsKey];
    });
  }

  if (include !== null) {
    Object.keys(newProps).forEach((propsKey: string) => {
      if (include.indexOf(propsKey) === -1) {
        delete newProps[propsKey];
      }
    });
  }

  return newProps;
}

function setIfNotExist(obj: any, key: string, value: any) {
  if (!obj[key]) {
    obj[key] = value;
  }
}

function generateRandomNum() {
  return Math.floor(new Date().getTime() + Math.random() * 10000).toString();
}

export const registerAnimation = viser.registerAnimation;
export const registerShape = viser.registerShape;
export const Global = viser.Global;

declare module 'vue/types/vue' {
  interface Vue {
    chart: any;
    _props?: object;
    _uid?: string;
    jsonForD2: any;
    plugins: any;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    _componentTag?: any;
  }
}
