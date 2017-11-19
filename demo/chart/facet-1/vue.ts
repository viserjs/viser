import Vue from 'vue/dist/vue.esm.js'
import ViserVue from '../../../packages/viser-vue/src'
import { chartData, dataMapping, scale } from './data'

Vue.use(ViserVue)

const container = document.createElement('div')
container.innerHTML = `
  <div>
    <v-chart :force-fit="true" :height="600" :data="chartData" :data-mapping="dataMapping" :scale="scale">
      <v-facet :type="'rect'" :fields="['cut', 'clarity']">
        <v-facet-view>
          <v-axis />
          <v-tooltip />
          <v-point :opacity="0.3" :size="3" />
        </v-facet-view>
      </v-facet>
    </v-chart>
  </div>
`;
document.getElementById('mount').appendChild(container)

new Vue({
  el: container,
  data: {
    chartData,
    dataMapping,
    scale,
  },
  methods: {

  }
});
