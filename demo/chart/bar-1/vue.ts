import Vue from 'vue/dist/vue.esm.js'
import ViserVue from '../../../packages/viser-vue/src'
import { data, dataDef, dataPre, scale } from './data'

Vue.use(ViserVue)

const container = document.createElement('div')
container.innerHTML = `
  <div>
    <v-chart :force-fit="true" :height="400" :data="data" :data-pre="dataPre" :data-def="dataDef" :scale="scale">
      <v-tooltip />
      <v-axis />
      <v-stack-bar :v-style="{ stroke: '#fff', lineWidth: 1 }" />
    </v-chart>
  </div>
`;
document.getElementById('mount').appendChild(container)

new Vue({
  el: container,
  data: {
    data,
    dataDef,
    dataPre,
    scale,
  },
  methods: {

  }
});
