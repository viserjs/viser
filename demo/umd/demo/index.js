"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./chart/index");
function fetchData(state) {
    var type = state.type;
    var fileName = state.filename;
    var mount = document.getElementById('mount');
    mount.innerHTML = '';
    if (['json', 'react', 'vue'].indexOf(fileName) > -1) {
        if (fileName === 'react') {
            delete require.cache["./chart/" + type + "/" + fileName + ".tsx"];
        }
        else {
            delete require.cache["./chart/" + type + "/" + fileName + ".ts"];
        }
        require("./chart/" + type + "/" + fileName);
    }
}
function loadEvents() {
    document.addEventListener('click', function (e) {
        e.preventDefault();
        if (e.target && e.target.nodeName.toUpperCase() === 'A') {
            var el = e.target;
            var state = el.dataset;
            fetchData(state);
        }
    });
}
function init() {
    var temp = '';
    index_1.default.map(function (item) {
        var linkTemp = '';
        item.case.forEach(function (example) {
            linkTemp += "<a href=\"###\" style=\"margin: 0 10px 0 0;\" data-type=\"" + item.type + "\" data-fileName=\"" + example + "\">" + example + "</a>";
        });
        temp +=
            "<div>\n      <a>" + item.type + "</a>\n      <div className=\"example-container\">" + linkTemp + "</div>\n    </div>";
    });
    var root = document.getElementById('root');
    root.innerHTML = temp;
    loadEvents();
}
init();
//# sourceMappingURL=index.js.map