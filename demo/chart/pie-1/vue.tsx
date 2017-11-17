import Vue from 'vue/dist/vue.esm.js'
import ViserVue from '../../../packages/viser-vue/src'
import { data, dataDef } from './data'

Vue.use(ViserVue)

const container = document.createElement('div')
container.innerHTML = `
  <div>
    <v-chart :height="300" :height="400" :data="data" :data-def="dataDef">
      <v-coord :radius="1" :inner-radius="0.6" />
      <v-pie :label="true" />
      <v-tooltip />
      <v-legend />
      <v-axis />
    </v-chart>
  </div>
`;
document.getElementById('mount').appendChild(container)

new Vue({
  el: container,
  data: {
    data,
    dataDef,
  },
  methods: {

  }
});
