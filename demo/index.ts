import list from './chart/index';

function fetchData(state) {
  const type = state.type;
  const fileName = state.filename;

  const mount = document.getElementById('mount');
  mount.innerHTML = '';

  if (fileName === 'json') {
    delete require.cache[`./chart/${type}/${fileName}.ts`];
    require(`./chart/${type}/${fileName}.ts`);
  }

  if (fileName === 'react') {
    delete require.cache[`./chart/${type}/${fileName}.tsx`];
    require(`./chart/${type}/${fileName}.tsx`);
  }
}

function loadEvents() {
  document.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target && e.target.nodeName.toUpperCase() === 'A') {
      const el = e.target;
      const state = el.dataset;
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
