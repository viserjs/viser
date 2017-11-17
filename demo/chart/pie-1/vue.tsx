import Vue from 'vue/dist/vue.esm.js'
import ViserVue from '../../../packages/viser-vue/src'
import { data, dataDef } from './data'

Vue.use(ViserVue)

const container = document.createElement('div')
container.innerHTML = `
  <div>
    <v-chart :force-fit="true" :height="300" :height="400" :data="data" :data-pre="dataPre" :data-def="dataDef" :scale="scale">
      <v-tooltip />
      <v-coord :radius=1 :inner-raidus=0.6 type="theta"/>
      <v-pie />
      <v-series adjust="stack" geom="interval" lable="true" position="profit" quick-type="pie"/>
      <v-legend />
      <v-tooltip />
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
