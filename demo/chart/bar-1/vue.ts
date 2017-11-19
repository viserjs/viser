import Vue from 'vue/dist/vue.esm.js'
import ViserVue from '../../../packages/viser-vue/src'
import { data, dataMapping, dataPre, scale } from './data'

Vue.use(ViserVue)

const container = document.createElement('div')
container.innerHTML = `
  <div>
    <button v-on:click="handleClick">Click</button>
    <v-chart :force-fit="true" :height="height" :data="data" :data-pre="dataPre" :data-mapping="dataMapping" :scale="scale">
      <v-tooltip />
      <v-axis />
      <v-stack-bar :v-style="stackBarStyle" />
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
    height: 400,
    stackBarStyle: {
      stroke: '#fff',
      lineWidth: 1
    }
  },
  methods: {
    handleClick: function () {
      this.height = 600
      this.stackBarStyle.lineWidth = 10
    }
  }
});
