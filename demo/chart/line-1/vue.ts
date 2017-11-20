import Vue from 'vue/dist/vue.esm.js'
import ViserVue from '../../../packages/viser-vue/src'
import { data, dataMapping, dataPre, scale } from './data'

Vue.use(ViserVue)

const container = document.createElement('div')
container.innerHTML = `
  <div>
    <v-chart :force-fit="true" :height="400" :data="data" :data-pre="dataPre" :data-mapping="dataMapping" :scale="scale">
      <v-tooltip />
      <v-axis />
      <v-line :v-style="{ stroke: 'red', lineWidth: 1 }" />
    </v-chart>
  </div>
`;
document.getElementById('mount').appendChild(container)

new Vue({
  el: container,
  data: {
    data,
    dataMapping,
    dataPre,
    scale,
  },
  methods: {

  }
});
