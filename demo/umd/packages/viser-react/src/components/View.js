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
var React = require("react");
var PropTypes = require("prop-types");
function generateRandomNum() {
    return (Math.floor(new Date().getTime() + Math.random() * 10000)).toString();
}
var View = (function (_super) {
    __extends(View, _super);
    function View(props) {
        var _this = _super.call(this, props) || this;
        _this.displayName = 'Views';
        _this.state = {
            hasInViews: true,
            viewId: generateRandomNum(),
        };
        return _this;
    }
    View.prototype.getChildContext = function () {
        return {
            hasInViews: this.state.hasInViews,
            viewId: this.state.viewId,
        };
    };
    View.prototype.componentDidUpdate = function () {
        this.context.centralizedUpdates(this);
    };
    View.prototype.componentDidMount = function () {
        this.context.centralizedUpdates(this);
    };
    View.prototype.render = function () {
        return React.createElement("div", null, this.props.children);
    };
    View.childContextTypes = {
        hasInViews: PropTypes.bool,
        viewId: PropTypes.number,
    };
    View.contextTypes = {
        centralizedUpdates: PropTypes.func,
        hasInViews: PropTypes.bool,
    };
    return View;
}(React.Component));
exports.default = View;
//# sourceMappingURL=View.js.map