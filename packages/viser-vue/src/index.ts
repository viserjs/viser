import Vue from 'vue';
import viser from 'viser';

const regSeries = ['pie', 'sector', 'line', 'smoothline', 'dashline', 'area',
  'stackarea', 'smootharea', 'bar', 'stackbar', 'dodgebar', 'point', 'waterfall',
  'funnel', 'pyramid', 'radialbar', 'schema', 'box', 'candle', 'polygon', 'contour',
  'heatmap', 'edge', 'sankey'];

const rootCharts = ['v-chart', 'v-lite-chart'];

const rootChartProps = ['data', 'dataMapping', 'dataView', 'dataPre', 'scale', 'viewId'];

const seriesProps = ['position', 'quickType', 'gemo', 'adjust', 'color', 'shape', 'size', 'opacity', 'label', 'tooltip', 'style'];

const camelCase: any = (() => {
  const DEFAULT_REGEX = /[-_]+(.)?/g;

  function toUpper(match: string, group1: string) {
    return group1 ? group1.toUpperCase() : '';
  }
  return (str: string, delimiters?: string) => {
    return str.replace(delimiters ? new RegExp('[' + delimiters + ']+(.)?', 'g') : DEFAULT_REGEX, toUpper);
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
  props: {
    width: null,
    height: null,
    data: null,
    dataMapping: null,
    dataPre: null,
    dataView: null,
    crosshairs: null,
    dataKey: null,
    label: null,
    size: null,
    vStyle: null,
    show: null,
    color: null,
    tooltip: null,
    opacity: null,
    gemo: null,
    type: null,
    scale: null,
    forceFit: null,
    fields: null,
    viewId: null,

    pie: null,
    sector: null,
    line: null,
    smoothLine: null,
    dashLine: null,
    area: null,
    stackArea: null,
    smoothArea: null,
    bar: null,
    stackBar: null,
    dodgeBar: null,
    point: null,
    waterfall: null,
    funnel: null,
    pyramid: null,
    radialBar: null,
    schema: null,
    box: null,
    candle: null,
    polygon: null,
    contour: null,
    heatmap: null,
    edge: null,
    sankey: null,
  } as any,
  methods: {
    /**
     * find nearest parent rechart component
     */
    findNearestRootComponent(componentInstance: Vue) {
      if ((componentInstance as any).isViser && rootCharts.concat(['v-view', 'v-facet', 'v-facet-view']).indexOf(((componentInstance as any).$options as any)._componentTag) > -1) {
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
    freshChart(isUpdate: boolean) {
      if (rootCharts.indexOf(this.$options._componentTag) > -1) { // hit top
        const d2Json = {
          ...cleanUndefined(normalizeProps(this._props, rootChartProps)),
          chart: {
            container: this.$el,
            ...cleanUndefined(normalizeProps(this._props, null, rootChartProps))
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

        if (!isUpdate) {
          this.chart = viser(d2Json);
        } else {
          this.chart.repaint(d2Json);
        }
      } else if (this.$options._componentTag === 'v-view') {
        const nearestRootComponent = this.findNearestRootComponent(this.$parent);

        nearestRootComponent.jsonForD2.views = {
          ...cleanUndefined(normalizeProps(this._props)),
          ...this.jsonForD2,
          viewId: generateRandomNum()
        };
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
          oneObjectMoreArray(nearestRootComponent.jsonForD2, rechartName, cleanUndefined(normalizeProps(this._props)));
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
  render(h: any) {
    return h('div', null, this.$slots.default);
  },
};

export default {
  // tslint:disable-next-line:no-shadowed-variable
  install: (Vue: any, options: any) => {
    Vue.component('v-chart', baseChartComponent);
    Vue.component('v-point', baseChartComponent);
    Vue.component('v-tooltip', baseChartComponent);
    Vue.component('v-legend', baseChartComponent);
    Vue.component('v-axis', baseChartComponent);
    Vue.component('v-view', baseChartComponent);
    Vue.component('v-coord', baseChartComponent);
    Vue.component('v-pie', baseChartComponent);
    Vue.component('v-edge', baseChartComponent);
    Vue.component('v-series', baseChartComponent);
    Vue.component('v-facet', baseChartComponent)
    Vue.component('v-facet-view', baseChartComponent)
    Vue.component('v-lite-chart', baseChartComponent)
    Vue.component('v-guide', baseChartComponent)

    Vue.component('v-bar', baseChartComponent);
    Vue.component('v-stack-bar', baseChartComponent)
    Vue.component('v-dodge-bar', baseChartComponent)
    Vue.component('v-schema', baseChartComponent);
    Vue.component('v-line', baseChartComponent);
    Vue.component('v-smooth-line', baseChartComponent);
    Vue.component('v-dash-line', baseChartComponent)
    Vue.component('v-sector', baseChartComponent)
    Vue.component('v-area', baseChartComponent)
    Vue.component('v-stack-area', baseChartComponent)
    Vue.component('v-smooth-area', baseChartComponent)
    Vue.component('v-water-fall', baseChartComponent)
    Vue.component('v-funnel', baseChartComponent)
    Vue.component('v-pyramid', baseChartComponent)
    Vue.component('v-radial-bar', baseChartComponent)
    Vue.component('v-box', baseChartComponent)
    Vue.component('v-candle', baseChartComponent)
    Vue.component('v-polygon', baseChartComponent)
    Vue.component('v-contour', baseChartComponent)
    Vue.component('v-heatmap', baseChartComponent)
    Vue.component('v-sankey', baseChartComponent)
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

  obj[key].push(value);
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
