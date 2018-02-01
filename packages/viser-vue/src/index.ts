import Vue from 'vue';
import typedProps from './typed';
import * as viser from 'viser';
import { Plugin } from 'viser';

const regSeries = ['pie', 'sector', 'line', 'smoothline', 'dashline', 'area', 'point', 'stackarea',
  'smootharea', 'bar', 'stackbar', 'dodgebar', 'interval', 'stackinterval', 'dodgeinterval',
  'funnel', 'pyramid', 'schema', 'box', 'candle', 'polygon', 'contour', 'heatmap', 'edge', 'sankey', 'errorbar', 'jitterpoint'];

const rootCharts = ['v-chart', 'v-lite-chart'];

const rootPlugin = ['v-plugin'];

const rootChartProps = ['data', 'scale', 'viewId'];

const seriesProps = ['position', 'quickType', 'gemo', 'adjust', 'color', 'shape', 'size', 'opacity', 'label', 'tooltip', 'style', 'animate'];

const camelCase: any = (() => {
  const DEFAULT_REGEX = /[-_]+(.)?/g;

  function toUpper(match: string, group1: string) {
    return group1 ? group1.toUpperCase() : '';
  }
  return (str: string, delimiters?: string) => {
    return str.replace(delimiters ? new RegExp('[' + delimiters + ']+(.)?', 'g') : DEFAULT_REGEX, toUpper);
  };
})();

const generateBaseChartComponent = (isContainer?: boolean) => {
  return {
    data() {
      return {
        isViser: true,
        jsonForD2: {},
      };
    },
    // Why use null? See https://github.com/vuejs/vue/issues/4792.
    props: typedProps,
    methods: {
      /**
       * find nearest parent rechart component
       */
      findNearestRootComponent(componentInstance: Vue) {
        if ((componentInstance as any).isViser
          && rootCharts.concat(['v-view', 'v-facet', 'v-facet-view', 'v-plugin']).indexOf(((componentInstance as any).$options as any)._componentTag) > -1) {
          if ((componentInstance.$options as any)._componentTag === 'v-lite-chart') {
            throw Error('v-lite-chart should be no child elements.')
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
            const lowerCasePropsKey = propsKey.toLowerCase()
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
        if (rootPlugin.indexOf(this.$options._componentTag) > -1) {
          const d2Json = this.createRootD2Json();
          if (!isUpdate) {
            this.plugins = Plugin(d2Json);
          }
        } else if (rootCharts.indexOf(this.$options._componentTag) > -1) { // hit top
          const d2Json = this.createRootD2Json();

          if (!isUpdate || !this.chart) {
            this.chart = viser.default(d2Json);
          } else {
            this.chart.repaint(d2Json);
          }
        } else if (this.$options._componentTag === 'v-view') {
          const nearestRootComponent = this.findNearestRootComponent(this.$parent);

          oneObjectMoreArray(nearestRootComponent.jsonForD2, 'views', {
            ...cleanUndefined(normalizeProps(this._props)),
            ...this.jsonForD2,
            viewId: this._uid,
          });
        } else if (this.$options._componentTag === 'v-facet-view') {
          const nearestRootComponent = this.findNearestRootComponent(this.$parent);

          nearestRootComponent.jsonForD2.views = {
            ...cleanUndefined(normalizeProps(this._props)),
            ...this.jsonForD2,
          };
        } else if (this.$options._componentTag === 'v-facet') {
          const nearestRootComponent = this.findNearestRootComponent(this.$parent);
          nearestRootComponent.jsonForD2.facet = {
            ...cleanUndefined(normalizeProps(this._props)),
            ...this.jsonForD2,
          };
        } else if (this.$options._componentTag === 'v-slider') {
          const nearestRootComponent = this.findNearestRootComponent(this.$parent);
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
          const nearestRootComponent = this.findNearestRootComponent(this.$parent);

          if (!nearestRootComponent) {
            throw Error(`${this.$options._componentTag} must be wrapped into v-chart`);
          }

          const rechartName = this.$options._componentTag.replace(/-/g, '').slice(1);
          const rechartNameCamelCase = camelCase(this.$options._componentTag.slice(2));

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
      }
    },
    created() { // bubble from parent to child
      // debugger;
    },
    mounted() { // bubble from child to parent
      this.freshChart(false);
    },
    updated() { // bubble from child to parent
      this.freshChart(true);
    },
    render(createElement: any) {
      if (isContainer) {
        return createElement('div', null, this.$slots.default);
      }
      const props = cleanUndefined(normalizeProps(this._props));
      return createElement('div', { style: { display: 'none' } }, Object.keys(props).map((key) => {
        return props[key];
      }));
    },
  };
};

export default {
  // tslint:disable-next-line:no-shadowed-variable
  install: (Vue: any, options: any) => {
    Vue.component('v-chart', generateBaseChartComponent(true));
    Vue.component('v-tooltip', generateBaseChartComponent());
    Vue.component('v-legend', generateBaseChartComponent());
    Vue.component('v-axis', generateBaseChartComponent());
    Vue.component('v-brush', generateBaseChartComponent());
    Vue.component('v-view', generateBaseChartComponent(true));
    Vue.component('v-coord', generateBaseChartComponent());
    Vue.component('v-series', generateBaseChartComponent());
    Vue.component('v-facet', generateBaseChartComponent(true));
    Vue.component('v-facet-view', generateBaseChartComponent(true));
    Vue.component('v-lite-chart', generateBaseChartComponent(true));
    Vue.component('v-guide', generateBaseChartComponent());

    Vue.component('v-edge', generateBaseChartComponent());
    Vue.component('v-point', generateBaseChartComponent());
    Vue.component('v-pie', generateBaseChartComponent());
    Vue.component('v-bar', generateBaseChartComponent());
    Vue.component('v-stack-bar', generateBaseChartComponent());
    Vue.component('v-dodge-bar', generateBaseChartComponent());
    Vue.component('v-interval', generateBaseChartComponent());
    Vue.component('v-stack-interval', generateBaseChartComponent());
    Vue.component('v-dodge-interval', generateBaseChartComponent());
    Vue.component('v-schema', generateBaseChartComponent());
    Vue.component('v-line', generateBaseChartComponent());
    Vue.component('v-smooth-line', generateBaseChartComponent());
    Vue.component('v-dash-line', generateBaseChartComponent());
    Vue.component('v-sector', generateBaseChartComponent());
    Vue.component('v-area', generateBaseChartComponent());
    Vue.component('v-stack-area', generateBaseChartComponent());
    Vue.component('v-smooth-area', generateBaseChartComponent());
    Vue.component('v-funnel', generateBaseChartComponent());
    Vue.component('v-pyramid', generateBaseChartComponent());
    Vue.component('v-box', generateBaseChartComponent());
    Vue.component('v-candle', generateBaseChartComponent());
    Vue.component('v-polygon', generateBaseChartComponent());
    Vue.component('v-contour', generateBaseChartComponent());
    Vue.component('v-heatmap', generateBaseChartComponent());
    Vue.component('v-sankey', generateBaseChartComponent());
    Vue.component('v-error-bar', generateBaseChartComponent());
    Vue.component('v-jitter-point', generateBaseChartComponent());

    Vue.component('v-plugin', generateBaseChartComponent());
    Vue.component('v-slider', generateBaseChartComponent());
  }
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
    obj[key].forEach((o, i) => {
      if (o && o.viewId && o.viewId === value.viewId) {
        indexOfSameObject = i;
      }
    });
  } else if (value && value.componentId) {
    obj[key].forEach((o, i) => {
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
  return Object.keys(value).every(key => value[key] === undefined);
}

function camelize(str: string) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
    return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

/**
 * special props for vue
 */
function normalizeProps(props: any, include: string[] = null, expect: string[] = null) {
  const newProps = { ...props };

  if (newProps.vStyle) {
    newProps.style = newProps.vStyle;
    delete newProps.vStyle;
  }

  if (expect !== null) {
    expect.forEach(propsKey => {
      delete newProps[propsKey];
    })
  }

  if (include !== null) {
    Object.keys(newProps).forEach(propsKey => {
      if (include.indexOf(propsKey) === -1) {
        delete newProps[propsKey];
      }
    })
  }

  return newProps;
}

function setIfNotExist(obj: any, key: string, value: any) {
  if (!obj[key]) {
    obj[key] = value;
  }
}

function generateRandomNum() {
  return (Math.floor(new Date().getTime() + Math.random() * 10000)).toString();
}

export const registerAnimation = viser.registerAnimation;
export const registerShape = viser.registerShape;
export const Global = viser.Global;
