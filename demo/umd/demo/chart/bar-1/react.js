"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../../packages/viser-react/src/index");
var ReactDOM = require("react-dom");
var React = require("react");
var data_1 = require("./data");
var App = (function (_super) {
    __extends(App, _super);
    function App(props) {
        return _super.call(this, props) || this;
    }
    App.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(index_1.Chart, { forceFit: true, height: 400, data: data_1.data, dataPre: data_1.dataPre, dataDef: data_1.dataDef, scale: data_1.scale },
                React.createElement(index_1.Tooltip, null),
                React.createElement(index_1.Axis, null),
                React.createElement(index_1.StackBar, { style: { stroke: '#fff', lineWidth: 1 } }))));
    };
    return App;
}(React.Component));
ReactDOM.render(React.createElement(App, null), document.getElementById('mount'));
//# sourceMappingURL=react.js.map