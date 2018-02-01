import list from './chart/index';

import Vue from 'vue';
import ViserVue from '../packages/viser-vue/src';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// store Vue Instance globally;
let vm;
Vue.use(ViserVue);

let ngRef;

function fetchData(state) {
  const type = state.type;
  const fileName = state.filename;
  const mount = document.getElementById('mount');

  // Unmount React;
  ReactDOM.unmountComponentAtNode(mount);
  // Unmount Vue
  if (vm && vm.existed) {
    vm.existed = false;
  }
  // Unmount Angular
  if (ngRef) {
    const mountParent = mount.parentNode;
    ngRef.destroy();
    ngRef = undefined;
    const newMount = document.createElement('div');
    newMount.setAttribute('id', 'mount');
    mountParent.appendChild(newMount);
  }
  // Remove Dom
  mount.innerHTML = '';

  if (['json', 'react', 'vue', 'angular'].indexOf(fileName) > -1) {
    if (fileName === 'react') {
      delete require.cache[`./chart/${type}/${fileName}.tsx`];
      const App = require(`./chart/${type}/${fileName}`).default;
      ReactDOM.render(<App />, document.getElementById('mount'));
    }

    if (fileName === 'angular')  {
      delete require.cache[`./chart/${type}/${fileName}.ts`];
      const AppModule = require(`./chart/${type}/${fileName}`).default;
      platformBrowserDynamic().bootstrapModule(AppModule).then((ref) => { ngRef = ref; });
    }

    if (fileName === 'vue') {
      const App = require(`./chart/${type}/${fileName}.vue`).default;
      const container = document.createElement('div');
      document.getElementById('mount').appendChild(container);
      vm = new Vue({
        data: {
          existed: true
        },
        el: container,
        template: '<App v-if="existed"/>',
        components: { App }
      });
    }
  }
}

function loadEvents() {
  document.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target && (e.target as any).nodeName.toUpperCase() === 'A') {
      const el = e.target;
      const state = (el as any).dataset;
      fetchData(state);
    }
  });
}

function init() {
  let temp = '';
  list.map((item: any) => {
    let linkTemp = '';

    item.case.forEach((example: any) => {
      linkTemp += `<a href="###" style="margin: 0 10px 0 0;" data-type="${item.type}" data-fileName="${example}">${example}</a>`;
    });

    temp +=
      `<div>
      <a>${item.type}</a>
      <div className="example-container">${linkTemp}</div>
    </div>`;
  });

  const root = document.getElementById('root');
  root.innerHTML = temp;
  loadEvents();
}

init();
