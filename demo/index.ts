import list from './chart/index';
import Vue from 'vue';
import ViserVue from '../packages/viser-vue/src'
import * as ReactDOM from 'react-dom';

function fetchData(state) {
  const type = state.type;
  const fileName = state.filename;
  const mount = document.getElementById('mount');
  ReactDOM.unmountComponentAtNode(mount);
  mount.innerHTML = '';

  // TODO: Vue Angular add unmount
  if (['json', 'react', 'vue', 'angular'].indexOf(fileName) > -1) {
    if (fileName === 'react') {
      delete require.cache[`./chart/${type}/${fileName}.tsx`];
      require(`./chart/${type}/${fileName}`);
    } else {
      delete require.cache[`./chart/${type}/${fileName}.ts`];
      require(`./chart/${type}/${fileName}`);
    }

    if (fileName === 'vue') {
      const App = require(`./chart/${type}/${fileName}.vue`).default;
      const container = document.createElement('div')
      document.getElementById('mount').appendChild(container)
      Vue.use(ViserVue)
      new Vue({
        el: container,
        template: '<App />',
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
